import httpx, time

url = 'http://127.0.0.1:8000/upload'
file = {'video': open('ex.mp4', 'rb')}
client = httpx.Client()
resp = client.post(url=url, files=file, params={'analysis': 'video', 'title': 'Example Video'}) 
print(resp.json())

time.sleep(0.1)
url = 'http://127.0.0.1:8000/status/{}'.format(resp.json())
resp = client.get(url=url)
print(resp.json())