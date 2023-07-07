import httpx
import argparse


parser = argparse.ArgumentParser(description='Get the info of a video in vingine.')
parser.add_argument('--id', help='The video ID.', required=True)
args = parser.parse_args()

host = f"http://grad-vm.westeurope.cloudapp.azure.com:8000/info/{args.id}"
print(httpx.Client().get(url=host).text)
