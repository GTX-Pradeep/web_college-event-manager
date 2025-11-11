import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.token) {
        const userData = {
          name: response.data.name,
          role: response.data.role,
          email: email,
          srn: response.data.srn || '',
          profilePicture: response.data.profilePicture || ''
        };
        
        setToken(response.data.token);
        setUser(userData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, role: response.data.role };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role, srn = '') => {
    try {
      const response = await axios.post('/api/auth/signup', { 
        name, 
        email, 
        password, 
        role,
        srn: role === 'student' ? srn : ''
      });
      
      if (response.data.message === 'Signup successful ✅') {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const updateProfilePicture = async (profilePictureUrl) => {
    try {
      const response = await axios.put(
        '/api/auth/profile-picture',
        { profilePicture: profilePictureUrl },
        { headers: getAuthHeader() }
      );

      if (response.data.profilePicture !== undefined) {
        const updatedUser = { ...user, profilePicture: response.data.profilePicture };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    getAuthHeader,
    updateProfilePicture,
    isAuthenticated: !!token,
    isStudent: user?.role === 'student',
    isClub: user?.role === 'club'
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
