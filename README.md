# api-docs-site

A single site to host all of your OpenAPI 3.0 and Swagger 2.0 json/yaml files. It allows for hot swapping out documentation and making changes on the fly for documentation needs.

## How to run

### Docker (Broken)
#### Build
`docker build -t api-doc-site:latest .`

#### Run
`docker run --name api-doc-site -d -p 8080:80 -v LOCAL_PATH_TO_DOCS:/docs api-doc-site:latest`

Docker deployment will allow you to mount a local directory (LOCAL_PATH_TO_DOCS) to a volume on the container. There is a cronjob running in the container that will regenerate the files automatically. Any changes made to the LOCAL_PATH_TO_DOCS will automatically update the containers. 

### Yarn
#### Build
`yarn install`

#### Run
`yarn start`

This will copy all files in the ./docs directory into the ./public directory and automatically update the manifest file with all of the new json/yaml files. Any time you want to add or remove a swagger doc, just make a change to the ./docs folder and run the `yarn run generate-docs-manifest` command to regenerate the files. Refresh the page to see changes.
