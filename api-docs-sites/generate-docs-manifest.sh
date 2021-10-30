yourfilenames=`ls ./public/swagger-docs/`
commaSeperated=`echo $yourfilenames | sed -e 's/ /, "/g' | sed -e 's/.json/.json"/g'`
echo "[\"$commaSeperated]" > ./public/swagger-doc-manifest.json