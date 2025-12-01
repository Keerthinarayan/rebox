import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Navigation, Phone, 
  MessageSquare, Menu, X, ScanLine, RotateCcw, LogOut, 
  Settings, User, Bell, List, Map as MapIcon, Clock, ChevronRight,
  Shield, Truck, CheckSquare, Coffee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/UI';

// --- Components for Agent View ---

const MapBackground = () => (
  <div className="absolute inset-0 bg-gray-900 z-0 overflow-hidden">
    {/* Dark Map Base */}
    <div className="absolute inset-0 bg-[#111827]" />
    
    <svg className="w-full h-full absolute inset-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Mock Streets */}
      <path d="M 100 0 V 800" stroke="#4B5563" strokeWidth="12" fill="none" />
      <path d="M 0 300 H 800" stroke="#4B5563" strokeWidth="12" fill="none" />
      <path d="M 250 0 L 400 800" stroke="#4B5563" strokeWidth="8" fill="none" />
      <path d="M 600 0 V 800" stroke="#4B5563" strokeWidth="6" fill="none" />
      <path d="M 0 550 H 800" stroke="#4B5563" strokeWidth="6" fill="none" />
      
      {/* Route Line */}
      <path d="M 100 800 L 100 300 L 400 150" stroke="#0BB07C" strokeWidth="4" strokeDasharray="8 4" fill="none" className="animate-pulse" />
      
      {/* Current Location Pin */}
      <circle cx="200" cy="500" r="12" fill="#3B82F6" className="animate-ping opacity-75" />
      <circle cx="200" cy="500" r="6" fill="#3B82F6" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

const CameraModal = ({ onClose, onScan }: { onClose: () => void, onScan: () => void }) => {
  const [scanning, setScanning] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not supported in this browser.');
      return;
    }

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
          setCameraReady(true);
        }
      } catch (error) {
        console.error('Camera error', error);
        setCameraError('Unable to access camera. Please allow camera permissions.');
      }
    };

    initCamera();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
    };
  }, []);

  const handleCapture = () => {
    if (scanning) return;
    setScanning(true);
    scanTimeout.current = setTimeout(() => {
      onScan();
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onClose} className="p-2 bg-black/50 rounded-full text-white backdrop-blur-sm">
          <X />
        </button>
        <span className="text-white font-bold tracking-wide">SCAN PACKAGES</span>
        <div className="w-10" />
      </div>
      
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-gray-900">
        {/* Camera Feed */}
        <video 
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${cameraReady ? 'opacity-80' : 'opacity-20'}`}
            autoPlay
            playsInline
            muted
        />
        {!cameraReady && (
          <img 
            src="https://images.unsplash.com/photo-1595303526913-c7037797ebe7?auto=format&fit=crop&q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover opacity-40" 
            alt="Camera placeholder"
          />
        )}
        
        {/* Scanner Overlay */}
        <div className="relative w-72 h-72 border-2 border-white/30 rounded-3xl z-20 overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-rebox-green rounded-tl-xl -mt-1 -ml-1" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-rebox-green rounded-tr-xl -mt-1 -mr-1" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-rebox-green rounded-bl-xl -mb-1 -ml-1" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-rebox-green rounded-br-xl -mb-1 -mr-1" />
            
            {scanning && (
                <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-rebox-green shadow-[0_0_40px_rgba(11,176,124,1)]"
                />
            )}
        </div>
        <div className="absolute bottom-32 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-medium">
          {cameraError ? cameraError : cameraReady ? 'Point camera at box QR code' : 'Starting camera...'}
        </div>
      </div>

      <div className="p-8 bg-black flex justify-center gap-12 items-center">
          <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"><RotateCcw size={20} /></button>
          <button 
            className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center hover:border-white transition-colors"
          onClick={handleCapture}
          >
              <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </button>
          <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"><ScanLine size={20} /></button>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-[#111827] z-50 flex flex-col border-r border-gray-800 shadow-2xl"
        >
          {/* User Profile Header */}
          <div className="p-6 border-b border-gray-800 bg-[#0f1522]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-rebox-green to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                JD
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">John Doe</h3>
                <div className="flex items-center gap-1.5">
                   <Badge color="bg-green-500/20 text-green-400 border border-green-500/20">Verified Agent</Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
                <div className="text-center">
                    <div className="text-gray-400 text-xs uppercase font-bold">Rating</div>
                    <div className="text-white font-bold">4.9 ★</div>
                </div>
                <div className="w-px bg-gray-700"></div>
                <div className="text-center">
                    <div className="text-gray-400 text-xs uppercase font-bold">Deliveries</div>
                    <div className="text-white font-bold">1,240</div>
                </div>
                <div className="w-px bg-gray-700"></div>
                <div className="text-center">
                    <div className="text-gray-400 text-xs uppercase font-bold">Level</div>
                    <div className="text-rebox-green font-bold">Pro</div>
                </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
             <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
                <User size={20} /> My Profile
             </button>
             <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
                <Clock size={20} /> Shift History
             </button>
             <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
                <Truck size={20} /> Vehicle Inspection
             </button>
             <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
                <Shield size={20} /> Compliance Center
             </button>
             <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
                <Settings size={20} /> Settings
             </button>
          </div>

          {/* Logout Footer */}
          <div className="p-6 border-t border-gray-800 bg-[#0f1522]">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-colors font-semibold"
            >
                <LogOut size={20} /> End Shift & Logout
            </button>
            <div className="text-center text-xs text-gray-600 mt-4">v2.4.0 • Rebox Partner App</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const TaskList = ({ tasks }: { tasks: any[] }) => (
    <div className="flex-1 overflow-y-auto pb-32 p-4 space-y-4 bg-gray-900">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Upcoming Stops ({tasks.length})</h3>
        {tasks.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-gray-500">
             <CheckSquare className="w-12 h-12 mb-4 opacity-50" />
             <p>No more tasks today!</p>
           </div>
        ) : (
          tasks.map((task, idx) => (
            <div key={task.id} className={`bg-gray-800 rounded-xl p-4 flex gap-4 ${idx === 0 ? 'border border-rebox-green shadow-lg shadow-rebox-green/10' : 'border border-gray-700 opacity-70'}`}>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-400">{task.time}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-rebox-green text-white' : 'bg-gray-700 text-gray-400'}`}>
                        {idx + 1}
                    </div>
                    {idx !== tasks.length - 1 && <div className="w-0.5 h-full bg-gray-700 mt-1" />}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white">{task.address}</h4>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{task.dist}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{task.details}</p>
                    {idx === 0 && (
                        <div className="mt-3 flex gap-2">
                            <span className="text-xs bg-rebox-green/20 text-rebox-green px-2 py-1 rounded">Current Target</span>
                        </div>
                    )}
                </div>
            </div>
          ))
        )}
    </div>
);

export const AgentDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'COMPLETED'>('IDLE');
  const [earnings, setEarnings] = useState(45.50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('MAP');
  const [time, setTime] = useState(new Date());

  // Task Queue State
  const [tasks, setTasks] = useState([
    { id: 'JOB-8821', time: '10:30', address: '123 Green Street', details: 'Apt 4B • ~5 Boxes', dist: '0.2 mi', contact: 'Alex Johnson' },
    { id: 'JOB-8822', time: '10:45', address: '88 Eco Lane', details: 'Office • ~20 Boxes', dist: '1.4 mi', contact: 'Sarah Smith' },
    { id: 'JOB-8823', time: '11:10', address: '452 Sustainable Blvd', details: 'House • ~3 Boxes', dist: '3.1 mi', contact: 'Mike Ross' },
  ]);

  const currentJob = tasks[0];

  // Clock simulation
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate('/login?type=agent');
  };

  const handleScanComplete = () => {
      setStatus('COMPLETED');
      setEarnings(prev => prev + 2.50);
      setTasks(prev => prev.length > 0 ? prev.slice(1) : prev);
  };

  const resetJob = () => {
      setStatus('IDLE');
  };

  const goToAgentDashboard = () => {
    setStatus('IDLE');
    navigate('/agent-dashboard');
  };

    useEffect(() => {
      if (status !== 'COMPLETED') return;
      const timer = setTimeout(() => setStatus('IDLE'), 2200);
      return () => clearTimeout(timer);
    }, [status]);

  return (
    <div className="h-screen w-full bg-gray-900 text-white relative flex flex-col font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onLogout={handleLogout} />

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent p-4 z-30 pt-safe-top">
        <div className="flex justify-between items-center">
            <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors shadow-lg"
            >
                <Menu size={20} />
            </button>

            <div className="bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-3 border border-gray-700 shadow-lg">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-gray-300 tracking-wider">ON SHIFT</span>
                </div>
                <div className="w-px bg-gray-600 h-3" />
                <span className="text-sm font-mono font-bold">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>

            <div className="flex gap-3">
                 <button 
                    onClick={() => setViewMode(viewMode === 'MAP' ? 'LIST' : 'MAP')}
                    className="w-10 h-10 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors shadow-lg"
                 >
                    {viewMode === 'MAP' ? <List size={20} /> : <MapIcon size={20} />}
                 </button>
                 <div className="relative">
                    <button className="w-10 h-10 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors shadow-lg">
                        <Bell size={20} />
                    </button>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900" />
                 </div>
            </div>
        </div>

        {/* Earnings Pill (Floating below header) */}
        <div className="flex justify-center mt-4">
             <div className="bg-rebox-green/90 backdrop-blur text-white px-6 py-2 rounded-full shadow-lg shadow-rebox-green/20 flex items-center gap-2 border border-white/10">
                <span className="text-xs font-medium uppercase opacity-90">Session Earnings</span>
                <span className="font-bold text-lg">${earnings.toFixed(2)}</span>
             </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-gray-900">
        {viewMode === 'MAP' ? <MapBackground /> : <TaskList tasks={tasks} />}
        
        {/* Bottom Sheet Action Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30 pb-6 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent pt-12">
            <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {currentJob ? (
                         /* Next Job Card */
                        <Card className="bg-[#1f2937] border-gray-700 text-white shadow-2xl overflow-hidden ring-1 ring-white/10">
                            {/* Progress Bar */}
                            <div className="h-1 bg-gray-700 w-full">
                                <div className="h-full bg-rebox-green w-1/3" />
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge color="bg-blue-500/20 text-blue-400 border border-blue-500/30">Pickup</Badge>
                                            <span className="text-xs text-gray-400 font-mono">#{currentJob.id}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white leading-tight">{currentJob.address}</h2>
                                        <p className="text-gray-400 text-sm mt-1">Eco City • {currentJob.dist}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                        <Navigation className="text-rebox-green w-6 h-6" />
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                        <div className="text-xs text-gray-500 mb-1">Contact</div>
                                        <div className="font-bold text-sm">{currentJob.contact}</div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                        <div className="text-xs text-gray-500 mb-1">Details</div>
                                        <div className="font-bold text-sm">{currentJob.details.split('•')[1] || 'Standard'}</div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                        <Phone size={18} /> Call
                                    </button>
                                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                        <MessageSquare size={18} /> Message
                                    </button>
                                </div>

                                {/* Main Action */}
                                <Button 
                                    className="w-full bg-rebox-green hover:bg-green-600 text-white py-4 text-lg font-bold shadow-lg shadow-rebox-green/20 rounded-xl"
                                    onClick={() => setStatus('SCANNING')}
                                >
                                    <ScanLine className="w-5 h-5 mr-2" /> Arrived & Scan
                                </Button>
                            </div>
                        </Card>
                        ) : (
                          /* All Caught Up Card */
                          <Card className="bg-[#1f2937] border-gray-700 text-white shadow-2xl p-8 text-center">
                             <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                               <Coffee className="w-8 h-8 text-yellow-400" />
                             </div>
                             <h2 className="text-2xl font-bold mb-2">All Caught Up!</h2>
                             <p className="text-gray-400 mb-6">You've completed all scheduled pickups for this route.</p>
                             <Button variant="secondary" className="w-full" onClick={handleLogout}>Back to Dashboard</Button>
                          </Card>
                        )}
                    </motion.div>
                )}

                {status === 'COMPLETED' && (
                     <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1f2937] rounded-2xl p-8 text-center shadow-2xl border border-gray-700 relative overflow-hidden"
                     >
                        <div className="absolute inset-0 bg-rebox-green/5" />
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-gradient-to-tr from-rebox-green to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rebox-green/30">
                                <CheckSquare className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-white">Success!</h2>
                            <p className="text-gray-400 mb-8">Packages verified. Wallet updated.</p>
                            
                            <div className="flex flex-col gap-3">
                                <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 font-bold py-4" onClick={resetJob}>
                                    Find Next Job <ChevronRight className="w-5 h-5 ml-1" />
                                </Button>
                                <button onClick={goToAgentDashboard} className="text-gray-500 text-sm font-medium py-2 hover:text-white transition-colors">
                                    Take a Break
                                </button>
                            </div>
                        </div>
                     </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Camera Modal Overlay */}
      {status === 'SCANNING' && (
        <CameraModal 
            onClose={() => setStatus('IDLE')} 
            onScan={handleScanComplete}
        />
      )}

    </div>
  );
};