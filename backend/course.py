
import re
from utils import extract_slotdays_slottimings_from_slot_str, get_slots_list_from_timing_string

class CourseTimings: # The objects for these would hold Lecture, Tutorial & Lab timings for a particular course
    
    def __init__(self): # Constructor to initialise the object.
        self.lectureTimingsList = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
        self.tutorialTimingsList = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
        self.labTimingsList = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
        self.timingString = ""
    


    # This method takes in a string and returns a dictionary of with 5 keys
    # each representing a week day. 
    # Value corresponding to each key is timings for each day of the week
    # The timings are represented in the form of a tuple as mentioned before.
    
    # example input 1 : W 15:00-16:15 ,M 17:10-18:25
    # example input 2 : TF 12:00-13:00 ,W 14:00-15:00

    def parse_timings(self, timingString, slotType='Lec'):

        slotsList = get_slots_list_from_timing_string(timingString)
        
        for slot in slotsList: # Iterating over each slot

            mytuple = extract_slotdays_slottimings_from_slot_str(slot)
            slot_days = mytuple[0]
            timingsTuple = mytuple[1]

            curr_day = ""
            i=0
            while i<(len(slot_days)+1):
                if i==len(slot_days): # If last day, then push the timings to the day.
                    if slotType == 'Lec':
                        self.lectureTimingsList[curr_day].append(timingsTuple)
                    elif slotType == 'Tut':
                        self.tutorialTimingsList[curr_day].append(timingsTuple)
                    elif slotType == 'Lab':
                        self.labTimingsList[curr_day].append(timingsTuple)
                    curr_day = ""
                    break
                if (slot_days[i].isupper() and curr_day!="") :
                    # Push the timings to the day.
                    if slotType == 'Lec':
                        self.lectureTimingsList[curr_day].append(timingsTuple)
                    elif slotType == 'Tut':
                        self.tutorialTimingsList[curr_day].append(timingsTuple)
                    elif slotType == 'Lab':
                        self.labTimingsList[curr_day].append(timingsTuple)
                    curr_day = ""
                    i-=1
                else:
                    curr_day+=slot_days[i]
                i+=1

            # day = "" + slot_days[0]
            # for i in range(1, len(slot_days)):
            #     if slot_days[i].isupper():
            #         # Push this day's timings
            #         if slotType == 'Lec':
            #             self.lectureTimingsList[day].append(timingsTuple)
            #         elif slotType == 'Tut':
            #             self.tutorialTimingsList[day].append(timingsTuple)
            #         elif slotType == 'Lab':
            #             self.labTimingsList[day].append(timingsTuple)
            #         day=slot_days[i]
            #     else:
            #         day+=slot_days[i]

            # if not len(day)==0:
            #     # Push this day's timings
            #     self.lectureTimingsList[day].append(timingsTuple)

        self.timingString = timingString

    def print_timings(self):
        buildStr = f"Lec : {str(self.lectureTimingsList)}\nTut : {str(self.tutorialTimingsList)}\nLab : {str(self.labTimingsList)}"
        print(buildStr)


class Course:
    def __init__(self, name, timingsLec=None, timingsTut=None, timingsLab=None):
        self.name = name
        courseTimings = CourseTimings()
        if not timingsLec == None:
            courseTimings.parse_timings(timingsLec, slotType='Lec')
        if not timingsTut == None:
            courseTimings.parse_timings(timingsTut, slotType='Tut')
        if not timingsLab == None:
            courseTimings.parse_timings(timingsLab, slotType='Lab')
        self.timings = courseTimings

if __name__ == "__main__":

    # ct1 = CourseTimings()
    # ct1.parse_timings("TWF 08:00-09:00, M 07:00-09:00", 'Lec')
    # print(ct1.lectureTimingsList)

    # print("\n\n\nCourse Test")
    course1 = Course("CSE-101", timingsTut="M 15:00-16:15" )
    print(course1.name)
    course1.timings.print_timings()
    print()
    course2 = Course("CSE-102", timingsLab="WTh 12:00-13:15, F 15:30-16:15" )
    print(course2.name)
    course2.timings.print_timings()
    print("------------------------------------")

