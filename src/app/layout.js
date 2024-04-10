/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
import { Container, CssBaseline, Toolbar } from '@mui/material';
import Header from './components/header/header';
import { Providers } from './providers'
import Head from 'next/head';

export default function Layout({ children, title = "GoVote - E-Voting Website" }) {
  return (
    
    <html lang="en">
    
      <Head>
        <title>{title}</title>
        <meta name="description" content="E-Voting Website for Ireland" />
      </Head>


      <body>
      <Providers>
        <CssBaseline />
        <Header />
        <Toolbar />
        <main>
        <Container maxWidth="md">
          {children}
        </Container>
        </main>
      </Providers>

      </body>
    
    </html>
  )
}
