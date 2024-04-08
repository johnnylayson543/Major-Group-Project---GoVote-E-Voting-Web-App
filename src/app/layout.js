/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
'use client'
import { Container, CssBaseline, Toolbar } from '@mui/material';
import Header from './components/header/header';
import { Providers } from './providers'
import Head from 'next/head';

export default function Layout({ children, title = "GoVote - E-Voting Website" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="E-Voting Website for Ireland" />
      </Head>


      <Providers>
        <CssBaseline />
        <Header />
        <Toolbar />
        <Container component="main" maxWidth="md">
          {children}
        </Container>
      </Providers>

    </>
  )
}
