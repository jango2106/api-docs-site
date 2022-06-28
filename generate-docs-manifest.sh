#!/bin/sh

echo "Start generating-doc-manifest.sh..."
yourfilenames=`ls /docs`
commaSeperated=`echo $yourfilenames | sed -e 's/ /, "/g' | sed -e 's/.json/.json"/g' | sed -e 's/.yaml/.yaml"/g'` 
echo "[\"$commaSeperated]" > /usr/share/nginx/html/doc-manifest.json
cp -rf /docs /usr/share/nginx/html
echo "Finished copying/creating all files..."