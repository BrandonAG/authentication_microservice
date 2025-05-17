import requests
from dotenv import load_dotenv
import os

load_dotenv()

# POST request
def login(req_body):
    url = os.getenv('api_url') or 'http://localhost:3001'

    # wait for http response
    response = requests.post(url + '/login', json=req_body)
    print('Credentials Match: ' + str(response.text))

while True:
    # promput user for username and password
    username = input('username: ')
    password = input('password: ')

    # setup http request body
    data = { 'username': username, 'password': password}

    # wait for http response
    login(data)