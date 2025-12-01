import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Gift, Users, Trophy, Share2, Copy } from 'lucide-react';
import { SchedulePickupView } from './UserDemoPage';
import { RewardsView } from './RewardsPage';
import { useApp } from '../context/AppContext';
import { Card, Button } from '../components/UI';

const ReferralCard = () => (
    <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><Users size={18} /> Refer a Friend</h3>
                    <p className="text-indigo-100 text-sm">Both get <span className="font-bold text-white">200 Green Points</span></p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Share2 size={20} />
                </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between border border-white/20">
                <code className="font-mono font-bold text-sm tracking-widest">ALEX2024</code>
                <button className="text-xs font-bold uppercase hover:text-indigo-200 flex items-center gap-1">
                    <Copy size={12} /> Copy
                </button>
            </div>
        </div>
    </Card>
);

const LeaderboardCard = () => (
    <Card className="border-gray-100">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-rebox-dark">
            <Trophy className="text-yellow-500" size={20} /> Community Top 3
        </h3>
        <div className="space-y-4">
            {[
                { name: 'Sarah M.', points: 1250, color: 'bg-yellow-100 text-yellow-700' },
                { name: 'Mike R.', points: 980, color: 'bg-gray-100 text-gray-700' },
                { name: 'You', points: 420, color: 'bg-rebox-green/10 text-rebox-green' },
            ].map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.color}`}>
                            {i + 1}
                        </div>
                        <span className={`font-medium text-sm ${user.name === 'You' ? 'text-rebox-dark font-bold' : 'text-gray-600'}`}>
                            {user.name}
                        </span>
                    </div>
                    <span className="font-bold text-sm text-gray-800">{user.points} pts</span>
                </div>
            ))}
        </div>
    </Card>
);

export const UserDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'rewards'>('schedule');
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-3xl text-rebox-dark">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-500 mt-1">Ready to recycle some boxes today?</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6">
               <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Saved</div>
                  <div className="font-bold text-xl">{user.boxesSaved} boxes</div>
               </div>
               <div className="w-px bg-gray-200 h-10" />
               <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Impact</div>
                  <div className="font-bold text-xl text-rebox-green">{user.totalRecycled.toFixed(1)} kg</div>
               </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-8 mt-10 border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 px-2 font-medium text-sm transition-all relative ${
                activeTab === 'schedule' ? 'text-rebox-green' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Schedule Pickup
              </div>
              {activeTab === 'schedule' && (
                <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rebox-green" />
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('rewards')}
              className={`pb-4 px-2 font-medium text-sm transition-all relative ${
                activeTab === 'rewards' ? 'text-rebox-green' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                My Rewards
              </div>
              {activeTab === 'rewards' && (
                <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rebox-green" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Column */}
            <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'schedule' ? <SchedulePickupView /> : <RewardsView />}
                </motion.div>
                </AnimatePresence>
            </div>

            {/* Sidebar Widgets (Only visible on large screens or stacked below on mobile) */}
            <div className="space-y-6">
                <ReferralCard />
                <LeaderboardCard />
                
                {/* Promo Card */}
                <Card className="bg-rebox-sand border-none">
                    <h3 className="font-bold mb-2">Did you know?</h3>
                    <p className="text-sm text-gray-600 mb-4">Recycling 1 ton of cardboard saves 17 trees and 7,000 gallons of water.</p>
                    <a href="#" className="text-sm font-bold text-rebox-green hover:underline">Read more</a>
                </Card>
            </div>
          </div>
      </div>
    </div>
  );
};