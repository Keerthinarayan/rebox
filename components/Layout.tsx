import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Box, ArrowRight } from 'lucide-react';
import { Button } from './UI';
import { useApp } from '../context/AppContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useApp();
  const location = useLocation();

  const isDashboard = location.pathname === '/user-dashboard';

  return (
    <div className="min-h-screen flex flex-col font-sans text-rebox-dark">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-rebox-cream/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-rebox-dark rounded-xl flex items-center justify-center group-hover:bg-rebox-green transition-colors duration-300">
                <Box className="text-white w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">Rebox</span>
            </Link>

            {/* Desktop Links - Minimal Public Nav */}
            <div className="hidden md:flex items-center gap-8">
              {/* Links removed as per request to move How It Works content inline */}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login?type=agent">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-rebox-dark">
                  Agent Login
                </Button>
              </Link>
              
              {isDashboard ? (
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                   <div className="flex flex-col items-end">
                     <span className="text-xs font-bold text-rebox-dark">{user.name}</span>
                     <span className="text-xs text-rebox-green font-bold">{user.greenPoints} GP</span>
                   </div>
                   <div className="w-8 h-8 bg-rebox-sand rounded-full flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                   </div>
                </div>
              ) : (
                <Link to="/login?type=user">
                  <Button size="sm">User Login</Button>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
            <div className="pt-4 flex flex-col gap-3">
              <Link to="/login?type=user" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">User Login</Button>
              </Link>
              <Link to="/login?type=agent" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Agent Login</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Box className="text-rebox-green w-6 h-6" />
                <span className="font-heading font-bold text-xl">Rebox</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Closing the loop on packaging waste. We make recycling effortless and rewarding for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/login?type=user" className="hover:text-rebox-green">User Dashboard</Link></li>
                <li><Link to="/login?type=agent" className="hover:text-rebox-green">Agent Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-rebox-green">About Us</a></li>
                <li><a href="#" className="hover:text-rebox-green">Sustainability</a></li>
                <li><a href="#" className="hover:text-rebox-green">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Join the movement</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rebox-green/20"
                />
                <button className="bg-rebox-dark text-white p-2 rounded-lg hover:bg-gray-800">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2024 Rebox Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};