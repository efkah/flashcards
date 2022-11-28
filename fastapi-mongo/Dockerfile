FROM python:3.9-slim

WORKDIR /app

# copy everything to the right place
COPY . /app/
COPY ./dist /app/dist/

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


# command to start the server (second one does not work on gcloud)
CMD [ "python", "./main.py" ]