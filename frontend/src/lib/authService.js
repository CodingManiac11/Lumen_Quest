"use client";

// Mock authService for demonstration - replace with real API calls
export const authService = {
  // Login with username/password
  async login(username, password) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (!username || !password) {
        throw new Error("Username and password are required");
      }
      
      // Mock success - in real app, call your backend API
      const mockToken = `token_${Date.now()}_${Math.random()}`;
      const mockUser = {
        id: 1,
        username,
        email: `${username}@example.com`,
        role: username.toLowerCase().includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      
      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { token: mockToken, user: mockUser };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Register new user
  async register(userData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { username, email, password, confirmPassword } = userData;
      
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }
      
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock user creation
      const mockToken = `token_${Date.now()}_${Math.random()}`;
      const mockUser = {
        id: Date.now(),
        username,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { token: mockToken, user: mockUser };
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Get current token
  getToken() {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  },

  // Password reset request
  async requestPasswordReset(email) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Mock password reset request
      console.log(`Password reset email sent to: ${email}`);
      return { message: "Password reset email sent successfully" };
    } catch (error) {
      throw new Error(error.message || 'Password reset request failed');
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!token || !newPassword) {
        throw new Error("Token and new password are required");
      }
      
      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock password reset
      return { message: "Password reset successfully" };
    } catch (error) {
      throw new Error(error.message || 'Password reset failed');
    }
  },

  // Update user profile
  async updateProfile(updates) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.message || 'Profile update failed');
    }
  }
};

export default authService;