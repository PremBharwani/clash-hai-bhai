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


// Returns all courses a studeny
function vanilla_compare(dept, semester, course){
    var dept_times = get_dept_time(dept, semester)
    var course_times = get_course_timings(course)
    var bad_intervals = []
    for (let i = 0; i < course_times.length; i++){
        for (let j = 0; j < dept_times.length; j++){
            if (check_intevrals_clash(course_times[i], dept_times[j])){
                bad_intervals.push([course_times[i], dept_times[j]])
            }
        }
    }
}



////LMAOOOOO
function check_clash(template, course) {
    var clash = false;
    template.sort((a, b) => a[0] - b[0]);
    course.sort((a, b) => a[0] - b[0]);
   console.log(course);
   console.log(template)
    
    let l = course.length;
    let i = 0;
    //console.log(template);
    // console.log(time_interval[0]+" ts");
    // console.log(+time_interval[1]+" te");
    for (let time_interval in template) {
      if (i >= l) break;
      else if (template[time_interval][0] >= course[i][1]) {
       // console.log(i + " 1\n");
        i++;
      } else if (template[time_interval][1] >= course[i][0]) {
       // console.log(i + " 2\n");
        clash = true;
        break;
      } else {
        i++;
      }
    }
    return clash;
  }



// check_clash(temp, )
//declaration
myJSON = course_data.courses
templates = template_data


var temp = get_dept_time("EE", "3")
// console.log(temp)
var mth_times = get_course_timings("MTH302A")
// console.log(mth_times)
var clash = check_clash(temp, mth_times)
console.log(clash)

//testing
// console.log(get_course_timings("ESO207A"))
// // console.log(get_template("BSBE", "2"))
// console.log(get_dept_time("BSBE", "5"))
// console.log(merge_timings("ESO207A", "MTH302A"))


// getapi(api_url)
