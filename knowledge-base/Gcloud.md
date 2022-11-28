# Google Cloud



## Google Cloud Deploy

gcloud auth login
`gcloud run deploy`

### get gcloud

https://cloud.google.com/sdk/docs/install

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

- Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
- Run `gcloud topic --help` to learn about advanced features of the SDK like arg files and output formatting
- Run `gcloud cheat-sheet` to see a roster of go-to `gcloud` commands.

### TODO

To make this the default region, run `gcloud config set run/region europe-west1`.

Deploying from source. To deploy a container use [--image]. See https://cloud.google.com/run/docs/deploying-source-code for more details.

Cleanup: https://cloud.google.com/run/docs/quickstarts/build-and-deploy?_ga=2.1297463.-762169132.1646908149#clean-up

Deploy to container also look here: https://dev.to/kevinlien/how-to-host-your-site-for-free-on-google-cloud-run-22l3
