#! /bin/sh

# Executing the python script first.
python3 scrape_csv.py

# Moving the newly created courses.json into the frontend/js directory
mv courses.json ../js/

# Changing the cwd to the frontend/js directory
cd ../js/

# Renaming the courses.json file to course_data.js
mv courses.json course_data.js

# Adding the "export const course_data =" to the beginning of the file
sed -i '1s/^/export const course_data = /' course_data.js

