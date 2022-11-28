# Flashcards UI

## Development server

Run `npm ci` once. 
Run `npm start` for a dev server which takes proxy-config into account. 
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

### Access localhost from the web

You need a seperate server for making Angular PWAs accessible from the web.
A recommendation is `http-server`, which is a dev-dependency and can be startet via `npx http-server -p 80 -c-1 dist/flashcards`.
Another recommendation would be to host on an nginx docker.
Run `npx ngrok http --host-header=rewrite --region=eu 80` for finally exposing the app to the web (requires [ngrok](https://ngrok.com)).

⚠ ngrok is currently removed from dev dependencies due to error in certificate chain

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `/flashcards-ui/dist/` directory.

## Google Cloud Run

### Deployment

After building, it should be possible to deploy from `/flashcards-ui/` with `gcloud run deploy`.
Make sure to be authenticated and logged into to the correct project.
The nginx congiguration `nginx/default.conf` here is just as important as the `Dockerfile`

### Dockerize

There is a `Dockerfile` which can be built by running `docker build -t flashcards-ui .`.

Run `docker run -it --rm -p 80:8080 flashcards-ui` to take a look at the nginx output

If everything is okay, the page http://0.0.0.0:80 should be available.

## Progressive Web App

Use this to get if you are on an ios device (add extra margin)

<link rel="apple-touch-startup-image" href="images/splash/launch-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-1242x2148.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">
<link rel="apple-touch-startup-image" href="images/splash/launch-2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">

## Running unit tests

TODO - Unit Tests are still missing here.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

TODO - e2e tests are still missing here.
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
