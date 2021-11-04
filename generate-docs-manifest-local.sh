echo "Start generating-doc-manifest.sh..."
yourfilenames=`ls ./docs`
commaSeperated=`echo $yourfilenames | sed -e 's/ /, "/g' | sed -e 's/.json/.json"/g' | sed -e 's/.yaml/.yaml"/g'` 
echo "[\"$commaSeperated]" > ./public/doc-manifest.json
cp -rf ./docs ./public/
echo "Finished copying/creating all files..."