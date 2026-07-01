import React, { createContext, useContext, useState, useEffect } from 'react';
import {register,login as signin,logout} from '../api/auth.api';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const userData = jwtDecode(token);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await signin({ email, password });

      if (response.status === 200) {
        const userData = jwtDecode(response.data.token);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
      }
      return { success: true, user:  jwtDecode(response.data.token) };
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Create mock user
      const userData = {
        email,
        name,
        password
      };
      const response = await register(userData);
      if (response.status === 200) {
        setUser(jwtDecode(response.data.token));
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        console.log('User signed up and logged in:', jwtDecode(response.data.token));
      }
      
      return { success: true, user: jwtDecode(response.data.token) };
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
