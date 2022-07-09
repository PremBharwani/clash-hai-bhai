## Usage

Make sure you are in the `/backend` directory & run the flask server using the command:
```
$ flask run
```

## API Description:

**!!! NOTE : Currently I am not considering the clashes between the Lab Timings. So make sure to ensure that the Lab Component of the course you are adding to your template has no clashes with the current template !!!**

- `/get_courses_offered`  :
    > Method : GET | Request JSON Input Required during request? : NO

    Returns all the courses that are being offered in the next semester in JSON format.

- `/non_clashing_courses` :
    > Method : GET | Request JSON Input Required during request? : YES
    >
    > Request JSON Input format (`dept_to_choose_from` is an optional key-value pair): 
    >```
    >{
    >    "currently_selected_courses":[
    >        "CE311A","CE331A","CE341A","CE351A","CE361A","CE371A"
    >    ],
    >        "dept_to_choose_from":"CSE"
    >}
    >```

    Returns all the course(s) according to the chosen department filter that DO NOT clash with the given Current Template. 