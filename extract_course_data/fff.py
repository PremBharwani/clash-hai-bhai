import json

new_json = []
with open('./updated_courses.json') as f:
    for k, v in json.load(f).items():
        new_json += v

with open('./updated_courses_1.json', 'w') as f:
    json.dump(new_json, f)


