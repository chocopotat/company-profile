import { createContext, useContext, useState, type ReactNode } from 'react'

export type UserRole = 'user' | 'hr' | 'admin' | 'super_admin'

export interface User {
  id: number
  name: string
  username: string
  email: string
  role: UserRole
  phone?: string
  profile_photo?: string
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

interface RegisterData {
  name: string
  username: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    phone: '081234567890',
    profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
    is_active: true,
  },
  {
    id: 2,
    name: 'Sarah Admin',
    username: 'sarahadmin',
    email: 'admin@example.com',
    password: 'password',
    role: 'super_admin',
    phone: '081234567891',
    profile_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format',
    is_active: true,
  },
  {
    id: 3,
    name: 'HR Manager',
    username: 'hrmanager',
    email: 'hr@example.com',
    password: 'password',
    role: 'hr',
    phone: '081234567892',
    profile_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
    is_active: true,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('auth_user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'))

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Email atau password salah.' }
    const { password: _, ...userData } = found
    setUser(userData)
    setToken('mock_token_' + userData.id)
    localStorage.setItem('auth_user', JSON.stringify(userData))
    localStorage.setItem('auth_token', 'mock_token_' + userData.id)
    return { success: true }
  }

  const register = async (data: RegisterData) => {
    await new Promise(r => setTimeout(r, 800))
    const exists = MOCK_USERS.find(u => u.email === data.email || u.username === data.username)
    if (exists) return { success: false, message: 'Email atau username sudah digunakan.' }
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: !!user && user.role !== 'user',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
