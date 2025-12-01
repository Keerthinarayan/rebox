import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MapPin, Recycle, Coins, Clock, Check, Truck } from 'lucide-react';
import { Card } from '../components/UI';

const Step = ({ number, title, description, icon: Icon, delay, visual }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex gap-6 md:gap-10"
  >
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-rebox-dark text-white flex items-center justify-center font-heading font-bold text-xl md:text-2xl shadow-lg z-10 shrink-0">
        {number}
      </div>
      {number !== 4 && <div className="w-0.5 h-full bg-gray-200 my-4" />}
    </div>
    <div className="pb-16 flex-1">
      <Card className="p-6 md:p-8 bg-white/60 backdrop-blur-sm border-white/50 h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading font-bold text-2xl text-rebox-dark">{title}</h3>
          <div className="p-3 bg-rebox-sand rounded-xl text-rebox-green">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        
        {/* Interactive / Visual Element for Step */}
        <div className="mt-auto">
          {visual}
        </div>
      </Card>
    </div>
  </motion.div>
);

const PhoneMock = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 flex justify-center">
      <div className="w-48 bg-white rounded-2xl border-4 border-gray-800 p-3 shadow-xl">
        <div className="h-1 w-10 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="space-y-3">
          <div className="h-2 bg-gray-100 rounded w-3/4" />
          <div className="h-20 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-2 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-green-50 transition-colors" onClick={() => setChecked(!checked)}>
            <div className={`w-5 h-5 rounded border flex items-center justify-center mb-1 transition-colors ${checked ? 'bg-rebox-green border-rebox-green' : 'border-gray-300'}`}>
              {checked && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-[10px] text-gray-500 leading-tight">Opt-in for<br/>Box Pickup</span>
          </div>
          <div className="h-8 bg-rebox-dark rounded w-full mt-2" />
        </div>
      </div>
    </div>
  );
};

const InteractiveSlider = () => {
  const [minutes, setMinutes] = useState(15);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Pickup Window
        </span>
        <span className="text-sm font-bold text-rebox-green">± {minutes} mins</span>
      </div>
      <input 
        type="range" 
        min="5" 
        max="60" 
        value={minutes} 
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-rebox-green"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Strict</span>
        <span>Flexible</span>
      </div>
    </div>
  )
};

const MapMock = () => {
  return (
    <div className="bg-gray-100 rounded-xl h-32 relative overflow-hidden border border-gray-200 group">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      
      {/* Path Animation */}
      <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none">
        <path d="M 20 60 Q 60 20 100 60 T 180 60" fill="none" stroke="#0BB07C" strokeWidth="3" strokeDasharray="4 4" className="opacity-50" />
        <motion.circle 
          cx="0" cy="0" r="4" fill="#0BB07C"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: 'path("M 20 60 Q 60 20 100 60 T 180 60")' }}
        />
      </svg>

      {/* Pins */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-rebox-dark z-10 relative">
          <Truck className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="w-8 h-8 bg-rebox-dark rounded-full shadow-md flex items-center justify-center text-white z-10 relative">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="absolute inset-0 bg-rebox-green rounded-full animate-ping opacity-20"></div>
      </div>
    </div>
  )
}

const CO2Calculator = () => {
  const [boxes, setBoxes] = useState(10);
  const co2PerBox = 0.15; // kg roughly
  
  return (
    <div className="bg-rebox-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rebox-green opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading font-bold text-3xl mb-4">See your impact</h2>
          <p className="text-gray-400 mb-8">Estimate how much CO₂ you save by recycling boxes instead of discarding them.</p>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Number of boxes</label>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={boxes} 
                onChange={(e) => setBoxes(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold w-32 focus:ring-2 focus:ring-rebox-green focus:outline-none transition-all"
              />
              <span className="text-xl text-gray-500">boxes</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-md border border-white/10">
          <div className="text-sm text-gray-300 uppercase tracking-wider mb-2">CO₂ Emissions Prevented</div>
          <div className="font-heading font-extrabold text-6xl text-rebox-green mb-2">
            {(boxes * co2PerBox).toFixed(1)}
            <span className="text-2xl text-white ml-2">kg</span>
          </div>
          <p className="text-xs text-gray-500">Based on industry standard lifecycle analysis.</p>
        </div>
      </div>
    </div>
  )
}

export const HowItWorksSection: React.FC = () => {
  return (
    <div id="how-it-works" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-rebox-dark">Simple. Safe. Rewarding.</h1>
        <p className="text-xl text-gray-600">The easiest way to clean up your home and help the planet.</p>
      </div>

      <div className="space-y-4">
        <Step 
          number={1} 
          title="Opt-in at checkout" 
          description="When ordering from partner apps, simply check the 'Recycle Boxes' box. We'll notify the delivery agent."
          icon={Smartphone}
          delay={0.1}
          visual={<PhoneMock />}
        />
        <Step 
          number={2} 
          title="Schedule or Handover" 
          description="If you have boxes now, hand them to the agent arriving. Or schedule a specific pickup slot via Rebox."
          icon={Clock}
          delay={0.2}
          visual={<InteractiveSlider />}
        />
        <Step 
          number={3} 
          title="Agent Collects" 
          description="Our agent scans the boxes and confirms collection. You receive a digital receipt instantly."
          icon={MapPin}
          delay={0.3}
          visual={<MapMock />}
        />
        <Step 
          number={4} 
          title="Earn Green Points" 
          description="Points are credited to your wallet. Redeem them for discounts, vouchers, or charitable donations."
          icon={Coins}
          delay={0.4}
          visual={
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 h-32 flex flex-col items-center justify-center text-rebox-green">
              <Coins className="w-8 h-8 mb-2 animate-bounce" />
              <span className="font-bold text-lg">+10 GP</span>
            </div>
          }
        />
      </div>

      <div className="mt-20">
        <CO2Calculator />
      </div>
    </div>
  );
};