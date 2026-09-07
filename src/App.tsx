import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'

import { Navbar } from '@/components/navbar'
import { Loader } from '@/components/loader'
import { GlobalContainer, PagesContainer } from '@/globals/styles'
import { AppRoutes } from '@/routes'
import { useLoadingStore } from '@/stores/loading-store'
import { Toast } from './components/toast'

const AUTH_ROUTES = ['/login', '/register']

function App() {
  const location = useLocation()
  const hideNavbar = AUTH_ROUTES.includes(location.pathname)
  const isLoading = useLoadingStore((state) => state.pendingRequests > 0)

  return (
    <GlobalContainer>
      {isLoading && <Loader />}
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
