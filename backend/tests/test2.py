import httpx

url = 'http://127.0.0.1:8000/upload'
file = {'video': open('ex.mp4', 'rb')}
client = httpx.Client()
resp = client.post(url=url, files=file, params={'analysis': 'video', 'name': 'Example Video'}) 
print(resp.json())