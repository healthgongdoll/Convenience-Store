import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#253237',
    },
    secondary: {
      main: '#E0FBFC',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
