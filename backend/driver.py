from course import CourseTimings, Course
from check_clash_utils import check_clash_between_courses, merge_lect_and_tut_timings_for_a_course, check_if_current_course_can_be_added_to_template, merge_courses_and_get_merged_timings
from utils import find_course_id
import os
import json

def convert_course_json_to_course_object(course_json):
    course_code = course_json['course_code']
    lec_timings = course_json['lec']
    # print("lec_timings : <", lec_timings, "> type = ", type(lec_timings), f"bool value to check if none = {lec_timings=='None'}")
    tut_timings = course_json['tut']
    # print("tut_timings : <", tut_timings, "> type = ", type(tut_timings), f"bool value to check if none = {tut_timings=='None'}")
    lab_timings = course_json['lab']
    # print("lab_timings : <", lab_timings, "> type = ", type(lab_timings), f"bool value to check if none = {lab_timings=='None'}")

    course_timings = CourseTimings()
    if not ( lec_timings=='None' ):
        course_timings.parse_timings(lec_timings, slotType='Lec')
    if not ( tut_timings=='None' ):
        course_timings.parse_timings(tut_timings, slotType='Tut')
    if not ( lab_timings=='None' ):
        course_timings.parse_timings(lab_timings, slotType='Lab')

    course_obj = Course(course_code)
    course_obj.timings = course_timings

    return course_obj

def get_all_courses_as_json():
    all_courses_database = "./../extract_course_data/Course_Schedule_2022-23-1.json"
    # Open the json file and read the data
    with open(all_courses_database) as json_file:
        data = json.load(json_file)
        return data['courses']
    return None

def get_all_courses(): # Get all the courses as the courses object list.
    all_courses = []
    all_courses_database = "./../extract_course_data/Course_Schedule_2022-23-1.json"
    # Open the json file and read the data
    with open(all_courses_database) as json_file:
        data = json.load(json_file)
        for course_json in data['courses']:
            course_obj = convert_course_json_to_course_object(course_json)
            all_courses.append(course_obj)
    return all_courses

def get_course_json_using_course_id(course_id):
    all_courses_database = "./../extract_course_data/Course_Schedule_2022-23-1.json"
    # Open the json file and read the data
    with open(all_courses_database) as json_file:
        data = json.load(json_file)
        if int(course_id) > len(data['courses']):
            raise Exception("Course ID is out of range")
    return data['courses'][course_id-1]

def list_clash_free_courses_according_to_current_template(current_template):
    #? current_template : CourseTimings class : Represents all the time slots occupied by the courses existing in the current template. 
    available_courses_list=[]

def add_course_to_current_template(course_id, current_template):
    
    #? course_id : Integer : Represents the course ID of the course to be added to the template.
    #? current_template : CourseTimings class : Represents all the time slots occupied by the courses existing in the current template. 

    
    # Create a dummy course with timings as current_template
    dummy_course_holding_current_template = Course('current_template')
    dummy_course_holding_current_template.timings = current_template    
    
    # course_id = find_course_id(course_code)

    course_json = get_course_json_using_course_id(course_id)
    course_obj = convert_course_json_to_course_object(course_json)

    # Check if the course can be added to the template
    clashing_slots_list = check_if_current_course_can_be_added_to_template(current_template, course_obj )


    if(clashing_slots_list==None): #No clashes.
        current_template = merge_courses_and_get_merged_timings(course_obj, dummy_course_holding_current_template)
        return current_template
    

    raise Exception(f"Clash found in adding Course({course_json['course_name']}) into the current template. \n Clashing slots : {clashing_slots_list}") 
    

def construct_current_template(course_code_list):

    #? course_code_list : List of strings : Represents the course codes of the courses provided by the user that are to be added to the template.
    
    current_template = CourseTimings() # Represents all the time slots occupied by the courses existing in the current template.

    for course_code in course_code_list:
        # try:
            # course_id = find_course_id(course_code)
            # add_course_to_current_template(course_id, current_template)
        # except Exception as e:
        #     print(f"Not adding {course_code} to the template because: ", "\n", e)
        
        course_id = find_course_id(course_code)
        current_template = add_course_to_current_template(course_id, current_template)

    return current_template

def show_possible_courses_to_add(current_template, dept_to_choose_from = None):
    
    possible_courses_codes = []

    courses = get_all_courses_as_json()
    if dept_to_choose_from == None or dept_to_choose_from == "":
        dept_courses = courses
    else:
        dept_courses = [x for x in courses if x['dept']==dept_to_choose_from ]
    # dept_courses = courses

    for course in dept_courses:
        # print(f"Trying to see if {course['course_name']} fits in the current template ... ",end=' ')
        try:
            _ = add_course_to_current_template(course['n_course'], current_template)
            possible_courses_codes.append(course['course_code'])
            # print(f" WORKS!")
        except Exception as e:
            # print(e) # Commenting this out to clear/prettify the logs.
            pass
    return possible_courses_codes


def print_course_names(course_codes):
    for course_code in course_codes:
        course_id = find_course_id(course_code)
        course_json = get_course_json_using_course_id(course_id)
        print(course_json['course_name'])

if __name__ == "__main__":

    ################# MERGE_LECT_AND_TUT_TIMINGS_FOR_A_COURSE ############################
    # course1 = Course("CSE-101", timingsLec="M 15:30-16:30, T 14:00-15:00", timingsTut="M 15:00-16:15, Th 14:00-15:00", timingsLab="MTWThF 14:00-17:00")
    # print(course1.name, " Timings before merging:")
    # course1.timings.print_timings()
    # print("\n\n",course1.name, " Timings after merging:")
    # print(merge_lect_and_tut_timings_for_a_course(course1))
    #################################################################################

    ################### CHECKING CLASH BETWEEN COURSES FUNCTIONALITY #######################################
    # course1 = Course("CSE-101", timingsLec="M 15:30-16:30, T 14:30-15:30", timingsTut="M 15:00-16:15, Th 14:00-15:00", timingsLab="MTWThF 14:00-17:00")
    # course2 = Course("CSE-102", timingsLec="M 12:00-15:30 , T 14:00-15:00", timingsLab="MTWThF 14:00-17:00" )
    # print(check_clash_between_courses(course1, course2))
    #################################################################################

    ######### CHECKING IF CURRENT COURSE CAN BE ADDED TO TEMPLATE ###################
    # course1 = Course("CSE-101", timingsLec="M 15:30-16:00, T 14:30-15:30", timingsTut="M 15:00-16:15, Th 14:00-15:00", timingsLab="MTWThF 14:00-17:00")
    # currrent_template = CourseTimings()
    # currrent_template.parse_timings("M 16:00-17:00", slotType='Lec')

    # print(check_if_current_course_can_be_added_to_template(currrent_template, course1))
    #################################################################################

    ################ GETTING ALL COURSES ###############################
    # print(get_all_courses()[0].name)
    # print(get_all_courses()[0].timings.print_timings())
    ####################################################################


    ################ BUILDING A TEMPLATE WITH COURSE_CODES #############
    # list_of_course_codes = ['CE311A','CE331A','CE341A','CE351A','CE361A','CE371A','ESO207A'] # Works fine.
    # list_of_course_codes = ['CE311A','CE331A','CE341A','CE351A','CE361A','CE371A','ESO207A', 'ESO207A'] # 'ESO207A' REPEATED TWICE. FAILS AS IT WOULD DETECT A CLASH.
    # curr_template = construct_current_template(list_of_course_codes)
    # curr_template.print_timings()
    ####################################################################

    ################## SHOWING POSSIBLE COURSES TO ADD GIVEN THE CURRENT TEMPLATE #################

    list_of_course_codes = ['CE311A','CE331A','CE341A','CE351A','CE361A','CE371A'] # Works fine. # Prem's Template.

    curr_template = construct_current_template(list_of_course_codes)
    print("Current template timings: ")
    curr_template.print_timings()
    print("\n\n")
    # print_course_names(show_possible_courses_to_add(curr_template))

    ####################################################################

    # pass