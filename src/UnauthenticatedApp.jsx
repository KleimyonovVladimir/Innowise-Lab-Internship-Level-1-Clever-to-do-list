import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SignInPage = React.lazy(async () => await import('./pages/SignInPage'))
const SignUpPage = React.lazy(async () => await import('./pages/SignUpPage'))

const UnauthenticatedApp = () => (
  <Routes>
    <Route path="/login" element={<SignInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
)

export default UnauthenticatedApp
