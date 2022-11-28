FROM python:3.9-slim

WORKDIR /app

# copy everything to the right place
COPY ./api/main.py /app
COPY ./ui/dist /app/web
COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


# command to start the server (second one does not work on gcloud)
# CMD [ "python", "./main.py" ]
CMD  ["uvicorn", "main:app", "--port", "80", "--host", "0.0.0.0", "--reload"]