import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import UserRouts from './Routes/UserRouts'
import AdminRouts from './Routes/AdminRouts'
import DriverRouts from './Routes/DriverRouts'
import { createTheme,colors, ThemeProvider } from '@mui/material';

const theme = createTheme({
  status:{
    // button : "#da0037"
  },
  palette: {
    primary: {
      main: colors.amber[500],
      light: colors.amber[300]
    },
    secondary: {
      main: colors.grey[900]
    },
    buttonColor: {
      main: colors.pink[500]
    },
    blueGrey:{
      main: colors.blueGrey[500],
      light: colors.blueGrey[100]
    }
  },
});
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRouts/>}/>
          <Route path='/admin/*' element={<AdminRouts/>}/>
          <Route path='/driver/*' element={<DriverRouts/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
