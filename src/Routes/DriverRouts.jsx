import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import MobileLoginPageDriver from '../Pages/Driver/MobileLoginPageDriver'

function DriverRouts() {
  return (
    <div>
       <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<MobileLoginPageDriver/>}/>
      </Routes>
    </div>
  )
}

export default DriverRouts
