'use client'

import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignupPage() {
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer')

  return (
    <AuthForm
      mode="signup"
      userType={userType}
      onModeChange={() => {}} // Not needed for dedicated signup page
      onUserTypeChange={setUserType}
    />
  )
}