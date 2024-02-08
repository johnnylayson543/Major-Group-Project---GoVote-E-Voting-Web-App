/*
 The theme.js allows color and text styling of the website without the need of applying them individually on each
 .js page. Just customize the styles here and it will be universally applied to each page.
 Any changes made here is reflected and applied to the universal root layout in layout.js
*/

import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    background: {
        default: "#18749b", // Set the Background Color
    },
    primary: {
      main: '#00008B', // Set the primary color (e.g. Buttons)
    },
    secondary: {
      main: green[500], // Set the secondary color
    },
  },
  typography: {
    // You can customize typography styles here
  },
  // Other theme customization options
});

export default theme;