function merge(course1, course2) {
  //   for (let time_interval in course2) {
  //     course1.push(time_interval);
  //   }
  //   course1.sort();
  let course_p = course1.concat(course2);
 // course_p.sort((a, b) => a[0] - b[0]);
  return course_p;
}

function check_clash(template, course) {
  var clash = false;
  template.sort((a, b) => a[0] - b[0]);
  course.sort((a, b) => a[0] - b[0]);
//  console.log(course);
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
    } else if (template[time_interval][1] > course[i][0]) {
     // console.log(i + " 2\n");
      clash = true;
      break;
    } else {
      i++;
    }
  }
  return clash;
}
// to check functioning of cleck_clash
console.log(
  check_clash(
    [
      [1, 2],
      [11, 12],
      [21,22]
    ],
    [ [13, 14],
      [3, 4],
      [21,22]
     
    ]
  )
);
