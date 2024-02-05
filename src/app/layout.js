export const metadata = {
  title: 'GoVote - E-Voting Wesbite',
  description: 'E-Voting Website for Ireland',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
