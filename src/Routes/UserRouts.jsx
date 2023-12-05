import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Roll from '../Pages/Roll'
import MobileLoginPageClient from '../Pages/Client/MobileLoginPageClient'
// import OtpPage from '../Pages/OtpPage'
import RegPage from '../Pages/Client/RegPage'

function UserRouts() {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/roll' element = {<Roll/>}/>
        <Route path='/login' element = {<MobileLoginPageClient/>}/>
        <Route path='/register' element = {<RegPage/>}/>
      </Routes>
    </div>
  )
}

export default UserRouts
