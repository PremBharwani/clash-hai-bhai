import Head from 'next/head'
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import { Button,Card, CssBaseline, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography,Paper} from '@mui/material';
import { useState,useMemo } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { course_data } from "../public/course_data.js"
import { template_data } from '../public/template.js'
import { get_eligible_courses } from "../js/get_course_utils.js"

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
interface course {
  course: string;
}

interface availableCourses {
  credits: string;
  instructor: string;
  instuctor_email: string;  
  lec: string;
  tut: string;
  lab: string;
  course_code: string;
}

const semesters = ["2","4","6","8"];

export default function Home(){

  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const allBranches: string[] = Object.keys(allTemplates);
  const [allSemTemplates,setAllSemTemplates] = useState<semTemplate>({} as semTemplate);
  const [branch, setBranch] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [deptToChooseCourseFrom,setDeptToChooseCourseFrom] = useState<string>("");
  const [template,setTemplate] = useState<string[]>([]);
  const [templateRows,setTemplateRows] = useState<course[]>([])
  const [allAvailableCourses,setAllAvailableCourses] = useState<availableCourses[]>([]);

  const handleChangeBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
    for (const key in allTemplates){
      if(key === event.target.value){
        setAllSemTemplates(allTemplates[key as keyof typeof allTemplates]);
      }
    }
  };

  const handleChangeSem = (event: SelectChangeEvent) => {
    setSem(event.target.value as string);
    for (const key in allSemTemplates){
      if(key === event.target.value){
        setTemplate(allSemTemplates[key as keyof typeof allSemTemplates]);
        const tempObject = allSemTemplates[key as keyof typeof allSemTemplates].map((value) => ({course: value} as course));
        setTemplateRows(tempObject);
      }
    }
    if(deptToChooseCourseFrom!==""){
      const elegible_courses = get_eligible_courses(template,deptToChooseCourseFrom);
      setAllAvailableCourses(elegible_courses);
    }
  };

  const handleChangeDept = (event: SelectChangeEvent) => {
    setDeptToChooseCourseFrom(event.target.value as string);
    const elegible_courses = get_eligible_courses(template,event.target.value);
    setAllAvailableCourses(elegible_courses);
  }

  const handleCourseDrop = (dropCourse: string) => {
    setAllAvailableCourses([]);
    const template_filtered = template.filter((value) => (value !== dropCourse));
    setTemplate(template_filtered);
    setTemplateRows(template_filtered.map((value) => ({course: value} as course)));
    const elegible_courses = get_eligible_courses(template,deptToChooseCourseFrom);
    setAllAvailableCourses(elegible_courses);
  }

  const handleCourseAdd = (addCourse: string) => {
    const newTemplate: string[] = template.concat([addCourse]);
    const newTemplateObject = newTemplate.map((value) => ({course: value} as course))
    setTemplate(newTemplate);
    setTemplateRows(newTemplateObject);
    const elegible_courses = get_eligible_courses(newTemplate,deptToChooseCourseFrom);
    setAllAvailableCourses(elegible_courses);
  }

  const template_cols: GridColDef[] = [
    {
      field: 'course',
      headerName: 'Course'
    },
    {
      field: "options",
      headerName: "",
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          color="error" 
          onClick={() => {
              handleCourseDrop(params.row.course)
            }}>
          Drop
        </Button>
      )
    }
  ]

  const courses_cols: GridColDef[] = [
    {
      field: 'course_code',
      headerName: 'Course Code'
    },
    {
      field: 'lec',
      headerName: 'Lecture Timings'
    },
    {
      field: 'tut',
      headerName: 'Tutorial Timings'
    },
    {
      field: 'lab',
      headerName: 'Lab Timings'
    }, 
    {
      field: 'instructor',
      headerName: 'Instructor'
    },
    {
      field: 'instructor_email',
      headerName: 'Instructor E-mail',
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
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>
        <Head>
          <title>Clash Hai Bhai!</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Paper sx={{height: "1000h"}}>
        <Stack spacing={4} alignItems="center">
          <Stack 
            direction="row" 
            justifyContent="flex-end" 
            spacing={1} 
            padding={1} 
            sx={{width: "100%"}}
          >
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
          <Typography variant="h3" align="center" gutterBottom>
            Clash Hai Bhai!
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent = "center"
            >
            <Stack>
              <InputLabel id="branch-select">Select Branch</InputLabel>
              <Select
                labelId = "branch-select"
                id="branch-select"
                value={branch}
                label="Select Branch"
                onChange={handleChangeBranch}
              >
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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography>Your Template</Typography>
                  <DataGrid getRowId = {(row) => row.course} columns={template_cols} rows={templateRows} autoHeight/>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography>Available courses</Typography>
                  <DataGrid columns={courses_cols} rows={allAvailableCourses} getRowId = {(row) => row.course_code} autoHeight/>
                </Stack>
              </Grid>
            </Grid>
            <Stack sx={{width: "10%"}}>
              <InputLabel id="dept-select ">Select Branch</InputLabel>
              <Select
                labelId = "dept-select"
                id="dept-select"
                value={deptToChooseCourseFrom}
                label="Select Branch"
                onChange={handleChangeDept}
              >
                {
                  (allDepts.map((dept,index) => {
                    return (<MenuItem key={index} value={dept}>{dept}</MenuItem>)
                  }))
                }
              </Select>
            </Stack>
          </Card>
        </Stack>
      </Paper>
    </div>
    </ThemeProvider>
  );
}
