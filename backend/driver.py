from course import CourseTimings, Course
from check_clash_utils import check_clash_between_courses, merge_lect_and_tut_timings_for_a_course, check_if_current_course_can_be_added_to_template
import os
import json

def convert_course_json_to_course_object(course_json):
    print("convert to course object called for : ", course_json,"\n\n")
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

def list_clash_free_courses_according_to_current_template(current_template):
    #? current_template : CourseTimings class : Represents all the time slots occupied by the courses existing in the current template. 
    available_courses_list=[]


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
    print(get_all_courses()[0].name)
    print(get_all_courses()[0].timings.print_timings())
    ####################################################################

