/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
import { Container, Grid, Typography } from '@mui/material';
import { CssBaseline, Toolbar } from '@mui/material';
import Header from './components/header/header';
import { Providers } from './providers'
import Head from 'next/head';

export default function Layout({ children, title = "GoVote - E-Voting Website" }) {
  return (
    
    <html lang="en">
    
      <head>
        <title>{title}</title>
        <meta name="description" content="E-Voting Website for Ireland" />
      </head>


      <body>
      <Providers>
        <CssBaseline />
        <Header />
        <Toolbar />
        <main>
        <Container maxWidth="lg">
        <Grid container spacing={2}>
          {children}
          </Grid>
        </Container>
        </main>
      </Providers>

      </body>
    
    </html>
  )
}
