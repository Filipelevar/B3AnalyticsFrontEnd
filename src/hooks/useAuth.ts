import { useNavigate } from 'react-router-dom'

import { logout, signIn } from '@/stores/auth-store/actions'
import { useAuthStore } from '@/stores/auth-store'
import type { LoginUserDTO } from '@/types/AuthTypes'

export function useAuth() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    async function handleSignIn(credentials: LoginUserDTO) {
        await signIn(credentials)
        navigate('/', { replace: true })
    }

    function handleLogout() {
        logout()
        navigate('/', { replace: true })
    }

    return {
        user,
        isAuthenticated: Boolean(user),
        handleSignIn,
        handleLogout,
    }
}