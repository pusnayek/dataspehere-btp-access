# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.


## Set user environment paramters
These parameters cannot be used locally with cds watch, but works when deployed. Use following command to set them.
> cf set-env dataspehere-api-srv SAPATHON_OAUTH_ACCESS '{"client_id": "sb--","client_secret":"bb--","auth_refresh_token":"000000-r","hostname":"---.cloud.sap","authhostname":"--.authentication.us10.hana.ondemand.com"}'
> cf restage dataspehere-api-srv

