import { Button, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material"
import { semesters, allDepts, allBranches } from "@components/constants"
import { handleChangeBranch, handleChangeSem, handleChangeDepttoChooseFrom, handleCustomTemplate } from "./handlers"
import React from "react";
import GlobalContext from "./globalContext";
import { courses, globalContextType } from "./types";

export default function Options() {
    const { branch,sem,deptToChooseCourseFrom,template,templateRows,allAvailableCourses,totalCredits,allSemTemplates,setBranch,setSem,setDeptToChooseCourseFrom,setTemplate,setTemplateRows,setAllAvailableCourses,setTotalCredits,setAllSemTemplates } = React.useContext(GlobalContext) as globalContextType;
    return (
        <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent = "space-between"
              padding={4}
              >
              <Stack spacing={1}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                  <Stack>
                    <InputLabel id="branch-select">Select Branch</InputLabel>
                    <Select
                      labelId = "branch-select"
                      id="branch-select"
                      value={branch}
                      label="Select Branch"
                      onChange={(event) => {
                          if(event.target.value.length==0)return
                          return handleChangeBranch({ event, allSemTemplates, sem, deptToChooseCourseFrom, setAllSemTemplates, setTemplate, setTemplateRows, setBranch, setTotalCredits, setAllAvailableCourses });
                      }}
                    >
                      {
                        (allBranches.map((branch,index) => {
                          return (<MenuItem key={index} value={branch}>{branch}</MenuItem>)
                        }))
                      }
                      <MenuItem value="" onClick={() => {handleCustomTemplate({setBranch,setSem,setTemplate,setTemplateRows,setTotalCredits,setAllAvailableCourses});}}>others</MenuItem>
                    </Select>
                  </Stack>
                  <Stack>
                    <InputLabel id="sem-select">Select Semester</InputLabel>
                    <Select
                      labelId = "sem-select"
                      id="sem-select"
                      value={sem}
                      label="Select Semester"
                      onChange={(event) => handleChangeSem({event, allSemTemplates, deptToChooseCourseFrom, setTemplate, setTemplateRows, setSem, setTotalCredits, setAllAvailableCourses})}
                    >
                      {
                        (branch!=="" && (semesters.map((sem,index) => {
                          return (<MenuItem key={index} value={sem}>{sem}</MenuItem>)
                        })))
                      }
                    </Select>
                  </Stack>
                </Stack>
                <Typography><b>Total Credits = {totalCredits}</b></Typography>
              </Stack>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} alignItems="center">
                <Stack>
                  <InputLabel id="dept-select ">Dept to choose courses from</InputLabel>
                  <Select
                    labelId = "dept-select"
                    id="dept-select"
                    value={deptToChooseCourseFrom}
                    label="Select Branch"
                    onChange={(event) => handleChangeDepttoChooseFrom({event, template, setDeptToChooseCourseFrom, setAllAvailableCourses})}
                  >
                    <MenuItem key={0} value="">All Departments</MenuItem>
                    {
                      (allDepts.map((dept,index) => {
                        return (<MenuItem key={index} value={dept}>{dept}</MenuItem>)
                      }))
                    }
                  </Select>
                </Stack>
              </Stack>
            </Stack>
    )
}