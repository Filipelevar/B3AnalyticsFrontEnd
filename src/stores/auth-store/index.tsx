import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { UserDTO } from '@/types/AuthTypes'

interface AuthStore {
    user: UserDTO | null
    setUser: (user: UserDTO | null) => void
    reset: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            reset: () => set({ user: null }),
        }),
        {
            name: 'b3analytics.auth.user',
            partialize: (state) => ({ user: state.user }),
        },
    ),
)