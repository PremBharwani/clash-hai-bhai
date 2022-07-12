from flask import Flask, jsonify, request


from flask_utils import serve_courses_json_as_dictionary, serve_non_clashing_courses, get_course_template_json

app = Flask(__name__)

@app.route('/test')
def test():
    return "Hello World!"

@app.route('/get_courses_offered')
def get_courses_offered():
    return serve_courses_json_as_dictionary()


# ? Sample input JSON Format for the /non_clashing_courses endpoint:
# {
#     "currently_selected_courses":[
#         'CE311A','CE331A','CE341A','CE351A','CE361A','CE371A'
#     ],
#     "dept_to_choose_from":"CSE"
# }
@app.route('/non_clashing_courses', methods=['GET'])
def non_clashing_courses():
    
    rjson = request.json # Extracting the request JSON.
    course_codes_list = rjson['currently_selected_courses'] # Extracting the course codes from the request JSON.
    dept_to_choose_from = rjson.get('dept_to_choose_from', None) # Extracting the department from the request JSON.
    
    # TODO Check the sanity of the request JSON.

    print("=========================================================")

    possible_courses_list = serve_non_clashing_courses(course_codes_list, dept_to_choose_from)
    
    return jsonify(possible_courses_list)

@app.route('/get_course_template', methods=['GET'])
def get_course_template():
    
    json_obj = get_course_template_json()
    return jsonify(json_obj)

if __name__=="__main__":
    app.run(debug=True)


