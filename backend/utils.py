import os
import uuid
import random
import constants


def get_random_path():
    """Returns a random video file name (with .mp4 extension) inside the video storage directory."""
    id = str(uuid.uuid4())
    return id, os.path.join(constants.STORAGE, id) + ".mp4"

def get_video_path(id: str) -> str:
    """Returns the filesystem path of the video with the given `id`."""
    path = os.path.join(constants.STORAGE, id) + ".mp4"
    if not os.path.exists(path):
        raise RuntimeError("Video not found.")
    return path

def list_videos() -> list:
    """Lists all the video IDs we have at no particular order."""
    ids = [filename.removesuffix(".mp4") for filename in os.listdir(constants.STORAGE)]
    random.shuffle(ids)
    return ids
