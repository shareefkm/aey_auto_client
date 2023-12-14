import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import MobileLoginPageDriver from '../Pages/Driver/MobileLoginPageDriver'
import RegPage from '../Pages/Client/RegPage'
import DriverHomePage from '../Pages/Driver/DriverHomePage'

function DriverRouts() {
  return (
    <div>
       <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<MobileLoginPageDriver/>}/>
        <Route path='/register' element = {<RegPage/>}/>
        <Route path='/home' element = {<DriverHomePage/>}/>
      </Routes>
    </div>
  )
}

export default DriverRouts
