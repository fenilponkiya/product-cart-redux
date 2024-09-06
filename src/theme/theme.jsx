// import { createTheme, responsiveFontSizes } from '@mui/material';
// import palette from './palette';

import { createTheme } from "@mui/material/styles";

// const getTheme = (mode) =>
//   responsiveFontSizes(
//     createTheme({
//       palette: palette(mode),
//       layout: {
//         contentWidth: 1236,
//       },

//       // Custom Styles For Mui Components

//       components: {
//         MuiButton: {
//           styleOverrides: {
//             root: {
//               textTransform: 'none',
//               borderRadius: '20px',
//             },
//           },
//         },
//       },
//     })
//   );

// export default getTheme;
export const getTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});
