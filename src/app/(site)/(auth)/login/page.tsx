'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LoginFormData {
  username: string;
  password: string;
  userType: 'doctor' | 'patient';
}

interface LoginComponentProps {
  onLogin?: (formData: LoginFormData) => void;
  onSignUp?: (userType: 'doctor' | 'patient') => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ 
  onLogin, 
  onSignUp 
}) => {
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserTypeToggle = (type: 'doctor' | 'patient') => {
    setUserType(type);
    // Reset form when switching user types
    setFormData({ username: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the onLogin prop if provided
      if (onLogin) {
        await onLogin({
          ...formData,
          userType
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp(userType);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ backgroundColor: 'var(--color-2)' }}>
      <div 
        className="rounded-3xl p-8 shadow-2xl max-w-4xl w-full mx-4 transition-all duration-500 ease-in-out"
        style={{ backgroundColor: '#005F73' }}
      >
        {/* User Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 flex">
            <button
              onClick={() => handleUserTypeToggle('doctor')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ease-in-out font-medium ${
                userType === 'doctor'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{
                backgroundColor: userType === 'doctor' ? '#005F73' : 'transparent'
              }}
            >
              Doctor
            </button>
            <button
              onClick={() => handleUserTypeToggle('patient')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ease-in-out font-medium ${
                userType === 'patient'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{
                backgroundColor: userType === 'patient' ? '#005F73' : 'transparent'
              }}
            >
              Patient
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding and Image */}
          <div 
            className={`text-center transition-all duration-500 ease-in-out ${
              userType === 'doctor' ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <h1 className="text-white text-4xl font-bold mb-4">MediQueue</h1>
            
            <div 
              className="rounded-3xl p-6 mb-6 mx-auto max-w-sm transition-all duration-500 ease-in-out transform"
              style={{ backgroundColor: '#F0DCC7' }}
            >
              {userType === 'patient' ? (
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/Patient-login.png"
                    alt="Patient illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/Doctor-login.png"
                    alt="Doctor illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            <div className="text-white">
              {userType === 'patient' ? (
                <>
                  <p className="text-xl font-semibold mb-2">Skip the waiting room.</p>
                  <p className="text-lg">Log in to secure your spot.</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold mb-2">Your patients are waiting.</p>
                  <p className="text-lg">Log in to manage your appointments.</p>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div 
            className={`transition-all duration-500 ease-in-out ${
              userType === 'doctor' ? 'md:order-1' : 'md:order-2'
            }`}
          >
            <div 
              className="rounded-3xl p-8 transition-all duration-300 ease-in-out"
              style={{ backgroundColor: '#F0DCC7' }}
            >
              <h2 
                className="text-2xl font-bold mb-6 transition-colors duration-300"
                style={{ color: '#005F73' }}
              >
                Welcome Back
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#005F73' }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-all duration-200"
                    style={{ 
                      backgroundColor: 'white'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#005F73' }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-all duration-200"
                    style={{ 
                      backgroundColor: 'white'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
                  className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#005F73'
                  }}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSignUpClick}
                    className="text-sm hover:underline transition-colors duration-200"
                    style={{ color: '#005F73' }}
                  >
                    Don&apos;t have an account? Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;