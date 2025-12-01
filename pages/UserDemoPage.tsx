import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Check, Calendar, Plus, Home, Briefcase, ChevronRight } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { useApp } from '../context/AppContext';

export const SchedulePickupView: React.FC = () => {
  const [step, setStep] = useState(1);
  const { addPoints } = useApp();
  const [quantity, setQuantity] = useState(5);
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = [
    { day: 'Mon', date: '12' },
    { day: 'Tue', date: '13' },
    { day: 'Wed', date: '14' },
    { day: 'Thu', date: '15' },
    { day: 'Fri', date: '16' },
  ];

  const handleSchedule = () => {
    setStep(3);
    // Simulate earning points after a "pickup" logic (simplified for demo)
    setTimeout(() => {
        addPoints(quantity * 10);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="overflow-hidden shadow-xl border-0 bg-white">
        {/* Header Progress */}
        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex justify-between items-center">
            <h2 className="font-heading font-bold text-lg text-gray-700">New Pickup</h2>
            <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                    <div 
                        key={i} 
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= i ? 'bg-rebox-green' : 'bg-gray-300'}`} 
                    />
                ))}
            </div>
        </div>

        <div className="p-6 md:p-8 min-h-[400px]">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              
              {/* Item Selection */}
              <div>
                <h3 className="font-bold text-xl mb-4">What are you recycling?</h3>
                <div 
                    className="border-2 border-rebox-green bg-green-50/30 p-5 rounded-2xl flex items-center gap-4 cursor-pointer relative overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="absolute top-0 right-0 bg-rebox-green text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
                      Recommended
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-rebox-green">
                      <Package size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-rebox-dark">Cardboard Boxes</div>
                    <div className="text-sm text-gray-500">Flattened, tape removed if possible</div>
                  </div>
                </div>
              </div>

              {/* Quantity Slider */}
              <div>
                  <div className="flex justify-between items-end mb-4">
                      <label className="font-bold text-gray-700">Quantity</label>
                      <span className="text-3xl font-heading font-bold text-rebox-dark">{quantity} <span className="text-sm text-gray-400 font-normal">boxes</span></span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rebox-green"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                      <span>1 Box</span>
                      <span>50 Boxes</span>
                  </div>
              </div>

              {/* Estimate Card */}
              <div className="bg-rebox-dark text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
                  <div>
                      <div className="text-gray-400 text-sm font-medium mb-1">Estimated Earnings</div>
                      <div className="text-3xl font-heading font-bold text-rebox-green">+{quantity * 10} GP</div>
                  </div>
                  <Button onClick={() => setStep(2)} className="bg-white text-rebox-dark hover:bg-gray-100 border-none">
                      Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
              </div>

            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              
              {/* Address Selection */}
              <div>
                <h3 className="font-bold text-xl mb-4">Pickup Location</h3>
                <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border-2 border-rebox-green bg-green-50/20 rounded-xl cursor-pointer">
                        <input type="radio" name="address" defaultChecked className="w-5 h-5 text-rebox-green accent-rebox-green" />
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm border border-gray-100">
                            <Home size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-gray-800">Home</div>
                            <div className="text-sm text-gray-500">123 Green Street, Eco City</div>
                        </div>
                    </label>
                    
                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="radio" name="address" className="w-5 h-5 text-rebox-green accent-rebox-green" />
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm border border-gray-100">
                            <Briefcase size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-gray-800">Office</div>
                            <div className="text-sm text-gray-500">Tech Park, Building 4</div>
                        </div>
                    </label>

                     <button className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2">
                        <Plus size={18} /> Add New Address
                    </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-bold text-xl mb-4">Select Date</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {dates.map((d, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedDate(idx)}
                            className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border-2 transition-all ${
                                selectedDate === idx 
                                ? 'border-rebox-green bg-rebox-green text-white shadow-md' 
                                : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300'
                            }`}
                        >
                            <span className="text-xs font-medium uppercase mb-1">{d.day}</span>
                            <span className="text-xl font-bold">{d.date}</span>
                        </button>
                    ))}
                </div>
              </div>
              
              {/* Instructions */}
              <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Instructions for Agent (Optional)</label>
                   <textarea 
                    placeholder="Gate code, specific door, etc."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rebox-green/50 text-sm"
                    rows={2}
                   />
              </div>

              <div className="flex gap-4 pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={handleSchedule} className="flex-[2]">Confirm Pickup</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 text-rebox-green rounded-full flex items-center justify-center mx-auto mb-6 relative">
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-green-400 rounded-full opacity-20"
                 />
                <Check className="w-12 h-12 relative z-10" />
              </div>
              <h3 className="font-heading font-bold text-3xl mb-3 text-rebox-dark">Pickup Scheduled!</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Agent <span className="font-bold text-gray-800">John</span> has been assigned. He will arrive between <span className="font-bold text-gray-800">5:00 PM - 7:00 PM</span>.
              </p>
              
              <div className="bg-rebox-sand p-6 rounded-2xl mb-8 max-w-sm mx-auto border border-rebox-green/20">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Potential Earnings</div>
                <div className="text-4xl font-heading font-bold text-rebox-green">+{quantity * 10} GP</div>
              </div>

              <div className="flex gap-3 justify-center">
                 <Button onClick={() => setStep(1)} variant="outline">Schedule Another</Button>
                 <Button onClick={() => window.location.href='/user-dashboard'} >Go to Dashboard</Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Default export for routing
export const UserDemoPage = () => <div className="py-12 px-4"><SchedulePickupView /></div>;