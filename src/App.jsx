import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import UserRouts from './Routes/UserRouts'
import AdminRouts from './Routes/AdminRouts'
import DriverRouts from './Routes/DriverRouts'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRouts/>}/>
          <Route path='/admin/*' element={<AdminRouts/>}/>
          <Route path='/driver/*' element={<DriverRouts/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
