import { createTheme } from '@mui/material/styles';
import { blue, green, purple } from '@mui/material/colors';
import { getContrastingOklchColor } from './helpers';
import { InvertColors } from '@mui/icons-material';

const backgroundColor = 'oklch(55.75% 0.016 232.53)';
const typographyColor = getContrastingOklchColor(backgroundColor);
const primaryColor = '#00008B';
const secondaryColor = green[500];
const buttonBackgroundColor = 'oklch(28.78% 0.19944239451295373 264.052020638055)';
const buttonHoverBackgroundColor = 'oklch(5.78% 0.19944239451295373 264.052020638055)';
const textFieldBackgroundColor = 'white';

const theme = createTheme({
  palette: {
    background: {
      default: backgroundColor,
    },
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: textFieldBackgroundColor,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '0.8rem 1.6rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          mixBlendMode: 'divide',
          filter: 'invert(1)'
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
          borderRadius: '1em',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '0.8rem 1.6rem',
        },
        contained: {
          backgroundColor: buttonBackgroundColor,
          color: '#fff',
          '&:hover': {
            backgroundColor: buttonHoverBackgroundColor,
          },
        },
        textPrimary: {
          mixBlendMode: 'subtract',
        },
        '#myCustomButton': {
          fontWeight: 'bold',
          color: '#f00',
        },
        '.my-custom-class': {
          textTransform: 'uppercase',
        },
      },
    },
  },
  // Other theme customization options
});


export default theme;