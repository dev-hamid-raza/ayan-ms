import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/AuthContext'


export default function App() {
  const router = createBrowserRouter(routes)
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <Toaster position='top-right' richColors />
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
