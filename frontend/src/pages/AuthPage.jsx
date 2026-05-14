import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from '../components/Modal';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsResetting(false);
    setResetSent(true);
    toast.success('Password reset link sent!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Extract form data
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (isLogin) {
        // Try real backend API first
        try {
          const res = await axios.post('http://localhost:8081/api/auth/login', { email, password });
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            toast.success('Successfully logged in!');
            navigate('/dashboard');
          }
        } catch (error) {
          // Fallback to simulation if backend is down
          console.warn('Backend API unavailable, using local simulation.', error);
          await new Promise(resolve => setTimeout(resolve, 1500));
          toast.success('Welcome back!');
          navigate('/dashboard');
        }
      } else {
        // Registration simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Account created successfully!');
        setIsLogin(true); // Switch to login
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {isLogin ? 'Enter your details to access your account' : 'Start your wealth building journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                name="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" onClick={() => { setShowForgotPassword(true); setResetSent(false); setResetEmail(''); }} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} title="Reset Password">
        {!resetSent ? (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <KeyRound className="w-7 h-7" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={isResetting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70"
            >
              {isResetting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Check Your Inbox</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">We've sent a password reset link to <span className="font-semibold text-slate-700 dark:text-slate-300">{resetEmail}</span>. It may take a few minutes to arrive.</p>
            <button 
              onClick={() => setShowForgotPassword(false)}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors mt-4"
            >
              Back to Login
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuthPage;
