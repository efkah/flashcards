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

### Build a Docker Container
⚠ In `nginx/default.conf` change the varialbe `$PORT` to `8080` if you build locally, change back for gcloud/pipeline deployment.

1. Make just `flashcards-ui/dist` has files, f.e. by running `npm run build`.
2. Change working dir to `flashcards-ui`.
3. There is a `Dockerfile` which can be built by running `docker build -t flashcards-ui .`.
4. Run `docker run -it --rm -p 4200:8080 flashcards-ui` to take a look at the nginx output.
5. If everything is okay, the page `http://localhost:4200` should be available.

## Analysis and design choices
### indexed db usage
An overview of alternatives can be found here:
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API?retiredLocale=de#see_also

Half of the alternatives were minimalistic wrappers, the other fully integrated with a db provider.
I was looking for the later one, so pouchDB, mini-mongo and dexie. 
Though RxDB, a library which seems to target all backends and unify wrapper libraries seems like a good option, i decided for a native solution.
RxDB added too much set up to a simple task like add a database, though it might be a good option to **switch to at a certain point**, without changing the database.
Though pouchDB seems cool and open source i decided against Apache Stacks.
As mini-mongo would use the already known atlas/mongo synthax, i decided for something new.
Dexie was the best choice for learning something new which is well documented.

### export db as json
Here is a library for exporting a database:
- https://github.com/Polarisation/indexeddb-export-import

Exporting a databse without meta-information (only tables) is way easier and does the trick here.
So i decided for manual import/export.
