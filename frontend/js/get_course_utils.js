import { course_data } from "./course_data.js"
import { template_data } from "./template.js"

/*
Utility function. It returns the array of intervals a course occupies in a week.
Usage:
get_course_timings(course_code)
Example:
get_course_timings("ESO207A")
Output: [['3400', '3500'], ['5800', '5900'], ['10600', '10700']]
*/
function get_course_timings(id){
        for (let i = 0; i < depts.length; i++){
            // console.log(depts[i])
            // console.log(myJSON[depts[i]].length)
            for (let j = 0; j < myJSON[depts[i]].length; j++){
                // console.log(myJSON[depts[i]][j].course_code)
                if (myJSON[depts[i]][j].course_code == id){
                    // console.log(myJSON[i])
                    return myJSON[depts[i]][j].timings_since_epoch
                }
            }
        }

}

/*
Utility function. It returns the JSON object corresponding to the course code.
Usage:
get_course_timings(course_code)
Example:
get_course_timings("ESO207A")
Output: course_code: "ESO207A"
​course_name: "DATA STRUCTURE & ALGORITHM(ESO207A)"
​course_type: "CORE 10-1 ESO/SO / REGULAR"
​credits: "3-0-3-0(12)"
​dept: "CSE"
​instructor: "SANJEEV  SAXENA   (I)"
​instuctor_email: "ssax@iitk.ac.in (I)"
​lab: "MW 14:00-15:50"
​lec: "TWF 10:00-11:00"
​n_course: "215"
​pre_requisites: "(ESC101A)"
*/
export function get_course_details(id){
    for (let i = 0; i < depts.length; i++){
        // console.log(depts[i])
        // console.log(myJSON[depts[i]].length)
        for (let j = 0; j < myJSON[depts[i]].length; j++){
            // console.log(myJSON[depts[i]][j].course_code)
            if (myJSON[depts[i]][j].course_code == id){
                // console.log(myJSON[i])
                return myJSON[depts[i]][j]
        }
    }
}
}
/*
Utility function. It returns the template of a department. No MTH :(.
Usage:
get_template(department, semester)
Example:
get_template("EE", "4")
Output: ['EE210A', 'EE250A', 'TA202A']
*/
function get_template(dept, semester){
    return templates[dept][semester]
}

/*
Utility function. It returns a list of JSON objects, The JSON objects corresspond
to all courses offered by a particular department.
Usage:
get_all_courses_by_department(department)
Example:
get_template("EE")
Output: A big-ass list of big ass dictionaries. 
*/
export function get_all_courses_by_department(department){
    return myJSON[department]
}


/*
Utility function. It returns a list of time intervals, basically
the union of time intervals of courses.
Usage:
merge_course_times(courses)
Example:
merge_course_times(['EE210A', 'TA202A'])
Output: [['1000', '1100'], ['5800', '5900'], ['10600', '10700'], ['3400', '3500'], ['3200', '3300']]
*/
function merge_course_times(courses){
    var time_intervals = []
    // console.log(courses)
    for (let i = 0; i < courses.length; i++){
        // console.log(template[i])
        var course_deets = get_course_timings(courses[i])
        for (let j = 0; j < course_deets.length; j++){
            time_intervals.push(course_deets[j])
        }
        
    }
    return time_intervals
}



/*
Utility function. Returns the first clashing interval. I was forced
to break.
Usage:
return_bad_intervals(current_timings, course), where current_timings is an array of 
intervals.
Example:
return_bad_intervals(merge_course_times(['EE210A', 'TA202A']), "ESO207A")
Output: [['1000', '1100']]
*/
function return_bad_intervals(current_timings, course){
    // var current_timings = get_dept_time(dept, semester)
    var course_times = get_course_timings(course)
    var bad_intervals = []
    for (let i = 0; i < course_times.length; i++){
        for (let j = 0; j < current_timings.length; j++){
            var start = parseInt(course_times[i][0])
            var end = parseInt(course_times[i][1])
            var template_start = parseInt(current_timings[j][0])
            var template_end = parseInt(current_timings[j][1])
            if (!((start >= template_end) || (end <= template_start))){
                bad_intervals.push([start, end], [template_start, template_end])
            }
        }
        
    }
    return bad_intervals
}



/*
Utility function. Returns if the given course clashes with the courses one is
taking in the semester.
Usage:
check_clash_between_current_schedule_and_course(current_timings, course), where current_timings is an array of 
intervals.
Example:
check_clash_between_current_schedule_and_course(merge_course_times(['EE210A', 'TA202A']), "ESO207A")
Output: true
*/
function check_clash_between_current_schedule_and_course(current_timings, course){
    var bad_intervals = return_bad_intervals(current_timings, course)
    if (bad_intervals.length == 0){
        return false
    }
    else{
        return true
    }
}

/*
Utility function. Returns all courses from the chosen department
a person can take.
Usage:
get_eligilble_courses(current_timings, target_dept), where current_timings is an array of 
intervals.
Example:
get_eligible_courses(['EE210A', 'TA202A'], "CGS")
Output: 
0: Object { n_course: "110", dept: "CGS", course_name: "APPLIED COGNITIVE SCIENCE(CGS402A)", … }
​1: Object { n_course: "111", dept: "CGS", course_name: "EYE-TRACKING AND VR AS TOOLS IN COGNITIVE SCIENCE(CGS612A)", … }
​2: Object { n_course: "112", dept: "CGS", course_name: "INTRODUCTION TO PSYCHOLINGUISTICS(CGS621A)", … }
​3: Object { n_course: "113", dept: "CGS", course_name: "TOPICS IN TRANSLATIONAL NEUROSCIENCE(CGS641A)", … }
​4: Object { n_course: "115", dept: "CGS", course_name: "NEUROBIOLOGY OF AFFECT & MOTIVATION(CGS698D)", … }
​5: Object { n_course: "116", dept: "CGS", course_name: "TOPICS IN VISUAL PERCEPTION(CGS698E)", … }
6: Object { n_course: "117", dept: "CGS", course_name: "PHD THESIS(CGS799)", … }
7: Object { n_course: "118", dept: "CGS", course_name: "MS - RESEARCH THESIS(CGS899)", … }
*/
export function get_eligible_courses(current_courses, target_dept){
    var current_timings = merge_course_times(current_courses)
    let target_courses = get_all_courses_by_department(target_dept)
    var len = target_courses.length
    // console.log(len)
    var good_courses = []
    for (let i = 0; i < len; i++){
        var course_coode = target_courses[i]["course_code"]
        // console.log(course_coode)
        var z = check_clash_between_current_schedule_and_course(current_timings, course_coode)
        // var bad = return_bad_intervals(current_timings, target_dept[i].course_code)
                // console.log(bad)
        if (z == false){
            good_courses.push(target_courses[i])
        }
    }
    return good_courses
}

function get_all_departments(){
    for (key in myJSON){
        console.log(key)
    }
}

//declaration
const depts = ['AE', 'BSBE', 'CE', 'CGS', 'CHE', 'CHM', 'COM', 'CSE', 'ECO', 'EE', 'ES', 'HSS', 'IME', 'MDES', 'ME', 'MS', 'MSE', 'MTH', 'NET', 'PHY', 'PSE', 'SEE']
let myJSON = course_data
let templates = template_data


