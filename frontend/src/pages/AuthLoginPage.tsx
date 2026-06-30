import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error('VITE_GOOGLE_CLIENT_ID is not set in environment variables');
      return;
    }

    console.log('Loading Google OAuth with Client ID:', GOOGLE_CLIENT_ID);

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Google script loaded successfully');
      if (window.google && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        console.log('Google OAuth initialized');

        setTimeout(() => {
          const googleButtonDiv = document.getElementById('google-signin-button');
          if (googleButtonDiv && window.google) {
            (window.google.accounts.id as any).renderButton(
              googleButtonDiv,
              {
                theme: 'filled_blue',
                size: 'large',
                width: googleButtonDiv.offsetWidth || 350,
                text: 'continue_with',
                shape: 'rectangular'
              }
            );
            console.log('Google button rendered');
          }
        }, 100);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google OAuth script');
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleGoogleCallback = async (response: any) => {
    try {
      setIsLoading(true);
      console.log('Google response received:', response);

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      console.log('Backend response:', data);

      if (res.ok && data.status === 'success') {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        toast.success('Logged in with Google successfully!');
        window.location.href = '/';
      } else {
        setLocalError(data.error || 'Google login failed');
        toast.error(data.error || 'Google login failed');
        console.error('Google login error:', data);
      }
    } catch (err: any) {
      console.error('Google login exception:', err);
      setLocalError('Google login failed. Please try again.');
      toast.error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address (e.g., user@gmail.com)');
      return;
    }

    if (!password) {
      setLocalError('Password is required');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setLocalError(error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-amber-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8"
          variants={itemVariants}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account to continue</p>
          </motion.div>

          {(localError || error) && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-200 text-sm">{localError || error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email (e.g., user@gmail.com)"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white/20 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          <motion.div className="my-6 flex items-center" variants={itemVariants}>
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <div
              id="google-signin-button"
              className="w-full flex justify-center"
              style={{ minHeight: '44px' }}
            />
          </motion.div>

          <motion.p className="text-center mt-6 text-gray-300" variants={itemVariants}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-300 hover:text-amber-300 font-semibold transition-colors">
              Sign up here
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default LoginPage;
