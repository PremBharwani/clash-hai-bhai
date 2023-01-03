import os
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
import ast
import json

SERVICE_ACCOUNT_FILE = './clash-hai-bhai-key.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

credentials = None

SAMPLE_SPREADSHEET_ID = '1oNJ076tZOJMoovVciYjR3Jtozn64CsMvPlcE-2m3jPo'
SAMPLE_RANGE_NAME = 'B2:D1000'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

try:
    service = build('sheets', 'v4', credentials=credentials)

    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=SAMPLE_RANGE_NAME).execute()
    values = result.get('values', [])
    template = ""
    with open('./js/template.js',"r") as f:
        data = f.read()
        str = data[data.find('{'):]
        template = ast.literal_eval(str)
    for value in values:
        courses = value[2].split(',')
        for dept in template:
            if dept == value[0]:
                for sem in template[dept]:
                    if sem == value[1]:
                        template[dept][sem] = courses
    with open('./js/template.js',"w+") as f:        
        temp = json.dumps(template)
        f.write("export const template_data = " + temp)
    spreadsheet_data = [
        {
            "deleteDimension": {
                "range": {
                    "sheetId": 82515560,
                    "dimension": "ROWS",
                    "startIndex": 1,
                    "endIndex": 100
                }
            }
        }
    ]

    update_spreadsheet_data = {"requests": spreadsheet_data}
    delete_rows = sheet.batchUpdate(
        spreadsheetId=SAMPLE_SPREADSHEET_ID, 
        body=update_spreadsheet_data).execute()
    os.system('git commit -m "template change" ./js/template.js')
    os.system('git push')
except HttpError as err:
    print(err)