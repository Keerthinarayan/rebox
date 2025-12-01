import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, History } from 'lucide-react';
import { Card, Button, Badge, Modal } from '../components/UI';
import { useApp } from '../context/AppContext';
import { TIERS, VOUCHERS } from '../constants';
import { Voucher } from '../types';

const CircularProgress = ({ value, max }: { value: number, max: number }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#0BB07C"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-heading font-bold text-3xl text-rebox-dark">{value}</span>
        <span className="text-xs text-gray-500 uppercase font-semibold">Points</span>
      </div>
    </div>
  );
};

export const RewardsView: React.FC = () => {
  const { user, transactions, redeemVoucher, isLoading } = useApp();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const nextTierPoints = user.tier === 'Seed' ? 200 : user.tier === 'Sprout' ? 500 : 1000;

  const handleRedeem = () => {
    if (selectedVoucher) {
      const success = redeemVoucher(selectedVoucher);
      if (success) {
        setSelectedVoucher(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Status */}
        <div className="space-y-8">
          <Card className="flex flex-col items-center text-center p-8 bg-white shadow-lg shadow-rebox-green/5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Current Balance</h3>
            <CircularProgress value={user.greenPoints} max={nextTierPoints} />
            
            <div className="mt-8 w-full">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-rebox-dark">{user.tier} Tier</span>
                <span className="text-xs text-gray-500">{user.greenPoints} / {nextTierPoints} pts to level up</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-brand-gradient h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((user.greenPoints / nextTierPoints) * 100, 100)}%` }} 
                />
              </div>
            </div>
            <div className="mt-4 p-3 bg-rebox-sand rounded-lg text-sm text-gray-600 w-full text-left">
              <span className="font-bold text-rebox-green">Next benefit:</span> {TIERS[user.tier === 'Seed' ? 'Sprout' : 'Bloom'].benefit}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {transactions.slice(0, 4).map(tx => (
                <div key={tx.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                  <span className={`font-bold text-sm ${tx.type === 'EARN' ? 'text-rebox-green' : 'text-orange-500'}`}>
                    {tx.type === 'EARN' ? '+' : ''}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Vouchers */}
        <div className="lg:col-span-2">
           <div className="flex items-center justify-between mb-6">
             <h2 className="font-heading font-bold text-2xl flex items-center gap-2">
               <Gift className="w-6 h-6 text-rebox-green" /> Voucher Catalog
             </h2>
             <div className="flex gap-2">
               <Badge color="bg-gray-100 text-gray-600">Food</Badge>
               <Badge color="bg-gray-100 text-gray-600">Shopping</Badge>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
             {VOUCHERS.map((voucher) => (
               <motion.div 
                 key={voucher.id}
                 whileHover={{ y: -4 }}
                 transition={{ duration: 0.2 }}
               >
                 <Card className="h-full flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <div className="text-4xl">{voucher.partnerLogo}</div>
                       <Badge>{voucher.category}</Badge>
                     </div>
                     <h3 className="font-bold text-xl text-rebox-dark mb-1">{voucher.title}</h3>
                     <p className="text-sm text-gray-500 mb-4">{voucher.description}</p>
                   </div>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                     <span className="font-bold text-rebox-green text-lg">{voucher.pointsCost} pts</span>
                     <Button 
                       size="sm" 
                       variant={user.greenPoints >= voucher.pointsCost ? 'primary' : 'secondary'}
                       disabled={user.greenPoints < voucher.pointsCost}
                       onClick={() => setSelectedVoucher(voucher)}
                     >
                       Redeem
                     </Button>
                   </div>
                 </Card>
               </motion.div>
             ))}
             
             {/* Locked/Future items placeholder */}
             <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
               <Trophy className="w-8 h-8 text-gray-300 mb-2" />
               <p className="font-bold text-gray-400">More rewards coming soon</p>
               <p className="text-xs text-gray-400">Unlock Bloom tier for exclusive partner deals</p>
             </div>
           </div>
        </div>
      </div>

      {/* Redemption Modal */}
      <Modal 
        isOpen={!!selectedVoucher} 
        onClose={() => setSelectedVoucher(null)} 
        title="Confirm Redemption"
      >
        {selectedVoucher && (
          <div className="text-center">
            <div className="w-20 h-20 bg-rebox-sand rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              {selectedVoucher.partnerLogo}
            </div>
            <h4 className="font-bold text-xl mb-2">You are redeeming {selectedVoucher.title}</h4>
            <p className="text-gray-500 mb-8">This will deduct <span className="font-bold text-rebox-dark">{selectedVoucher.pointsCost} points</span> from your balance.</p>
            
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={() => setSelectedVoucher(null)}>Cancel</Button>
              <Button onClick={handleRedeem} loading={isLoading}>Confirm & Redeem</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Default export for routing if needed (wrapping the view)
export const RewardsPage = () => <div className="py-12 px-4"><RewardsView /></div>;