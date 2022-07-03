
from course_utils import get_slots_list_from_timing_string, extract_slotdays_slottimings_from_slot_str

class CourseTimings: # The objects for these would hold Lecture, Tutorial & Lab timings for a particular course
    
    def __init__(self): # Constructor to initialise the object.
        self.lectureTimingsDict = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
        self.tutorialTimingsDict = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
        self.labTimingsDict = {
            'M': [],
            'T': [],
            'W': [],
            'Th': [],
            'F': [],
        }
    


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
                        self.lectureTimingsDict[curr_day].append(timingsTuple)
                    elif slotType == 'Tut':
                        self.tutorialTimingsDict[curr_day].append(timingsTuple)
                    elif slotType == 'Lab':
                        self.labTimingsDict[curr_day].append(timingsTuple)
                    curr_day = ""
                    break
                if (slot_days[i].isupper() and curr_day!="") :
                    # Push the timings to the day.
                    if slotType == 'Lec':
                        self.lectureTimingsDict[curr_day].append(timingsTuple)
                    elif slotType == 'Tut':
                        self.tutorialTimingsDict[curr_day].append(timingsTuple)
                    elif slotType == 'Lab':
                        self.labTimingsDict[curr_day].append(timingsTuple)
                    curr_day = ""
                    i-=1
                else:
                    curr_day+=slot_days[i]
                i+=1


    def print_timings(self):
        buildStr = f"Lec : {str(self.lectureTimingsDict)}\nTut : {str(self.tutorialTimingsDict)}\nLab : {str(self.labTimingsDict)}"
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
    # print(ct1.lectureTimingsDict)

    # print("\n\n\nCourse Test")
    course1 = Course("CSE-101", timingsTut="M 15:00-16:15" , timingsLab="MTWThF 14:00-17:00")
    print(course1.name)
    course1.timings.print_timings()
    print()
    course2 = Course("CSE-102", timingsLec="M 12:00-15:00", timingsLab="MTWThF 14:00-17:00" )
    print(course2.name)
    course2.timings.print_timings()
    print("------------------------------------")

