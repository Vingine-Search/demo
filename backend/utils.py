import os
import uuid
import random
import constants


EXTS = [".mp4", ".mov"]

async def get_random_path(ext):
    """Returns a random video file name (with .mp4 extension) inside the video storage directory."""
    if ext is None:
        ext = ".mp4"
    if ext not in EXTS:
        raise RuntimeError(f"Unsupported video format {ext}. Supported formats are: {EXTS}")
    id = str(uuid.uuid4())
    return id, os.path.join(constants.STORAGE, id) + ext

async def get_video_path(id: str) -> str:
    """Returns the filesystem path of the video with the given `id`."""
    paths = [os.path.join(constants.STORAGE, id) + ext for ext in EXTS]
    for path in paths:
        if os.path.exists(path):
            return path
    raise RuntimeError(f"Video with ID='{id}' was not found.")

def list_videos() -> list:
    """Lists all the video IDs we have at no particular order."""
    ids = [filename.split(".")[0] for filename in os.listdir(constants.STORAGE)]
    random.shuffle(ids)
    return ids
