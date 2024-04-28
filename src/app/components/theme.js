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
        default: 'oklch(55.75% 0.016 232.53)'   // Set the Background Color  { initial  'oklch(52.68% 0.101 232.53)' lch(45.24% 32.9 241.68) "#18749b",  modified 'oklch(55.75% 0.016 244.89)' lch(48.68% 6.04 248.87) "#6c757d" } lch more precise.
    },
    primary: {
      main: '#00008B', // Set the primary color (e.g. Buttons)
    },
    secondary: {
      main: green[500], // Set the secondary color
    },
  },
  typography: {
    all: {
      mixBlendMode: 'color-burn'
    }
    // You can customize typography styles here
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white'
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // Apply styles to all buttons
          fontSize: '1rem',
          padding: '0.8rem 1.6rem',
        },
      },

    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          mixBlendMode: 'color-burn'
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
          boxShadow: '1em',
          padding: '1em',
          maxWidth: '45em',
          margin: 'auto',
          borderRadius: '1em'
          
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Apply styles to all buttons
          fontSize: '1rem',
          padding: '0.8rem 1.6rem',
        },
        contained: {
          // Apply styles to contained buttons
          backgroundColor: 'oklch(28.78% 0.19944239451295373 264.052020638055)', // orginal blue 'oklch(28.78% 0.19944239451295373 264.052020638055)', modified  'oklch(48.68% 60.04% 241.68)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'oklch(5.78% 0.19944239451295373 264.052020638055)',
          },
        },
        textPrimary: {
          mixBlendMode: 'subtract'
        },
        
        '#myCustomButton': {
          // Apply styles to a button with the ID "myCustomButton"
          fontWeight: 'bold',
          color: '#f00',
        },
        '.my-custom-class': {
          // Apply styles to elements with the class "my-custom-class"
          textTransform: 'uppercase',
        },
      },
    },
  },
  // Other theme customization options
});


export default theme;