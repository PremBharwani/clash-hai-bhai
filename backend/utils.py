import json
import re

##### Utils for course.py #####
def get_slots_list_from_timing_string(timing_str): 
    # Example : get_slots_list_from_timing_string("TF 12:00-13:00 ,W 14:00-15:00") => ["TF12:00-13:00", "W14:00-15:00"]

    timing_str = timing_str.strip() # Removing trailing and leading whitespaces
    timing_str = "".join(((timing_str)).split()) # Removing the whitespaces in b/w
    slots_list = timing_str.split(',') # Splitting based on the comma
    return slots_list

def extract_slotdays_slottimings_from_slot_str(slot_str): \
    # Returns a tuple of format : (slotdays, slottimings_tuple )  # Note: slottimings_tuple = (starttime, endtime)
    # Example : extract_slotdays_slottimings_from_slot_str("TF 12:00-13:00") => ("TF", (1200, 1300))
    
    
    m = re.match(r"(?P<slot_days>[a-zA-z]+)(?P<slot_timings>[:\-0-9]+)", slot_str) # Seperating the slot days & slot time. Example : TWTh08:00-09:00  ==>  TWTh , 08:00-09:00
    slot_days = str(m.groupdict()['slot_days'])
    slot_timings = (str(m.groupdict()['slot_timings']))
    
    timingsList = ("".join(slot_timings.split(':'))).split('-') # Example:  "08:00-09:00" ==> "0800-0900"  ==> [800, 900]
    
    timingsTuple = (timingsList[0], timingsList[1])

    return (slot_days, timingsTuple)

###############################


def find_clash_among_timetuples(timeTuple1, timeTuple2): # Time Tuple : (starttime, endtime)
    # Returns the tuple of overlapping values
    # Else returns none
    t1start = timeTuple1[0]
    t1end = timeTuple1[1]
    t2start = timeTuple2[0]
    t2end = timeTuple2[1]

    if t2start<t1start:
        t2start = timeTuple1[0]
        t2end = timeTuple1[1]
        t1start = timeTuple2[0]
        t1end = timeTuple2[1]

    if t1end<=t2start:
        return None
    retTuple = (t2start, min(t1end, t2end))
    return retTuple



def checkClash(course1, course2):
    # Note to self. If further you use this to check a clash for a particular 
    # course with an existing template<Which can be represented as a courseTimings object>
    # make sure you set course1 as the single course, and course2 as the template.

    # Check if the two courses clash 
    # return the clashing time slots as a dictionary of lists,
    # where clashing day is key, and the value is a list where clashes occur 
    # else return None
    clashTimings = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
    boolClash = False
    # Currently I am comparing only lecture times. TODO : Consider labs, tut timings as well.
    # ! Figure out the business logic for clashes for the lab part. Because all days lab slot is displayed, but the student 
    # ! has to attend only one of those.
    courseTimings1 = course1.timings
    courseTimings2 = course2.timings

    for day in courseTimings1.lectureTimingsList:
        if len(courseTimings1.lectureTimingsList[day]) == 0:
            continue
        for time1 in courseTimings1.lectureTimingsList[day]:
            # Iterate over the day entry in courseTimings2
            for time2 in courseTimings2.lectureTimingsList[day]:
                # Note time1 and time2 are tuples
                clash = find_clash_among_timetuples(time1, time2)
                if clash==None:
                    continue
                clashTimings[day].append(clash)
                boolClash = True


    if boolClash:
        return clashTimings
    return None

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

    # tuple11 = ("0800", "0900")
    # tuple22 = ("0900", "0930")
    # print(find_clash_among_timetuples(tuple11, tuple22)) # To test to see if clashes are caught between timings.