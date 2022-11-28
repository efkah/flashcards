
import os
from fastapi import FastAPI, Body
from fastapi.staticfiles import StaticFiles
import uvicorn

from api import api_app, database


app = FastAPI(title="root")
app.mount('/api', api_app)
# Serve the static content from the web folder at root
app.mount('/', StaticFiles(directory="dist", html=True), name="dist")

app.add_event_handler("startup", database.connect)
app.add_event_handler("shutdown", database.close)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload="True",
                port=int(os.getenv("PORT", 8080)))
