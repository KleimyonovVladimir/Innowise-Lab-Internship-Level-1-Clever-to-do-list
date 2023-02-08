import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/wrappers/Layout'

const Home = React.lazy(async () => await import('./pages/HomePage'))
const ErrorPage = React.lazy(async () => await import('./pages/Error404'))
const CreateTodoPage = React.lazy(async () => await import('./pages/CreateTodo'))
const TodoDetails = React.lazy(async () => await import('./pages/TodoDetails'))

const AuthenticatedApp = () => (
  <Layout>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/todo-details/:id" element={<TodoDetails />} />
      <Route path="/add" element={<CreateTodoPage />} />
      <Route path="/error-page" element={<ErrorPage />} />
      <Route path="/login" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/error-page" replace />} />
    </Routes>
  </Layout>
)

export default AuthenticatedApp
