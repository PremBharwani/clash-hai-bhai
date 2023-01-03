import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import TopNavBar from '../components/TopNavBar';
import { useState, useMemo } from 'react';

export default function App({ Component, pageProps }: AppProps) {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <TopNavBar theme={theme} colorMode={colorMode}/>
          <Component {...pageProps} />
    </ThemeProvider>
  )
}
