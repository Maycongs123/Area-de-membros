import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { styled } from 'styled-components'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EditCurso from './pages/EditCurso'

import { CarouselContextProvider } from './contexts/CarouselContext'

import Curso from './pages/Curso'


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {

  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 144rem;
  width: 100%;
  margin: 0 auto;
`

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Layout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '/',
    index: false,
    element: (
      <PrivateRoute>
        <CarouselContextProvider>
          <Layout />
        </CarouselContextProvider>
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        index: false,
        element: <Home />,
      },
      {
        path: '/curso/:title/lesson/:id',
        index: false,
        element: <Curso />,
      },
      {
        path: '/edit-curso/:title/:id',
        index: false,
        element: <EditCurso />,
      },
      {
        path: '/my-profile',
        index: false,
        element: <Profile />,
      },
    ],
  },
])
