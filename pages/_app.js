import React, {useEffect} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AuthProvider } from '../hooks/auth';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Roboto', sans-serif;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {

  useEffect(()=>{
    window.onunload = function () {
      localStorage.removeItem('@Sistem_mar21:token');
      localStorage.removeItem("@Sistem_mar21:user");
    }
  },[])

  return (
    <>
      <Head>
        <title>Administrex</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
