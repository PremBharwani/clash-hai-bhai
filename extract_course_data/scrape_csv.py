import csv
import json
import pandas as pd
import time

path = "sched.csv"
with open(path, 'r') as file_csv:
        file_reader = csv.reader(file_csv)
        # print(file_reader)
        my_dict = {"courses" : []}
        headers = ['n_course', 'dept', 'course_name', 'pre_requisites', 'course_type', 'credits', 'instructor', 'instuctor_email', 'lec', 'Venue', 'tut', 'Venue', 'lab', 'Venue']
        next(file_reader)
        for row in file_reader:
            course_dict = {}
            # row = list(row)
            for i in range(len(headers)):
                if headers[i] not in ['Venue']:
                    course_dict[headers[i]] = row[i]
            
            course_string = list(course_dict["course_name"])
            a = course_string.index("(")
            # b = course_dict.find(")")
            code = "".join(course_string[a+1: len(course_string) -1 ])
            course_dict["course_code"] = code
            print(code)
            my_dict["courses"].append(course_dict)
        f = open("output.json", "w")
        json.dump(my_dict, f)

