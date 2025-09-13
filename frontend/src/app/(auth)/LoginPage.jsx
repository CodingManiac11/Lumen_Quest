"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, useForm, validationRules } from '@/components/ui/Form';
import authService from '@/lib/authService';

function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm(
    { username: '', password: '' },
    {
      username: [validationRules.required],
      password: [validationRules.required, validationRules.minLength(6)]
    }
  );

  const handleLogin = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      await authService.login(values.username, values.password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            🔑 Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button
              onClick={handleRegisterRedirect}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
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
                  placeholder="Enter your username"
                  value={values.username}
                  error={touched.username && errors.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  fullWidth
                  leftIcon="👤"
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  error={touched.password && errors.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  fullWidth
                  leftIcon="🔒"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <span className="ml-2 block text-sm text-gray-900">Remember me</span>
                </label>
                
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500"
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                onClick={handleLogin}
                loading={loading}
                fullWidth
                size="lg"
                className="mt-6"
              >
                Sign in
              </Button>
            </Form>
          </CardContent>
          
          <CardFooter className="text-center border-t">
            <div className="w-full">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={handleRegisterRedirect}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
