import Head from 'next/head'
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import { Button,Card, CssBaseline, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography,Paper} from '@mui/material';
import allTemplates from '../public/template.json'
import { useState,createContext,useContext,useMemo } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Link from 'next/link'
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

const dummyAvailableCourses: availableCourses[] = [
  {
    credits: "3-1-0-0(11)",
    instructor: "Navrose (I)",
    instuctor_email: "navrose@iitk.ac.in (I)",
    lec: "MWF 09:00-10:00",
    tut: "Th 09:00-10:00",
    lab: "",
    course_code: "AE211A",
  }
];

const semesters = ["1","2","3","4","5","6","7","8"];

export default function Home(){

  const [mode, setMode] = useState<'light' | 'dark'>('light');
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
  const [template,setTemplate] = useState<string[]>([]);
  const [allAvailableCourses,setAllAvailableCourses] = useState<availableCourses[]>([]);

  const getAllAvailableCourses = async (branch: string,currTemplate: string[]) => {
    const requestParams: {branch: string; currTemplate: string[];} = { //change according to backend functions
      branch: branch,
      currTemplate: currTemplate,
    };
    const response = await fetch("/",{ // request URL to be determined by backend 
      method:"POST",
      body: JSON.stringify(requestParams)
    }).then((res)=>{
      return res.json();
    }).then((res) =>{
      setAllAvailableCourses(res.body)
    }).catch((err) => {
      console.log(err)
      setAllAvailableCourses([])
    }); //better error handling
  }

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
        getAllAvailableCourses(branch,template);
      }
    }
  };

  const handleCourseDrop = (dropCourse: string) => {
    setTemplate(template.filter((value) => (value !== dropCourse)));
    setAllAvailableCourses([]);
    getAllAvailableCourses(branch,template);
  }

  const handleCourseAdd = (addCourse: string) => {
    setAllAvailableCourses([]);
    const newTemplate: string[] = template.concat([addCourse]);
    setTemplate(newTemplate);
    const courses: any = getAllAvailableCourses(branch,template);
    setAllAvailableCourses(courses);
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
              handleCourseAdd(params.row.course)
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
      <Paper sx={{height: "150vh"}}>
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
                  <DataGrid columns={template_cols} rows={template.map((value) => ({course: value} as course))} getRowId = {(row) => row.course} autoHeight sx={{maxHeight: 500}}/>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Typography>Available courses</Typography>
                  <DataGrid columns={courses_cols} rows={allAvailableCourses} getRowId = {(row) => row.course_code} autoHeight sx={{maxHeight: 500}}/>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Paper>
    </div>
    </ThemeProvider>
  );
}