import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    setPasswordStrength(calculatePasswordStrength(pass));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!username.trim()) {
      setLocalError('Username is required');
      return;
    }

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Please enter a valid email');
      return;
    }

    if (!password) {
      setLocalError('Password is required');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (!confirmPassword) {
      setLocalError('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(username, email, password, confirmPassword);
      navigate('/');
    } catch (err) {
      setLocalError(error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          const googleButtonDiv = document.getElementById('google-signup-button');
          if (googleButtonDiv && window.google) {
            (window.google.accounts.id as any).renderButton(
              googleButtonDiv,
              {
                theme: 'filled_blue',
                size: 'large',
                width: googleButtonDiv.offsetWidth || 350,
                text: 'signup_with',
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
        toast.success('Signed up with Google successfully!');
        window.location.href = '/';
      } else {
        setLocalError(data.error || 'Google signup failed');
        toast.error(data.error || 'Google signup failed');
        console.error('Google signup error:', data);
      }
    } catch (err: any) {
      console.error('Google signup exception:', err);
      setLocalError('Google signup failed. Please try again.');
      toast.error('Google signup failed');
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

  const passwordStrengthConfig = [
    { label: 'Very Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-teal-500' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];

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
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join us to start visualizing algorithms</p>
          </motion.div>

          {(localError || error) && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-200 text-sm">{localError || error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white/20 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                  onChange={handlePasswordChange}
                  placeholder="Create a password"
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
              {password && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i < passwordStrength
                            ? passwordStrengthConfig[passwordStrength - 1].color
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300">
                    Password strength: <span className="text-teal-300 font-medium">{passwordStrengthConfig[Math.max(0, passwordStrength - 1)]?.label}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex items-center gap-2">
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-green-300">Passwords match</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <p className="text-xs text-red-300">Passwords don't match</p>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <motion.div className="my-6 flex items-center" variants={itemVariants}>
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">or sign up with</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <div
              id="google-signup-button"
              className="w-full flex justify-center"
              style={{ minHeight: '44px' }}
            />
          </motion.div>

          <motion.p className="text-center mt-6 text-gray-300" variants={itemVariants}>
            Already have an account?{' '}
            <Link to="/login" className="text-teal-300 hover:text-amber-300 font-semibold transition-colors">
              Sign in here
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

export default SignupPage;
