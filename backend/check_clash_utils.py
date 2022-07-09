import copy
from course import Course, CourseTimings

def append_timings_for_particular_day(day_timings1, day_timings2): 
    # Takes in two lists of tuples representing timings, and returns a list of tuples.
    # The returned list is the list of the merged timings.
    list1 = copy.deepcopy(day_timings1)
    list2 = copy.deepcopy(day_timings2)
    list1.extend(list2) # Appending the list.
    list1.sort() # Sorting the list.
    return list1

def remove_overlaps_from_list_of_timing_tuples(list1):
    i=0
    while(i<len(list1)-1):
        curr_tuple = list1[i]
        next_tuple = list1[i+1]

        # (s1, e1) and (s2, e2) # Since the list is sorted: s2>=s1 always!
        if curr_tuple[1]<=next_tuple[0]: # No overlap.
            i+=1
            continue
        # Overlap.
        if curr_tuple[1]<=next_tuple[1]: 
            list1[i]=(curr_tuple[0], next_tuple[1]) 
        else:
            list1[i]=(curr_tuple[0], curr_tuple[1])
        
        list1.pop(i+1) #remove the element at i+1

def merge_lect_and_tut_timings_for_a_course(course): 
    # Merge the lecture and tutorial timings of the given course. Helps us while checking the clash. 
    # Returns a courseTimings object.

    merged_timings = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }

    lecture_timings_dict = course.timings.lectureTimingsDict
    tutorial_timings_dict = course.timings.tutorialTimingsDict

    for day_key in merged_timings:
        merged_timings[day_key] = append_timings_for_particular_day(lecture_timings_dict[day_key], tutorial_timings_dict[day_key])
        remove_overlaps_from_list_of_timing_tuples(merged_timings[day_key])

    return merged_timings



def merge_courses_and_get_merged_timings(course1, course2):
    lec_tut_course1 = merge_lect_and_tut_timings_for_a_course(course1)
    lec_tut_course2 = merge_lect_and_tut_timings_for_a_course(course2)

    for day_key in lec_tut_course1:
        lec_tut_course1[day_key] = append_timings_for_particular_day(lec_tut_course1[day_key], lec_tut_course2[day_key])

    course_timings = CourseTimings()
    course_timings.lectureTimingsDict = lec_tut_course1
    return course_timings


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

def find_clash_for_particular_day(daytimings1, daytimings2):
    
    clashing_time_list = []

    for time1 in daytimings1:
        for time2 in daytimings2:
            clash = find_clash_among_timetuples(time1, time2)
            if clash==None:
                continue
            clashing_time_list.append(clash)
        
    return clashing_time_list
        
def check_clash_between_courses(course1, course2):
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
    # Currently I am comparing only lecture, tutorial times. TODO : Consider labs timings as well.
    # ! Figure out the business logic for clashes for the lab part. Because all days lab slot is displayed, but the student 
    # ! has to attend only one of those.
    courseTimings1 = course1.timings
    courseTimings2 = course2.timings

    for day_key in clashTimings:
        course1_day_timings = courseTimings1.lectureTimingsDict[day_key]
        course2_day_timings = courseTimings2.lectureTimingsDict[day_key]
        clashTimings[day_key] = find_clash_for_particular_day(course1_day_timings, course2_day_timings)
        if len(clashTimings[day_key])>0:
            boolClash = True

    if boolClash:
        return clashTimings
    return None

def check_if_current_course_can_be_added_to_template(current_template, course_to_add):
    #? current_template : CourseTimings class : Represents all the time slots occupied by the courses existing in the current template. 
    #? course_to_add : Course class : Represents the course which we have to check if it can be added to the current template.

    # Returns None if the course_to_add can be included in the current_template without any clashes.
    # Returns the clashing timings if the course_to_add clashes with the course.
    
    dummy_course = Course('current_template')
    dummy_course.timings = current_template
    
    return check_clash_between_courses(dummy_course, course_to_add)


if __name__=="__main__":

    list1 = [ ("0700", "0900") , ("1430", "1530"), ("1030", "1600") ]
    list2 = [ ("0800", "0900") , ("1400", "1530"), ("1100", "1600") ]
    ll = append_timings_for_particular_day(list1, list2)
    remove_overlaps_from_list_of_timing_tuples(ll)
    print(ll)

    # tuple11 = ("0800", "0900")
    # tuple22 = ("0900", "0930")
    # print(find_clash_among_timetuples(tuple11, tuple22)) # To test to see if clashes are caught between timings.