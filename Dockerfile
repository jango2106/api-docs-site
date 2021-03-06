FROM node:14-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY ./ .

RUN yarn build

FROM nginx:1.18.0 as production-stage
WORKDIR /app
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /ect/nginx/nginx.conf

RUN apt-get update && apt-get -y install cron dos2unix

ADD crontab /etc/cron.d/manifest-cron
RUN dos2unix /etc/cron.d/manifest-cron
RUN chmod 0644 /etc/cron.d/manifest-cron
RUN touch /var/log/cron.log

ADD generate-docs-manifest.sh .
RUN dos2unix generate-docs-manifest.sh
RUN chmod 777 generate-docs-manifest.sh
ADD start.sh .
RUN dos2unix start.sh
RUN chmod 777 start.sh

# Add stuff to /docs to generate files
CMD ["sh", "start.sh"]