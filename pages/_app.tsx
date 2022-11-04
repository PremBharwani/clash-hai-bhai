import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette:{
        mode: "dark"
    }
});
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
  )
}
