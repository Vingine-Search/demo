import os
import utils
import aiofiles
import constants
from vingine import Vingine
from fastapi.responses import FileResponse
from fastapi import FastAPI, UploadFile, HTTPException


api = FastAPI()
vingine = Vingine(constants.SERVICE_BACKEND)

# Create the storage directory is it doesn't exist.
if not os.path.exists(constants.STORAGE):
    os.mkdir(constants.STORAGE)

@api.get("/list")
def all():
    """Lists all the videos we have."""
    return utils.list_videos()

@api.post("/upload")
async def upload(video: UploadFile, analysis: str, name: str):
    """Upload a file to store it on the backend and send it to Vingine."""
    if not video.filename.endswith(".mp4"):
        raise HTTPException(400, "Only MP4 files are accepted for now.")
    id, path = utils.get_random_path()
    async with aiofiles.open(path, 'wb') as file:
        # Read the video on chunks to not blow up the memory.
        while contents := await video.read(256 * 1024):
            await file.write(contents)
    try:
        vingine.analyse(id, path, name, analysis)
        # Return the id of the video for the frontend to query its analysis status.
        return id
    except Exception as e:
        os.remove(path)
        raise HTTPException(400, str(e))

async def wrap_exception(fn, args, code):
    try:
        return await fn(*args)
    except Exception as e:
        raise HTTPException(code, str(type(e)) + ": " + str(e))

@api.get("/download/{id}")
async def download(id: str):
    """Sends the playable video to the client."""
    path = await wrap_exception(utils.get_video_path, (id,), 404)
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
