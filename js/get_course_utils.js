// const api_url = 
//     'https://theslytherin.gitlab.io/assets/updated.json';



// Takes ID -> ESO207
// Returns a json dictionary {M:[Start, Stop], T:[Start, Stop]} et cetera.
function get_course_timings(id){
        for (let i = 0; i < myJSON.length; i++){
            // console.log(courses_Data.courses[i].course_code)
            if (myJSON[i].course_code == id){
                // console.log(myJSON[i])
                return myJSON[i].timings_since_epoch
            }
        }

}

// Returns an array of course codes. Input course name and semester.
// No MTH in the template :(
function get_template(course, semester){
    return templates[course][semester]
}

function get_all_courses_by_department(department){
    eligible_courses = []
    for (let i = 0; i < myJSON.length; i++){
        // console.log(myJSON[i])
        if (myJSON[i].dept == department){
            eligible_courses.push(myJSON[i].course_code)
        }
    }
    return eligible_courses
}
// Returns ALL slots occupied in the semester
function get_dept_time(course, semester){
    var template = get_template(course, semester)
    console.log(template)
    var time_intervals = []
    for (let i = 0; i < template.length; i++){
        console.log(template[i])
        var course_deets = get_course_timings(template[i])
        for (let j = 0; j < course_deets.length; j++){
            time_intervals.push(course_deets[j])
        }
        
    }
    return time_intervals
}


//Returns an array of slots occupied by course_1, course_2
function merge_timings(course_1, course_2){
    var course_one_array = get_course_timings(course_1)
    var course_two_array = get_course_timings(course_2)
    return course_one_array.concat(course_two_array)
}


// Returns all courses a student, given current department and semester
function return_bad_intervals(dept_times, course){
    // var dept_times = get_dept_time(dept, semester)
    var course_times = get_course_timings(course)
    var bad_intervals = []
    for (let i = 0; i < course_times.length; i++){
        for (let j = 0; j < dept_times.length; j++){
            if(course_times[i][0] >= dept_times[j][0]){
                if (course_times[i][0] <= dept_times[j][1]){
                    bad_intervals.push([course_times[i], dept_times[j]])
                    break;
                }
            }
            else if(course_times[i][1] >= dept_times[j][0]){
            if (course_times[i][1] <= dept_times[j][1]){
                bad_intervals.push([course_times[i], dept_times[j]])
                break;
            }
        }
        }
    }
    return bad_intervals
}



//Returns clashes
function check_clashes(dept_times, course){
    var bad_intervals = return_bad_intervals(dept_times, course)
    if (bad_intervals.length == 0){
        return false
    }
    else{
        return true
    }
}

//returns all possible courses from the selected department that do not
//clash
function get_eligible_courses(dept_timings, target_dept){
    target_courses = get_all_courses_by_department(target_dept)
    good_courses = []
    for (let i = 0; i < target_courses.length; i++){
        // var dept_timings = get_dept_time(dept, semester)
        if (!check_clashes(dept_timings, target_courses[i])){
            good_courses.push(target_courses[i])
        }
    }
    return good_courses
}


//declaration
myJSON = course_data.courses
templates = template_data



//TESTING
// var temp = get_dept_time("EE", "3")
// console.log(temp)
// var mth_times = get_course_timings("MTH201A")
// console.log(mth_times)
// var clash = check_clash(temp, mth_times)
// console.log(clash)
console.log(get_all_courses_by_department("CSE"))
console.log(get_eligible_courses(get_dept_time("EE", "3"), "MTH"))
// console.log(check_clashes("EE", "3", "MTH201A"))
//testing
// console.log(get_course_timings("ESO207A"))
// // console.log(get_template("BSBE", "2"))
// console.log(get_dept_time("BSBE", "5"))
// console.log(merge_timings("ESO207A", "MTH302A"))


// getapi(api_url)
