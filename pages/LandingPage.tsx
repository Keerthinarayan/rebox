import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '../components/UI';
import { Link } from 'react-router-dom';
import { HowItWorksSection } from './HowItWorksPage';

export const LandingPage: React.FC = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rebox-sand opacity-50 skew-x-12 translate-x-20 z-0" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-rebox-green/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight text-rebox-dark">
                Turn leftover <br />
                <span className="text-transparent bg-clip-text bg-brand-gradient">boxes into value.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                Hand over your empty cardboard to the delivery agent. We recycle responsibly, and you earn real rewards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login?type=user">
                  <Button size="lg" className="w-full sm:w-auto">
                    Schedule pickup now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto" onClick={scrollToHowItWorks}>
                   How it works
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-gray-200/60 flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex -space-x-2">
                  <img src="https://picsum.photos/32/32?random=1" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                  <img src="https://picsum.photos/32/32?random=2" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                  <img src="https://picsum.photos/32/32?random=3" className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                </div>
                <p>12k+ boxes saved this month</p>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Visual Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100">
                <img 
                   src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
                   alt="Eco friendly delivery" 
                   className="object-cover w-full h-full opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-rebox-dark/20 to-transparent mix-blend-multiply" />
              </div>

              {/* Decor elements */}
              <Leaf className="absolute -top-6 -right-6 text-rebox-green w-12 h-12 opacity-80 rotate-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-8">Trusted by sustainable brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="font-heading font-black text-2xl text-gray-800 tracking-tight">zomato</span>
             <span className="font-heading font-black text-2xl text-orange-500 tracking-tight">Swiggy</span>
             <span className="font-heading font-bold text-2xl text-slate-800 flex items-baseline">amazon</span>
             <span className="font-heading font-bold text-2xl text-blue-600">Flipkart</span>
             <span className="font-heading font-bold text-2xl text-green-600">bigbasket</span>
             <span className="font-heading font-extrabold text-2xl text-yellow-500">blinkit</span>
          </div>
        </div>
      </section>

      {/* Embedded How It Works Section */}
      <div className="bg-rebox-sand/30">
        <HowItWorksSection />
      </div>
    </div>
  );
};