yourfilenames=`ls ./swagger-docs/`
commaSeperated=`echo $yourfilenames | sed -e 's/ /, "/g' | sed -e 's/.json/.json"/g' | sed -e 's/.yaml/.yaml"/g'` 
echo "[\"$commaSeperated]" > ./public/swagger-doc-manifest.json
rm -rf ./public/swagger-docs/
cp -rf ./swagger-docs ./public/swagger-docs