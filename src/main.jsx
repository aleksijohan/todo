import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Authentication, { AuthenticationMode } from './screens/Authentication'
import NotFound from './screens/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './context/UserProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/signin',
        element: <Authentication authenticationMode={AuthenticationMode.SignIn} />,
        errorElement: <NotFound />
    },
    {
        path: '/signup',
        element: <Authentication authenticationMode={AuthenticationMode.SignUp} />,
        errorElement: <NotFound />
    },
    {
        element: <ProtectedRoute />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <App />,
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </StrictMode>,
)