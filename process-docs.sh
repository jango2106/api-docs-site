#!/bin/sh
# ====================Options=======================
helpFunction()
{
    echo ""
    echo "Usage: $0 -l"
    echo -e "Generates manifest file and moves files to docker nginx html"
    echo -e "Options:"
    echo -e "\t-l Run the script for local testing/execution"
    exit 1 # Exit script after printing help
}
runType="docker"
while getopts ":l" option; do
    case $option in
        l) # Run locally
            runType="local"
        ;;
        \?) # Invalid option
            helpFunction
        exit;;
    esac
done

if [ $runType = "docker" ]
then
    docPath='/docs'
    baseCpPath='/usr/share/nginx/html'
else
    docPath='./docs'
    baseCpPath='./public'
fi

# ====================Functions=======================
create_partial() {
    json_partial=$(jq -n --arg fn "$1" --arg ti "$2" '{file: $fn, title: $ti}')
    echo $json_partial
}

generate_doc_manifest() {
    partials=""
    for file in $1
    do
        if [[ $file =~ yaml ]]
        then
            title=$(yq e '.info.title' $docPath/$file)
        elif [[ $file =~ json ]]
        then
            title=$(jq -r '.info.title' $docPath/$file)
        else
            echo "Skipping $file"
            continue
        fi
        partial=$(create_partial "$file" "$title")
        if [[ -z "$partials" ]]
        then
            partials=$partial
        else
            partials="$partials"$'\n'"$partial"
        fi
    done
    result=$(jq -rn --arg arr "$partials" '{ arr: $arr | split("\n") } | .arr')
    echo $(echo $result | sed -e 's/"{/{/g' | sed -e 's/}"/}/g' | sed -e 's/\\"/"/g')
}
# ====================Execution=======================
files=$(ls "$docPath")
generate_doc_manifest "$files" > "$baseCpPath/doc-manifest.json"
cp -rf "$docPath" "$baseCpPath"
