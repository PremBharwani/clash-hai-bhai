import Head from 'next/head'
import { DataGrid,GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Button,Card, Grid, Stack, Typography,Paper,Box } from '@mui/material';
import CellExpand from '@components/cellExpand';
import { globalContextType } from '@components/types';
import Options from '@components/options';
import { handleCourseAdd, handleCourseDrop } from '@components/handlers';
import React from 'react';
import GlobalContext from '@components/globalContext';

export default function Home(){
  
  const { deptToChooseCourseFrom,template,templateRows,allAvailableCourses,setTemplate,setTemplateRows,setAllAvailableCourses,setTotalCredits } = React.useContext(GlobalContext) as globalContextType;

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
              const dropCourse = params.row.course_code;
              handleCourseDrop({dropCourse,template,deptToChooseCourseFrom,setAllAvailableCourses,setTemplate,setTemplateRows,setTotalCredits})
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
              const addCourse = params.row.course_code;
              handleCourseAdd({addCourse,template,deptToChooseCourseFrom,setAllAvailableCourses,setTemplate,setTemplateRows,setTotalCredits})
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
        <meta name="description" content="clash hai bhai is a tool enabling students from IIT Kanpur to design their academic template efficiently" />
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
            CLASH है BHAI!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{color:"red", fontStyle:"italic"}}><u>Clashes due to labs are not considered</u></Typography>
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
            <Options/>
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