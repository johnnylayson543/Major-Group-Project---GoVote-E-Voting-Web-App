import React from 'react';
import NavBar from './/header/navBar'; // Adjust the path based on your project structure
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Item = ({ children }) => (
    <Box sx={{ border: '4px solid #ddd', padding: 4 }}>
      {children}
    </Box>
  );


export default function page() {
    return (

        <Box component="main" sx={{ p: 3 }}>
            <NavBar/>
            <Toolbar/>
            <Grid container spacing={6}>
                <Grid item xs={8}>
                <Item>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                cum quibusdam.
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris et nulla ac eros aliquet suscipit ut quis libero. 
                Sed quam erat, dictum in consequat id, dapibus eu libero.
                </Item>
                </Grid>
                 <Grid item xs={4}>
                 <Item>Another Login Page Could Go Here!</Item>
                 </Grid>
                 <Grid item xs={8}>
                 <Item>Some Photos go here</Item>
                 </Grid>
            </Grid>
        </Box>
    );

}


