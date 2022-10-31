from configparser import LegacyInterpolation
from datetime import date
import json
from operator import le
from time import time
import copy

epoch_dict = {
        "M" : 0,
        "T" : 1,
        "W" : 2,
        "Th" : 3,
        "F" : 4
    }
def return_since_epoch(time : str, day : str):
    time_int = int(time)
    return str(time_int + epoch_dict[day]*2400)

# def add_epoch_key(path):
#     for i in dict["courses"]:
#         timings = i["timings"]
#         timings_list = []
#         for day in timings:
#             start, stop = timings[day][0], timings[day][1]
#             if day in epoch_dict:
#                 timings_list.append([return_since_epoch(start, day), return_since_epoch(stop, day)])
#         print(timings_list)
#         i["timings_since_epoch"] = timings_list
#     filename = path
#     f = open(filename, 'w')
#     json.dump(dict, f)
#     f.close()

def add_epoch_key(filename):
    filename = filename
    f = open(filename, 'r')
    dict = json.load(f)
    f.close()
    
    for dept in dict:
        for i in range(len(dict[dept])):
            timings = dict[dept][i]["timings"]
            timings_list = []
            for day in timings:
                start, stop = timings[day][0], timings[day][1]
                if day in epoch_dict:
                    timings_list.append([return_since_epoch(start, day), return_since_epoch(stop, day)])
            print(timings_list)
            dict[dept][i]["timings_since_epoch"] = timings_list
        f = open(filename, 'w')
        json.dump(dict, f)
        f.close()

