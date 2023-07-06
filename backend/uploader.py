import time
import httpx
import argparse


parser = argparse.ArgumentParser(description='Upload video to the demo backend.')
parser.add_argument('--video', help='The path to the video file.', required=True)
parser.add_argument('--title', help='The title of the video.', default="No Title")
parser.add_argument('--analysis', help='The type of analysis to perform on the video.', default="video")
args = parser.parse_args()

host = "http://grad-vm.westeurope.cloudapp.azure.com:8000"
host = "http://localhost:8000"
client = httpx.Client(timeout=httpx.Timeout(None))

upload = f'{host}/upload'
resp = client.post(
    url=upload,
    files={'video': open(args.video, 'rb')},
    params={'analysis': args.analysis, 'title': args.title}) 

id = resp.json()
print(id)

if resp.is_error:
    print(resp)
    exit()

while True:
    input("Press enter to get the status")
    status = f'{host}/status/{id}'
    resp = client.get(url=status)
    print(resp.json())
