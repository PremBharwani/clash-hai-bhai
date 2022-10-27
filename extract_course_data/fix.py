from configparser import LegacyInterpolation
from datetime import date
import json
from operator import le
from time import time
import copy
filename = "nolec.json"
f = open(filename, 'r')
dict = json.load(f)
# print(len(dict))

def prettify_lec(i : int):
    if  dict["courses"][i]['tut'] != "None":
        time_string = dict["courses"][i]['lec'] + ' '  +dict["courses"][i]['tut']
    else:
        time_string = dict["courses"][i]['lec']
    # print(time_string)
    lst = list(time_string)
    for i in lst:
        if i == '\n':
            lst.pop(lst.index(i))
        elif i == ',':
            lst.pop(lst.index(i))
        elif i in ['M','T', 'W', 'Th', 'F']:
            lst[lst.index(i)] = ' {} '.format(i)
        elif i == 'h':
            lst[lst.index(i) - 1] = ' Th '
            lst.pop(lst.index(i)) 
    strung = "".join(lst)
    strung_ =strung.split(' ')
    final = []
    for i in strung_:
        if i == '':
            continue
        elif len(i) == len('T09:00-10:00'):
            final.append(i[0])
            final.append(i[1:])
        else:
            final.append(i)
    
    for i in final:
        if len(i) == len('09:00-10:00'):
            final[final.index(i)] = i.split("-")

    for i in final:
        if len(i) == 2 and type(i) == list:
            final[final.index(i)] = ["".join(z.split(":")) for z in i]

    return final


def get_dict(i):
    timestring = prettify_lec(i)
    if (timestring == ['None']):
        return {}
    dates_indices = []
    # if (i == 7):
    #     print(timestring)
    for i in range(len(timestring)):
        if (len(timestring[i]) != 1):
        
            if (type(timestring[i]) != str):
                dates_indices.append(i)
        
    # print(dates_indices)
    dates_dict = {}
    for i in range(len(timestring)):
        # print(i)
        if i not in dates_indices:
            ind = next_date(i, dates_indices)
            # print(ind)
            try:
                dates_dict[timestring[i]] = timestring[dates_indices[ind]]
            except:
                print(timestring)
    
    return dates_dict
        
def next_date(i : int, dates_indices):
    for ctr in range(len(dates_indices)):
        if dates_indices[ctr] > i:
            return ctr


# for i in range(495,496):
#     print(prettify_lec(i))

new_dict = {"courses": []}
for i in range(len(dict["courses"])):
    x = get_dict(i)
    # print(i)
    new_dict["courses"].append((dict["courses"][i]))
    new_dict["courses"][i]["timings"] = x


outfile = "courses_updated.json"

f_o = open(outfile, "w")
json.dump(new_dict, f_o)
    