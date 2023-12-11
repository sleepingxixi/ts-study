import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import LogoutPage from './pages/Logout'

export default () => {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" Component={HomePage} /> {/* 👈 Renders at /#/app/ */}
      <Route path="/login" Component={LoginPage} /> {/* 👈 Renders at /#/app/ */}
      <Route path="/logout" Component={LogoutPage} /> {/* 👈 Renders at /#/app/ */}
    </Routes>
  </BrowserRouter>)
}