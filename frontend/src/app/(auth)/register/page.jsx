"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, useForm, validationRules } from '@/components/ui/Form';
import authService from '@/lib/authService';

function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm(
    { username: '', email: '', password: '', confirmPassword: '' },
    {
      username: [validationRules.required, validationRules.minLength(3)],
      email: [validationRules.required, validationRules.email],
      password: [validationRules.required, validationRules.minLength(6)],
      confirmPassword: [
        validationRules.required,
        validationRules.match('password', 'Passwords must match')
      ]
    }
  );

  const handleRegister = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      await authService.register(values);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            👤 Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button
              onClick={handleLoginRedirect}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to existing account
            </button>
          </p>
        </div>
        
        <Card className="mt-8">
          <CardContent className="space-y-6">
            <Form>
              <div className="space-y-4">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={values.username}
                  error={touched.username && errors.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  fullWidth
                  leftIcon="👤"
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  error={touched.email && errors.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  fullWidth
                  leftIcon="📧"
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={values.password}
                  error={touched.password && errors.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  fullWidth
                  leftIcon="🔒"
                  helperText="Must be at least 6 characters"
                />
                
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  fullWidth
                  leftIcon="🔒"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-start">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5" />
                  <span className="ml-2 block text-sm text-gray-900">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <Button
                onClick={handleRegister}
                loading={loading}
                fullWidth
                size="lg"
                className="mt-6"
              >
                Create Account
              </Button>
            </Form>
          </CardContent>
          
          <CardFooter className="text-center border-t">
            <div className="w-full">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={handleLoginRedirect}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;