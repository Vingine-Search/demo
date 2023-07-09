import os
import utils
import random
import aiofiles
import constants
from pathlib import Path
from vingine import Vingine
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, HTTPException, Header, Response


api = FastAPI()
vingine = Vingine(constants.SERVICE_BACKEND)

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create the storage directory if it doesn't exist.
if not os.path.exists(constants.STORAGE):
    os.mkdir(constants.STORAGE)

async def wrap_exception(fn, args, code):
    try:
        return await fn(*args)
    except Exception as e:
        raise HTTPException(code, f"{type(e)}: {e}")

@api.get("/list")
async def all():
    """Lists all the videos we have."""
    all_infos = []
    all_videos = list(utils.list_videos())
    random.shuffle(all_videos)
    for id in all_videos:
        try:
            vid_info = await info(id)
            all_infos.append({
                "id": id,
                "title": vid_info["title"]
            })
        except:
            # Don't add info-less videos. (Videos failed analysis)
            pass
        if len(all_infos) > 20:
            break
    return all_infos

@api.post("/upload")
async def upload(video: UploadFile, analysis: str, title: str):
    """Upload a file to store it on the backend and send it to Vingine."""
    extension = '.' + video.filename.split(".")[-1] if video.filename is not None else None
    id, path = await wrap_exception(utils.get_random_path, (extension,), 400)
    async with aiofiles.open(path, 'wb') as file:
        # Read the video on chunks to not blow up the memory.
        while contents := await video.read(256 * 1024):
            await file.write(contents)
        utils.store_thumbnail(path)
    try:
        vingine.analyse(id, path, title, analysis)
        # Return the id of the video for the frontend to query its analysis status.
        return id
    except Exception as e:
        os.remove(path)
        raise HTTPException(400, str(e))

@api.get("/download/{id}")
async def download(id: str, range: str = Header(None)):
    """Sends the playable video to the client.
        Credits: https://github.com/stribny/fastapi-video/tree/master
    """
    path = Path(await wrap_exception(utils.get_video_path, (id,), 404))
    start, end = range.replace("bytes=", "").split("-")
    start = int(start) if start else 0
    end = int(end) if end else start + 1024 * 1024
    with open(path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{path.stat().st_size}',
            'Accept-Ranges': 'bytes'
        }
    return Response(data, status_code=206, headers=headers, media_type="video/mp4")

@api.get("/vtt/{id}")
async def vtt(id: str):
    path = await wrap_exception(utils.get_vtt_path, (id,), 404)
    # If we don't have that vtt file, fetch it from vingine.
    if not os.path.exists(path):
        vtt_content = await wrap_exception(vingine.vtt, (id,), 500)
        open(path, 'w').write(vtt_content)
    return FileResponse(path)

@api.get("/thumbnail/{id}")
async def thumbnail(id: str):
    path = await wrap_exception(utils.get_thumbnail_path, (id,), 404)
    return FileResponse(path)

@api.get("/status/{id}")
async def status(id: str):
    """Returns the analysis status of a specific video."""
    await wrap_exception(utils.get_video_path, (id,), 404)
    return await wrap_exception(vingine.status, (id,), 500)

@api.get("/info/{id}")
async def info(id: str):
    """Gets the video info (transcript, segments, etc...)."""
    await wrap_exception(utils.get_video_path, (id,), 404)
    return await wrap_exception(vingine.info, (id,), 500)

@api.get("/search")
async def search(q: str):
    """Invokes Vingine."""
    return await wrap_exception(vingine.search, (q,), 500)
