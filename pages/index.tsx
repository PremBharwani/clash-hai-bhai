import Head from 'next/head'
import { DataGrid,GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Button,Card, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography,Paper,Box, Tooltip} from '@mui/material';
import { useState } from 'react';
import { course_data } from "../js/course_data.js"
import { template_data } from '../js/template.js'
import { get_eligible_courses,get_all_dept_eligible_courses,get_course_details } from "../js/get_course_utils.js"
import CellExpand from '../components/cellExpand';
interface semTemplate {
  "1":string[];
  "2":string[];
  "3":string[];
  "4":string[];
  "5":string[];
  "6":string[];
  "7":string[];
  "8":string[];
}

const allDepts = Object.keys(course_data);
const allTemplates = template_data;

interface courses {
  course_code: string;
  course_name: string;
  credits: string;
  instructor: string;
  instuctor_email: string;  
  lec: string;
  tut: string;
  lab: string;
}

const semesters = ["4","6","8"];

const getTemplateRows = (template: string[]):courses[] => {
    return template.map((course) => {
      const course_details = get_course_details(course);
      if(course_details === undefined){
        return ({
          credits: "",
          instructor: "",
          instuctor_email: "",
          lec: "",
          tut: "",
          lab: "",
          course_code: course,
          course_name: "",
        })
      }
      return (course_details as courses);
      }) as courses[];
}
 
const getCredits = (credits: string): number => {
  let c = 0;
  let d = 1;
  for(let i=credits.length-2;i>=0 && credits[i]!='(';i-=1){
    c = c+Number(credits[i])*d;
    d = d*10;
  }
  return c;
}

export default function Home(){
  const allBranches: string[] = Object.keys(allTemplates);
  const [allSemTemplates,setAllSemTemplates] = useState<semTemplate>({} as semTemplate);
  const [branch, setBranch] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [deptToChooseCourseFrom,setDeptToChooseCourseFrom] = useState<string>("");
  const [template,setTemplate] = useState<string[]>([]);
  const [templateRows,setTemplateRows] = useState<courses[]>([])
  const [allAvailableCourses,setAllAvailableCourses] = useState<courses[]>([]);
  const [totalCredits,setTotalCredits] = useState<number>(0);

  const handleChangeBranch = (event: SelectChangeEvent) => {
    let allSemTemplatesCopy: semTemplate = allSemTemplates; 
    setBranch(event.target.value as string);
    for (const key in allTemplates){
      if(key === event.target.value){
        setAllSemTemplates(allTemplates[key as keyof typeof allTemplates]);
        allSemTemplatesCopy = allTemplates[key as keyof typeof allTemplates];
      }
    }
    if(sem!==""){
      for (const key in allSemTemplatesCopy){
        if(key === sem){
          setTemplate(allSemTemplatesCopy[key as keyof typeof allSemTemplatesCopy]);
          const tempObject:courses[] = getTemplateRows(allSemTemplatesCopy[key as keyof typeof allSemTemplatesCopy]);
          setTemplateRows(tempObject);
          let credits = 0;
          tempObject.forEach((course) => {
            credits+=getCredits(course.credits);
          })
          setTotalCredits(credits);
        }
      }
      if(deptToChooseCourseFrom === ""){
        const elegible_courses = get_all_dept_eligible_courses(template);
        setAllAvailableCourses(elegible_courses);
      }
      if(deptToChooseCourseFrom!==""){
        const elegible_courses = get_eligible_courses(template,deptToChooseCourseFrom);
        setAllAvailableCourses(elegible_courses);
      }
    }
  };

  const handleChangeSem = (event: SelectChangeEvent) => {
    setSem(event.target.value as string);
    for (const key in allSemTemplates){
      if(key === event.target.value){
        setTemplate(allSemTemplates[key as keyof typeof allSemTemplates]);
        const tempObject:courses[] = getTemplateRows(allSemTemplates[key as keyof typeof allSemTemplates]);
        setTemplateRows(tempObject);
        let credits = 0;
        tempObject.forEach((course) => {
          credits+=getCredits(course.credits);
        })
        setTotalCredits(credits);
      }
    }
    if(deptToChooseCourseFrom === ""){
      const elegible_courses = get_all_dept_eligible_courses(template);
      setAllAvailableCourses(elegible_courses);
    }
    if(deptToChooseCourseFrom!==""){
      const elegible_courses = get_eligible_courses(template,deptToChooseCourseFrom);
      setAllAvailableCourses(elegible_courses);
    }
  };

  const handleChangeDepttoChooseFrom = (event: SelectChangeEvent) => {
    setDeptToChooseCourseFrom(event.target.value as string);
    if(event.target.value === ""){
      const elegible_courses = get_all_dept_eligible_courses(template);
      setAllAvailableCourses(elegible_courses);
    }
    else{
      const elegible_courses = get_eligible_courses(template,event.target.value);
      setAllAvailableCourses(elegible_courses);
    }
  }

  const handleCourseDrop = (dropCourse: string) => {
    setAllAvailableCourses([]);
    const templateFiltered = template.filter((value) => (value !== dropCourse));
    setTemplate(templateFiltered);
    const tempObject:courses[] = getTemplateRows(templateFiltered);
    setTemplateRows(tempObject);
    let credits = 0;
    tempObject.forEach((course) => {
      credits+=getCredits(course.credits);
    })
    setTotalCredits(credits);
    if(deptToChooseCourseFrom === ""){
      const elegible_courses = get_all_dept_eligible_courses(template);
      setAllAvailableCourses(elegible_courses);
    }
    else{
      const elegible_courses = get_eligible_courses(template,deptToChooseCourseFrom);
      setAllAvailableCourses(elegible_courses);
    }
  }

  const handleCourseAdd = (addCourse: string) => {
    const newTemplate: string[] = template.concat([addCourse]);
    const tempObject:courses[] = getTemplateRows(newTemplate);
    setTemplate(newTemplate);
    setTemplateRows(tempObject);
    let credits = 0;
    tempObject.forEach((course) => {
      credits+=getCredits(course.credits);
    })
    setTotalCredits(credits);
    if(deptToChooseCourseFrom === ""){
      const elegible_courses = get_all_dept_eligible_courses(template);
      setAllAvailableCourses(elegible_courses);
    }
    else{
      const elegible_courses = get_eligible_courses(newTemplate,deptToChooseCourseFrom);
      setAllAvailableCourses(elegible_courses);
    }
  }

  const handleCustomTemplate = () => {
    setTemplate([]);
    setTemplateRows([] as courses[]);
    setTotalCredits(0);
    const elegible_courses = get_all_dept_eligible_courses(template);
    setAllAvailableCourses(elegible_courses);
  }

  const template_cols: GridColDef[] = [
    {
      field: 'course_code',
      headerName: 'Course code',
      renderCell: CellExpand
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      renderCell: CellExpand
    },
    {
      field: 'credits',
      headerName: 'Credits'
    },
    {
      field: 'lec',
      headerName: 'Lecture Timings',
      renderCell: CellExpand
    },
    {
      field: 'tut',
      headerName: 'Tutorial Timings',
      renderCell: CellExpand
    },
    {
      field: 'lab',
      headerName: 'Lab Timings',
      renderCell: CellExpand
    }, 
    {
      field: 'instructor',
      headerName: 'Instructor',
      renderCell: CellExpand
    },
    {
      field: 'instructor_email',
      headerName: 'Instructor E-mail',
      renderCell: CellExpand,
      hide: true
    },
    {
      field: "options",
      headerName: "",
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color="error" 
          onClick={() => {
              handleCourseDrop(params.row.course_code)
            }}>
          Drop
        </Button>
      )
    }
  ]

  const courses_cols: GridColDef[] = [
    {
      field: 'course_code',
      headerName: 'Course Code',
      renderCell: CellExpand
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      renderCell: CellExpand
    },
    {
      field: 'credits',
      headerName: 'Credits',
      renderCell: CellExpand
    },
    {
      field: 'lec',
      headerName: 'Lecture Timings',
      renderCell: CellExpand
    },
    {
      field: 'tut',
      headerName: 'Tutorial Timings',
      renderCell: CellExpand
    },
    {
      field: 'lab',
      headerName: 'Lab Timings',
      renderCell: CellExpand
    }, 
    {
      field: 'instructor',
      headerName: 'Instructor',
      renderCell: CellExpand,
    },
    {
      field: 'instructor_email',
      headerName: 'Instructor E-mail',
      renderCell: CellExpand,
      hide: true
    },
    {
      field: "options",
      headerName: "",
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color="success" 
          onClick={() => {
              handleCourseAdd(params.row.course_code)
            }}>
          Add
        </Button>
      )
    }
  ]

  return (
    <div>
        <Head>
          <title>Clash Hai Bhai!</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Paper sx={{minHeight: "100vh", height:"fit-content"}}>
        <Stack spacing={4} alignItems="center">
          <Stack 
            direction="row" 
            justifyContent="flex-end" 
            spacing={1} 
            padding={1} 
            sx={{width: "100%"}}
          >
          </Stack>
          <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
          >
            CLASH HAI BHAI!
          </Typography>
          <Card
            elevation={5}
            sx={{
              padding: 5,
              width: {
                md: "90%",
                xs: "100%",
              },
            }}
          >
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
                      onChange={handleChangeBranch}
                    >
                      <MenuItem value=""></MenuItem>
                      {
                        (allBranches.map((branch,index) => {
                          return (<MenuItem key={index} value={branch}>{branch}</MenuItem>)
                        }))
                      }
                    </Select>
                  </Stack>
                  <Stack>
                    <InputLabel id="sem-select">Select Semester</InputLabel>
                    <Select
                      labelId = "sem-select"
                      id="sem-select"
                      value={sem}
                      label="Select Semester"
                      onChange={handleChangeSem}
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
                    onChange={handleChangeDepttoChooseFrom}
                  >
                    <MenuItem key={0} value="">All Departments</MenuItem>
                    {
                      (allDepts.map((dept,index) => {
                        return (<MenuItem key={index} value={dept}>{dept}</MenuItem>)
                      }))
                    }
                  </Select>
                </Stack>
                <Button 
                  variant="contained"
                  size="small"
                  onClick={handleCustomTemplate}
                  sx={{height:50}}
                >
                    Build Custom Template
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography variant="h5" gutterBottom>Your Template</Typography>
                  <Box sx={{ height: 500, width: 1 }}>
                    <DataGrid 
                      getRowId = {(row) => row.course_code} 
                      columns={template_cols} 
                      rows={templateRows} 
                      components={{ Toolbar: GridToolbar }}
                      componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography variant="h5" gutterBottom>Available courses</Typography>
                  <Box sx={{ height: 500, width: 1 }}>
                    <DataGrid 
                      columns={courses_cols} 
                      rows={allAvailableCourses} 
                      getRowId = {(row) => row.course_code} 
                      components={{ Toolbar: GridToolbar }}
                      componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Paper>
    </div>
  );
}