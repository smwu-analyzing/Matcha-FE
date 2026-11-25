import { createBrowserRouter, Navigate } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/home" replace /> },
  { path: '/home', element: <HomePage percent={0} /> },
])