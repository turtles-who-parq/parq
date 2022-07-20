import { createTheme } from '@mui/material/styles';
// import '@fontsource/open-sans/300.css';
// import '@fontsource/open-sans/400.css';
// import '@fontsource/open-sans/500.css';
// import '@fontsource/open-sans/700.css';


const lightOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#57cdea',
    },
    secondary: {
      main: '#35bd86',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};

const darkOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#57cdea',
    },
    secondary: {
      main: '#35bd86',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};

const themeParq = (mode) => {
  return mode === 'light' ? createTheme(lightOptions) : createTheme(darkOptions);
};

export default themeParq;
