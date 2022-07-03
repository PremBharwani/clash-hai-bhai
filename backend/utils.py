import json

def findCourseID(courseCode):
    # This function queries data.json and compares
    # the value of the argument with the course_code key in the 
    # json file. If there is a match, it returns the n_course
    # else it returns None
    path_to_json_database = "./../extract_course_data/Course_Schedule_2022-23-1.json"
    with open(path_to_json_database, 'r') as f:
        data = json.load(f)
        listOfCourses = data['courses']
        for i in range(len(listOfCourses)):
            if listOfCourses[i]['course_code'] == courseCode:
                return i+1
    return None    

if __name__=="__main__":
    print(findCourseID("ESO207A")) # To test the findCourseId function
