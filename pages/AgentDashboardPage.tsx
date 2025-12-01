import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/UI';
import { DollarSign, Clock, MapPinned, Shield, Truck } from 'lucide-react';

const quickStats = [
  { label: 'Active Route', value: 'Eco City Loop', meta: '3 stops remaining', icon: MapPinned },
  { label: 'Shift Earnings', value: '$142.50', meta: '+$12.75 today', icon: DollarSign },
  { label: 'On-Time Rate', value: '98%', meta: '12 day streak', icon: Clock },
];

const upcomingStops = [
  { id: 'JOB-8821', address: '123 Green Street', window: '10:30 - 10:45 AM', details: '~5 Boxes • Alex Johnson', status: 'En Route' },
  { id: 'JOB-8822', address: '88 Eco Lane', window: '11:00 - 11:20 AM', details: '~20 Boxes • Sarah Smith', status: 'Queued' },
  { id: 'JOB-8823', address: '452 Sustainable Blvd', window: '11:45 - 12:05 PM', details: '~3 Boxes • Mike Ross', status: 'Queued' },
];

const complianceItems = [
  { title: 'Vehicle Inspection', status: 'Complete', pill: 'Due in 5 days' },
  { title: 'ID Verification', status: 'Complete', pill: 'Updated Sep 18' },
  { title: 'Safety Refresher', status: 'Pending', pill: 'Start module', action: true },
];

export const AgentDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase text-gray-400 tracking-[0.2em] mb-2">Agent Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, John</h1>
            <p className="text-gray-400 mt-2">Review your route, compliance items, and shift performance.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => navigate('/login?type=agent')} className="bg-gray-100 text-gray-900">
              End Shift
            </Button>
            <Button onClick={() => navigate('/agent-demo')} className="bg-rebox-green text-gray-900 hover:bg-green-500">
              Resume Active Route
            </Button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-gray-900 text-white border-gray-800 shadow-lg">
                <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
                  <span className="text-gray-300"><Icon size={18} /></span>
                  {stat.label}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-gray-500">{stat.meta}</p>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gray-900 text-white border-gray-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Today&apos;s Route</p>
              <h2 className="text-2xl font-bold">Eco City Pickup Loop</h2>
            </div>
            <Button variant="ghost" className="text-rebox-green" onClick={() => navigate('/agent-demo')}>
              View Live Map
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingStops.map((stop) => (
              <div key={stop.id} className="bg-gray-800/60 rounded-2xl p-4 border border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Badge color="bg-blue-500/20 text-blue-300">{stop.id}</Badge>
                    <span>{stop.window}</span>
                  </div>
                  <div className="text-lg font-semibold">{stop.address}</div>
                  <p className="text-sm text-gray-400 mt-1">{stop.details}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    stop.status === 'En Route' ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/30 text-gray-200'
                  }`}>
                    {stop.status}
                  </span>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-200" onClick={() => navigate('/agent-demo')}>
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gray-900 text-white border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-rebox-green" />
              <div>
                <p className="text-xs font-semibold text-green-400 uppercase tracking-[0.3em]">Shift Health</p>
                <h3 className="text-xl font-bold">Performance Snapshot</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed Pickups</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Average Rating</p>
                  <p className="text-2xl font-bold">4.9 ★</p>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-rebox-green" style={{ width: '82%' }} />
              </div>
              <p className="text-xs text-gray-500">You&apos;re on track to beat last week&apos;s performance. Keep it up!</p>
            </div>
          </Card>

          <Card className="bg-gray-900 text-white border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-300" />
              <div>
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-[0.3em]">Compliance</p>
                <h3 className="text-xl font-bold">Account Checklist</h3>
              </div>
            </div>
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div key={item.title} className="bg-gray-800/40 rounded-2xl p-4 border border-gray-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{item.title}</p>
                    <p className="font-semibold">{item.status}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.pill}</span>
                    {item.action && (
                      <Button size="sm" variant="secondary" className="text-gray-900 bg-white/90" onClick={() => navigate('/agent-demo')}>
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
