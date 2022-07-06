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