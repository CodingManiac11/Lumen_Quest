"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form, useForm, validationRules } from '@/components/ui/Form';
import authService from '@/lib/authService';

function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm(
    { email: '' },
    {
      email: [validationRules.required, validationRules.email]
    }
  );

  const handleResetRequest = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      await authService.requestPasswordReset(values.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Password reset error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to{' '}
                <span className="font-medium">{values.email}</span>
              </p>
              <Button onClick={handleBackToLogin} fullWidth>
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            🔐 Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <Card className="mt-8">
          <CardContent className="space-y-6">
            <Form>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                error={touched.email && errors.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                fullWidth
                leftIcon="📧"
              />

              <Button
                onClick={handleResetRequest}
                loading={loading}
                fullWidth
                size="lg"
                className="mt-6"
              >
                Send Reset Link
              </Button>
            </Form>
          </CardContent>
          
          <CardFooter className="text-center border-t">
            <div className="w-full">
              <button
                onClick={handleBackToLogin}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                ← Back to login
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;