'use client'

import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer')

  return (
    <AuthForm
      mode={mode}
      userType={userType}
      onModeChange={setMode}
      onUserTypeChange={setUserType}
    />
  )
}