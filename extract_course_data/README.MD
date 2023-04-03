# Extracting the course data & preparing for use

Following is the process to prepare the data for this tool :

1. Head to Pingala => Academic Management => Timetable => Check timetable. Select the Academic Year & Semester, select the option to download the data as an excel file
2. Convert the excel file into a csv file for further processing, and make sure to store the file as `sched.csv` under the `extract_course_data` directory.
3. Further run the bash script `extract_data.sh` which will automatically parse all the data in the csv file and place it in the `js` directory.

