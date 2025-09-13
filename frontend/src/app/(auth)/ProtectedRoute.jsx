"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import authService from '@/lib/authService';

function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        router.push('/auth/login');
        return;
      }

      // Check role-based authorization
      if (requiredRole) {
        const user = authService.getCurrentUser();
        if (!user || user.role !== requiredRole) {
          router.push('/unauthorized');
          return;
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not authorized
  if (!isAuthorized) {
    return null;
  }

  // Authorized - render children
  return children;
}

export default ProtectedRoute;
