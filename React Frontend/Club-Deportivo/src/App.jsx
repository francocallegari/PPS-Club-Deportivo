import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './components/mainLayout/MainLayout'
import Dashboard from './components/dashboard/Dashboard'
import './App.css'
import Sports from './components/sports/Sports'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Dashboard></Dashboard>
        </MainLayout>
      )
    },
    {
      path: "/Sports",
      element: (
        <MainLayout>
          <Sports></Sports>
        </MainLayout>
      )
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
