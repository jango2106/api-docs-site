# api-docs-site

A single site to host all of your OpenAPI 3.0 and Swagger 2.0 json/yaml files. It allows for hot swapping out documentation and making changes on the fly for documentation needs.

## How to run

### Docker (Broken)
#### Build

docker build -t api-doc-site:latest .

#### Run

docker run --name api-doc-site -d -p 8080:80 -v ./:/docs api-doc-site:latest

### Yarn
#### Build
yarn install

#### Run
`yarn start`

This will copy all files in the ./docs directory into the ./public directory and automatically update the manifest file with all of the new json/yaml files. Any time you want to add or remove a swagger doc, just make a change to the ./docs folder and run the `yarn run generate-docs-manifest` command to regenerate the files. Refresh the page to see changes.
