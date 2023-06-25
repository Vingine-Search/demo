import os
import httpx
import magic
import asyncio


class Vingine:
    """A class that handles the interaction with Vingine."""

    def __init__(self, service_url: str):
        self.url = service_url.strip('/')
        self.magic = magic.Magic(True)
        self.client = httpx.AsyncClient()
        self.on_transient = {}

    def analyse(self, id: str, video_path: str, name: str, analysis_type: str):
        """Creates an asynchronous task that sends the video to Vingine."""
        mime = self.magic.from_file(video_path)
        if mime != "video/mp4":
            raise RuntimeError(f"Only MP4 files are accepted for now. '{mime}' was provided.")
        if analysis_type not in ["video", "audio", "both"]:
            raise RuntimeError(f"Unknown analysis type: '{analysis_type}'. Allowed types are ['video', 'audio', 'both'].")
        # Store the send task to tell the status of the video while it's being sent.
        self.on_transient[id] = (name, asyncio.create_task(self.send(id, video_path, name, analysis_type), name=id))

    async def send(self, id: str, video_path: str, name: str, analysis_type: str):
        """Send the video to Vingine to get analysed."""
        response = await self.client.post(self.url + '/analyse',
                                          files={'video': open(video_path, 'rb')},
                                          params={'id': id, 'name': name, 'analysis_type': analysis_type})
        if not response.is_error:
            self.on_transient.pop(id)
        else:
            # Cache this failure (don't pop) and replace the task handle with the error we got from Vingine.
            self.on_transient[id] = (name, response.json().get('detail'))
            # Remove the lengthy video but keep its ID on the filesystem.
            open(video_path, 'w')

    async def status(self, id: str):
        """Gets the analysis status of the video with `id`. It's either still being sent to Vingine or is fully sent.
        If the video is fully sent, Vingine might still be doing analysis on it, thus we ask Vingine about its status
        instead.
        """
        name, task = self.on_transient.get(id, (None, None))
        # Video is either still being sent or Vingine failed to analyse it.
        if name is not None:
            # If `task` is a string, that means Vingine failed to analyse the video and that's it's response.
            if isinstance(task, str):
                raise RuntimeError(f"Vingine failed to analyse {name} because: {task}.")
            return f"{name} is currently being sent to Vingine."
        # Ask Vingine about the status of this video ID.
        else:
            response = await self.client.get(self.url + '/status', params={'id': id})
            if response.is_error:
                raise RuntimeError(f"Vingine Video Status Error: {response.json().get('detail')}")
            return response.json()

    async def info(self, id: str):
        """Returns the analysis data for video with `id`."""
        # NOTE: Typically the frontend will ask about the info for `id` when it appears on a search result.
        # So we are sure we actually have/Vingine has this `id`.
        response = await self.client.get(self.url + '/info', params={'id': id})
        if response.is_error:
            raise RuntimeError(f"Vingine Video Info Error: {response.json().get('detail')}")
        return response.json()

    async def search(self, query: str):
        """Returns the search results for `query`."""
        response = await self.client.get(self.url + '/search', params={'query': query})
        if response.is_error:
            raise RuntimeError(f"Vingine Search Error: {response.json().get('detail')}")
        return response.json()
