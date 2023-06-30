import os
import cv2
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

async def get_thumbnail_path(id: str) -> str:
    """Returns the filesystem path of the thumbnail of the video with `id`."""
    path = await get_video_path(id)
    return path.split(".")[0] + ".jpg"

def list_videos() -> list:
    """Lists all the video IDs we have at no particular order."""
    ids = [filename.split(".")[0] for filename in os.listdir(constants.STORAGE)]
    random.shuffle(ids)
    return ids

def store_thumbnail(path: str):
    video = cv2.VideoCapture(path)
    frm = video.get(cv2.CAP_PROP_FRAME_COUNT)
    # Seek to one-fifth of the video.
    video.set(cv2.CAP_PROP_POS_FRAMES, frm // 5)
    res, frame = video.read()
    while res and (frame.mean() / 255) < 0.1:
        res, frame = video.read()
    # If meeting the mean threshold fails, just pick the frame at one-fifth of the video.
    if not res:
        video.set(cv2.CAP_PROP_POS_FRAMES, frm // 5)
        _, frame = video.read()
    # Store the frame.
    jpg = path.split(".")[0] + ".jpg"
    cv2.imwrite(jpg, frame)
