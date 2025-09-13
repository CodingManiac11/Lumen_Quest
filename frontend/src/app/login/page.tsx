'use client'

import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function LoginPage() {
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer')

  return (
    <AuthForm
      mode="login"
      userType={userType}
      onModeChange={() => {}} // Not needed for dedicated login page
      onUserTypeChange={setUserType}
    />
  )
}