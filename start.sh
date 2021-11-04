#!/bin/sh
echo "generating files..."
sh process-docs.sh
echo "starting crontab..."
crontab /etc/cron.d/manifest-cron
cron start
echo "starting nginx..."
nginx -g 'daemon off;'