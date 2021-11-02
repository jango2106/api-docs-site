# api-docs-site

A single site to host all of your OpenAPI 3.0 and Swagger 2.0 json/yaml files. It allows for hot swapping out documentation and making changes on the fly for documentation needs.

## How to run

### Build

docker build -t api-doc-site:latest .

### Run

docker run --name api-doc-site -d -p 8080:80 -v directory-with-api-docs:/docs api-doc-site:latest
