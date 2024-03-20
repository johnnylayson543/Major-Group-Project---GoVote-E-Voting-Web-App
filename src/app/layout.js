/*
  This is the root layout of the page. Any universal themes changed on the './components/theme' will be applied here
*/
'use client'
import Header from './components/header/header';
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GoVote - E-Voting Website</title>
        <meta name="description" content="E-Voting Website for Ireland" />
      </head>

      <body>

        <Providers>
          <Header></Header>
          {children}


        </Providers>

      </body>
    </html>
  )
}
