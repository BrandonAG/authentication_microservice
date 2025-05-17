# Javascript Example Usage

Send HTTP POST request via Python.

## Setup

### Package Installation

Run the following command at the root of the directory (ideally in a virtual environment).

```
pip install -r requirements.txt
```

### Environment Setup

Create a .env file at the root of the directory and define the variables below, replacing the values with your details.

```
api_url=<api server url>
```

An example .env file might look like the following.

```
api_url=http://localhost:3001
```

## Starting the Service

Run the following command to start the service, and enter username and password credentials in the terminal when prompted.

```
python server.py
```