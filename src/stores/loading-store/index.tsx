import { create } from 'zustand'

interface LoadingStore {
    pendingRequests: number
    start: () => void
    finish: () => void
}

export const useLoadingStore = create<LoadingStore>()((set) => ({
    pendingRequests: 0,
    start: () => set((state) => ({ pendingRequests: state.pendingRequests + 1 })),
    finish: () => set((state) => ({ pendingRequests: Math.max(0, state.pendingRequests - 1) })),
}))
