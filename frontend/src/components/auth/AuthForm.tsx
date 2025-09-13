'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Mail, Lock, User, Building, Shield, Zap } from 'lucide-react'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  company?: string
}

interface AuthFormProps {
  mode: 'login' | 'signup'
  userType: 'customer' | 'admin'
  onModeChange: (mode: 'login' | 'signup') => void
  onUserTypeChange: (type: 'customer' | 'admin') => void
}

export function AuthForm({ mode, userType, onModeChange, onUserTypeChange }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { login, setLoading, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<AuthFormData>()

  const password = watch('password')

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true)
      
      if (mode === 'signup') {
        // Simulate signup API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        // Create mock user based on type
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          role: userType === 'admin' ? 'admin' : 'customer'
        }
        // For now, we'll just login the user after signup
        await login(data.email, data.password)
      } else {
        // Login
        await login(data.email, data.password)
      }
      
      reset()
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Zap className="h-7 w-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">SubsPro</h1>
            <p className="text-sm text-gray-500">Subscription Management Platform</p>
          </div>
        </div>

        {/* User Type Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 space-x-1">
          <button
            onClick={() => onUserTypeChange('customer')}
            className={cn(
              'flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200',
              userType === 'customer'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <User className="h-4 w-4" />
            <span>Customer</span>
          </button>
          <button
            onClick={() => onUserTypeChange('admin')}
            className={cn(
              'flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200',
              userType === 'admin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-3 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {mode === 'login' ? 'Welcome back' : 'Create account'}
                </CardTitle>
                <CardDescription className="mt-1">
                  {mode === 'login' 
                    ? `Sign in to your ${userType} account`
                    : `Create a new ${userType} account`
                  }
                </CardDescription>
              </div>
              <Badge 
                variant={userType === 'admin' ? 'primary' : 'neutral'}
                className="capitalize"
              >
                {userType}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name fields for signup */}
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    placeholder="John"
                    error={errors.firstName?.message}
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    error={errors.lastName?.message}
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                  />
                </div>
              )}

              {/* Company field for customers */}
              {mode === 'signup' && userType === 'customer' && (
                <Input
                  label="Company"
                  placeholder="Acme Inc."
                  leftIcon={<Building className="h-4 w-4" />}
                  error={errors.company?.message}
                  {...register('company', {
                    required: 'Company name is required'
                  })}
                />
              )}

              {/* Email */}
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              {/* Password */}
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />

              {/* Confirm Password for signup */}
              {mode === 'signup' && (
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === password || 'Passwords do not match'
                  })}
                />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>

              {/* Forgot Password Link for Login */}
              {mode === 'login' && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>

            {/* Mode Toggle */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-gray-700">Demo Credentials:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Admin:</strong> admin@demo.com / password123</p>
                <p><strong>Customer:</strong> customer@demo.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}