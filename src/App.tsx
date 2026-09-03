import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'

import { Navbar } from '@/components/navbar'
import { GlobalContainer, PagesContainer } from '@/globals/styles'
import { AppRoutes } from '@/routes'

function App() {
  const location = useLocation()

  return (
    <GlobalContainer>
      <Navbar />
      <PagesContainer data-route={location.pathname}>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </PagesContainer>
    </GlobalContainer>
  )
}

export default App
