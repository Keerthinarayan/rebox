export type Tier = 'Seed' | 'Sprout' | 'Bloom';

export interface User {
  id: string;
  name: string;
  greenPoints: number;
  tier: Tier;
  totalRecycled: number; // in kg
  boxesSaved: number;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  value: number; // Monetary value
  pointsCost: number;
  partnerLogo: string;
  expiryMonths: number;
  category: 'Food' | 'Shopping' | 'Donation';
}

export interface Transaction {
  id: string;
  date: string;
  type: 'EARN' | 'REDEEM';
  amount: number; // Points
  description: string;
}

export interface NavLink {
  label: string;
  path: string;
}