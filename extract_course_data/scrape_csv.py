import csv
import json
from tokenize import String
import pandas as pd
import time
import utils

path = "sched.csv"

def get_last_open_bracket(string):
    pos = 0
    for i in range(len(string)):
        if string[i] == "(":
            pos = i
    return pos

def create_output():
    with open(path, 'r') as file_csv:
            file_reader = csv.reader(file_csv)
            my_dict = {}
            headers = ['n_course', 'dept', 'course_name', 'pre_requisites', 'course_type', 'credits', 'instructor', 'instuctor_email', 'lec', 'Venue', 'tut', 'Venue', 'lab', 'Venue']
            next(file_reader)
            for row in file_reader:
                course_dict = {}
                for i in range(len(headers)):
                    if headers[i] not in ['Venue']:
                        course_dict[headers[i]] = row[i]
                
                course_string = list(course_dict["course_name"])
                a = get_last_open_bracket(course_string)
                code = "".join(course_string[a+1: len(course_string) -1 ])
                course_dict["course_code"] = code
                if course_dict['dept'] in my_dict:
                    my_dict[course_dict['dept']].append(course_dict)
                else:
                    my_dict[course_dict['dept']] = [course_dict]
            f = open("output.json", "w")
            json.dump(my_dict, f)



create_output()
print("DONE")


#!DO NOT MOVE THE IMPORTS UP. FIX depends on a CSV file that ust be created right before
#! it should be called.

utils.get_fixed_json("courses.json")
utils.add_epoch_key("courses.json")