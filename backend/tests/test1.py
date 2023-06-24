import requests

url = 'http://127.0.0.1:8000/upload'
file = {'video': open('ex.mp4', 'rb')}
resp = requests.post(url=url, files=file,stream=True, params={'analysis': 'video', 'name': 'Example Video'}) 
print(resp.json())