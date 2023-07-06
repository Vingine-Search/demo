import httpx
import argparse


parser = argparse.ArgumentParser(description='Upload video to the demo backend.')
parser.add_argument('--id', help='The video ID.', required=True)
args = parser.parse_args()

host = f"http://localhost:8000/status/{args.id}"
print(httpx.Client().get(url=host).text)
