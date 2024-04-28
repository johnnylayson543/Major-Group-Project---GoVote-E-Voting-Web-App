/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
// Next.js Head component
import Head from 'next/head';

// Material UI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Local components
import Header from './components/header/header';

// Providers
import { Providers } from './providers';

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
          
              <Toolbar>
              <Header />
              </Toolbar>
          <main>
            <Container maxWidth="lg">
                  {children}
            </Container>
          </main>
        </Providers>

      </body>

    </html>
  )
}
