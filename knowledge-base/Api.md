# Api
There were 2 APIs in advanced beta states at one point, that were removed.
You can find them in the repository, tagged `v0.1` to use them as Proof of Concepts.

## fastapi-mongo
Based on python fastapi with a mongo backend. 
This one was working quite well. 

- There is a `readme.md` at the root of the folder.
- Check this out for syncing mechanisms.
- ready for `gcloud` deploy, check out the `Dockerfile` 

### Files at Root
The files at root are needed to re enable local development and Gcloud Builds

- `docker-compose.yml` - contains additional services to for development, like adminer and database servers
- `requirements.txt` - python package manager file
- `Dockerfile` - Build an start a python based docker image
- `dist/flashcards/.dockerignore` - used for setting up docker container for gcloud

### App Host
This Backend at one point hosted the app, since there were problems with the trust in the gcloud cluster.
Though this was fixed at one point, the `Dockerfile` still contains information to copy the app and the `main.py` still mounts the files.


## dotnet-postgres
Though this backend never was working, the frontend might already be rewritten for it.
The Idea was to save the information in a structed way in postgres (in `5NF`).