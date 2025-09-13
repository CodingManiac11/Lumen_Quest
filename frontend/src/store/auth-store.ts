'use client'

import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'admin'
      }
      set({ user: mockUser, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  
  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },
  
  setLoading: (loading) => {
    set({ isLoading: loading })
  },
}))
