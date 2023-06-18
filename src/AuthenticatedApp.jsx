import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/wrappers/Layout'

const Home = React.lazy(async () => await import('./pages/HomePage'))
const ErrorPage = React.lazy(async () => await import('./pages/Error404'))

const AuthenticatedApp = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error-page" element={<ErrorPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/error-page" replace />} />
    </Routes>
  </Layout>
)

export default AuthenticatedApp
