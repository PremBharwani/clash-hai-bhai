# Extract Course Data

> Earlier I was extracting the course data from the course schedule PDF uploaded by DOAA. It was just meh. Later while discussing this with someone, I got to know that
> Pingala timetable can be downloaded as an Excel file directly :P So we just moved our scripts to work according to that. 

### Description

Following is the process to prepare the data for this tool :

1. Head to Pingala => Academic Management => Timetable => Check timetable. Select the Academic Year & Semester, select the option to download the data as an excel file
2. Convert the excel file into a csv file for further processing, and make sure to keep the name as `sched.csv`
3. Further run the bash script `extract_data.sh` which will automatically parse all the data in the csv file and place it in the frontend directory where it'll be used by the web app.

Now you're good to go and use the app, move ahead to the `frontend` directory!