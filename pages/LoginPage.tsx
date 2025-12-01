import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { Button, Card } from '../components/UI';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') === 'agent' ? 'agent' : 'user';
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pre-fill demo credentials for convenience
  useEffect(() => {
    if (type === 'agent') {
      setEmail('agent.john@rebox.com');
    } else {
      setEmail('alex.johnson@example.com');
    }
    setPassword('password123');
  }, [type]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      if (type === 'agent') {
        navigate('/agent-demo');
      } else {
        navigate('/user-dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rebox-sand opacity-50 skew-x-12 translate-x-40 z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rebox-green/5 rounded-full blur-3xl" />

      {/* Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-rebox-dark transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rebox-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rebox-green/20">
            <Box className="text-white w-8 h-8" />
          </div>
          <h1 className="font-heading font-bold text-3xl text-rebox-dark mb-2">
            {type === 'agent' ? 'Agent Portal' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500">
            {type === 'agent' 
              ? 'Log in to manage your pickup routes' 
              : 'Log in to schedule pickups and track rewards'}
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-white/50 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rebox-green/50 focus:border-rebox-green transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rebox-green/50 focus:border-rebox-green transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900">
                <input type="checkbox" className="rounded border-gray-300 text-rebox-green focus:ring-rebox-green" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-semibold text-rebox-green hover:underline">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              loading={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          {type === 'user' && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Don't have an account? <a href="#" className="font-bold text-rebox-dark hover:underline">Sign up for free</a>
            </div>
          )}
        </Card>
        
        <div className="mt-8 text-center">
           <Link 
             to={`/login?type=${type === 'agent' ? 'user' : 'agent'}`}
             className="text-sm font-medium text-gray-400 hover:text-rebox-dark transition-colors"
           >
             Switch to {type === 'agent' ? 'User' : 'Agent'} Login
           </Link>
        </div>
      </motion.div>
    </div>
  );
};