import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ErrorPage from './components/Error404'
import Home from './components/HomePage'

const AuthenticatedApp = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/error-page" element={<ErrorPage />} />
    <Route path="/login" element={<Navigate to="/home" replace />} />
    <Route path="*" element={<Navigate to="/error-page" replace />} />
  </Routes>
)

export default AuthenticatedApp
