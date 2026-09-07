import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'

import { Navbar } from '@/components/navbar'
import { GlobalContainer, PagesContainer } from '@/globals/styles'
import { AppRoutes } from '@/routes'
import { Toast } from './components/toast'

const AUTH_ROUTES = ['/login', '/register']

function App() {
  const location = useLocation()
  const hideNavbar = AUTH_ROUTES.includes(location.pathname)

  return (
    <GlobalContainer>
      {!hideNavbar && <Navbar />}
      <Toast />
      <PagesContainer data-route={location.pathname}>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </PagesContainer>
    </GlobalContainer>
  )
}

export default App
