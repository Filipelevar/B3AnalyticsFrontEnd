import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '@/pages/core/login'
import { Market } from '@/pages/core/market'
import { Profile } from '@/pages/core/profile'
import { Register } from '@/pages/core/register'
import { useAuthStore } from '@/stores/auth-store'

export function AppRoutes() {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = Boolean(user)

    return (
        <Routes>
            <Route index element={<Navigate to={isAuthenticated ? '/market' : '/login'} replace />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/market" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/market" replace /> : <Register />} />
            <Route path="/market" element={isAuthenticated ? <Market /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? '/market' : '/login'} replace />} />
        </Routes>
    )
}