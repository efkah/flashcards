
# Dockerize

There is a `Dockerfile` and a `requirements.txt`.
Run `docker build -t flashcards .` to build an image from the dockerfile.

Run `docker run -d --rm -p 80:80 flashcards` to run the app detached (use the `-it` instead of `-d` to launch into `bash`).

(Check if it is running with `docker container ls`)