import json

def find_course_id(courseCode):
    # This function queries data.json and compares
    # the value of the argument with the course_code key in the 
    # json file. If there is a match, it returns the n_course
    # else it returns None

    possible_courses = [] # Stores tuples (CourseCode, CourseID) of courses that we think are close to the given courseCode

    path_to_json_database = "./../extract_course_data/Course_Schedule_2022-23-1.json"
    with open(path_to_json_database, 'r') as f:
        data = json.load(f)
        listOfCourses = data['courses']
        for i in range(len(listOfCourses)):
            if listOfCourses[i]['course_code'] == courseCode:
                return i+1
            elif str(courseCode) in listOfCourses[i]['course_code']:
                possible_courses.append(listOfCourses[i]['course_code'])
    if(len(possible_courses)!=0):
        raise Exception(f"Couldn't EXACTLY find any courses with the given course code <{courseCode}>. \n Possible list of courses that you might have wanted to enter:\n", possible_courses)

    return None    

if __name__=="__main__":
    print(find_course_id("ESO207A")) # To test the find_course_id function
