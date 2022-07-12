import json

from driver import construct_current_template, show_possible_courses_to_add, get_course_json_using_course_id
from utils import find_course_id

def serve_courses_json_as_dictionary():
    with open('./../extract_course_data/Course_Schedule_2022-23-1.json') as f:
        data = json.load(f)
        return data


def serve_non_clashing_courses(current_course_codes_list, dept_to_choose_from):

    courses_list = []

    current_template = construct_current_template(current_course_codes_list)
    # TODO : Ensure that if there are any clashes in the currently selected courses sent from user, we report that.
    # print(current_template.print_timings())

    courses_list = show_possible_courses_to_add(current_template, dept_to_choose_from)

    
    

    courses_json_list = [ get_course_json_using_course_id( find_course_id(x)) for x in courses_list ]
    
    return_dictionary_object = {
        "non_clashing_courses": courses_json_list
    }

    return return_dictionary_object

def get_course_template_json():
    with open('./../data/template.json') as f:
        data = json.load(f)
        return data


if __name__ == "__main__":

    # d1 = serve_courses_json_as_dictionary()
    # print(d1['courses'][0])

    # print(get_course_json_using_course_id( find_course_id('ESO207A') ))
    pass



