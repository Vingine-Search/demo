import httpx
import argparse


parser = argparse.ArgumentParser(description='Search documents in vingine.')
parser.add_argument('--query', help='The search query.', required=True)
args = parser.parse_args()

host = f"http://grad-vm.westeurope.cloudapp.azure.com:8000/search?q={args.query}"
print(httpx.Client().get(url=host).text)
