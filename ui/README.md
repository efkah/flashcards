# Flashcards UI

## Local Development

Run `npm ci` once. 
Run `npm start` for a dev server which takes proxy-config into account. 
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

### Access localhost from the web (on iOS)

You need a seperate server for making Angular PWAs accessible from the web.
A recommendation is `http-server`, which is a dev-dependency and can be startet via `npx http-server -p 80 -c-1 dist/flashcards`.
Another recommendation would be to host on an nginx docker.
Run `npx ngrok http --host-header=rewrite --region=eu 80` for finally exposing the app to the web (requires [ngrok](https://ngrok.com)).

⚠ ngrok is currently removed from dev dependencies due to error in certificate chain

## Google Cloud Run

### Deployment

After building, it should be possible to deploy from `/flashcards-ui/` with `gcloud run deploy`.
Make sure to be authenticated and logged into to the correct project.
The nginx configuration `nginx/default.conf` here is just as important as the `Dockerfile`

### Dockerize

There is a `Dockerfile` which can be built by running `docker build -t flashcards-ui .`.

Run `docker run -it --rm -p 80:8080 flashcards-ui` to take a look at the nginx output

If everything is okay, the page http://0.0.0.0:80 should be available.