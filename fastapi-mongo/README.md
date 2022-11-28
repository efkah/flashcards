# FastAPI Project

## Venv

### Creating % Activating
Create a new venv via `python3 -m venv venv`.
Activate it with `source venv/bin/activate`.
Note that you might now work in multiple venvs - you might need to `deactivate` some of them, f.e. with `conde deactivate`

### Creating Requirements

Assuming your venv is activated, run `pip freeze -l > requirements.txt`

## Run the Project

To run use guvicorn like this: `uvicorn main:app --port=80 --host=0.0.0.0 --reload`.
Running it via `python main.py` is the same.

## MongoDB & Atlas

### Local Mongo

Just run `mongosh` to jump in to the mongo shell.
Connection can be established via `mongodb://localhost:27017` - it is recommended to add a user.

### Atlas

Connect via:
`mongosh "mongodb+srv://cluster0.4nxap.mongodb.net/flashcards" --apiVersion 1 --username flashcards`
The password for the flashcards user (read-write any db) is: rNNH9IwXUN7jbwa7

#### Gcloud activate VPC Serverless Access connector

A _paid_ atlas cluster can be connected by _paying_ for a virtual private network
https://cloud.google.com/community/tutorials/serverless-vpc-access-private-mongodb-atlas

## Google Cloud Run

### Deployment

Should be possible from the root with `gcloud run deploy`.
Make sure to be authenticated and logged into to the correct project.

### Dockerize

There is a `Dockerfile` and a `requirements.txt`.
Run `docker build -t fastapi-mongo .` to build an image from the dockerfile.

Run `docker run -d --rm -p 8080:8080 fastapi-mongo` to run the app detached.

Check if it is running with `docker container ls`. If it is running, http://0.0.0.0:8081/api/docs should be available.

Encountering issues, use the `-it` instead of `-d` to launch into `bash`, where you can `ls` the content of the working dir and test `python main.py`.
