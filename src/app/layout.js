/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
'use client'
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/header/header';
import theme from './components/theme';

export default function RootLayout({ children }) {
 return (
  <ThemeProvider theme={theme}>
    <title>GoVote - E-Voting Website</title>
    <meta name="description" content="E-Voting Website for Ireland"/>
    <html lang="en">
      
      <body>
        <header><Header></Header></header>
        {children}</body>
    </html>
    </ThemeProvider>
  )
}
