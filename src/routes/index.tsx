import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '@/pages/core/login'
import { Market } from '@/pages/core/market'
import { Profile } from '@/pages/core/profile'
import { Register } from '@/pages/core/register'
import { useAuthStore } from '@/stores/auth-store'

export function AppRoutes() {
    const user = useAuthStore((state) => state.user)

    return (
        <Routes>
            <Route index element={<Market />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}