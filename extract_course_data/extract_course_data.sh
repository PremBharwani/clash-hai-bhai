#!/bin/bash

# Check if no arguments are passed
if [ $# -eq 0 ]; then
    echo "No arguments passed"
    echo "Usage: $0 <file_name>"
    exit 1
fi

# basic -h --help option
if [ "$1" == "-h" ] || [ "$1" == "--help"]; then
    echo "Usage: $0 <xlsx_file_to_scrape>"
    echo "Example: $0 Course_Schedule_2022-23-1.xlsx"
    exit 0
fi

# Run the python script to extract the data from the pdf.
python3 extract_course_data.py $1

# Get the name of the file without the extension.
file_name=$(basename "$1" .xlsx)

# Replacing the '\\n' occurences from the json file using sed. Pipe the output to a new file.
sed 's/\\n//g' $file_name.json > $file_name.json.tmp

# Remove the old file.
rm $file_name.json

# Rename the new file.
mv $file_name.json.tmp $file_name.json
