import { React,} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';

function App() {
  
  let mode = useSelector((state) => state.mode.value)

  const colorMode = (sessionStorage.getItem('theme'))
  if (colorMode) {
    mode = colorMode;
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Pattaya,sans-serif,Montserrat,Poppins"
    },

    palette: {

      mode,
    },
  })

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
