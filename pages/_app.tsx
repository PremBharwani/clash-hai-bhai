import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import TopNavBar from '../components/TopNavBar';
import { useState, useMemo } from 'react';
import { courses, semTemplate } from '@components/types';
import { GlobalContext } from '@components/globalContext';

export default function App({ Component, pageProps }: AppProps) {

  const [allSemTemplates,setAllSemTemplates] = useState<semTemplate>({} as semTemplate); //all sem templates for a branch
  const [branch, setBranch] = useState<string>("");
  const [sem, setSem] = useState<string>("");
  const [deptToChooseCourseFrom,setDeptToChooseCourseFrom] = useState<string>("");
  const [template,setTemplate] = useState<string[]>([]); // this is the variable with all course codes of the template
  const [templateRows,setTemplateRows] = useState<courses[]>([]) //this is the variable with all course details of the template
  const [allAvailableCourses,setAllAvailableCourses] = useState<courses[]>([]);
  const [totalCredits,setTotalCredits] = useState<number>(0);

  const globalVariables = {
    branch: branch,
    sem: sem,
    deptToChooseCourseFrom: deptToChooseCourseFrom,
    template: template,
    templateRows: templateRows,
    allAvailableCourses: allAvailableCourses,
    totalCredits: totalCredits,
    allSemTemplates: allSemTemplates,
    setBranch,
    setSem,
    setDeptToChooseCourseFrom,
    setTemplate,
    setTemplateRows,
    setAllAvailableCourses,
    setTotalCredits,
    setAllSemTemplates
  }

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
    
  return(
    <GlobalContext.Provider value={globalVariables}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <TopNavBar theme={theme} colorMode={colorMode}/>
            <Component {...pageProps} />
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}
