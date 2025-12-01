import { User, Voucher, Transaction } from './types';

export const MOCK_USER: User = {
  id: 'USER_001',
  name: 'Alex Johnson',
  greenPoints: 420,
  tier: 'Sprout',
  totalRecycled: 12.5,
  boxesSaved: 42
};

export const TIERS = {
  Seed: { min: 0, max: 199, benefit: '1% chance at monthly surprise' },
  Sprout: { min: 200, max: 499, benefit: '5% extra voucher value' },
  Bloom: { min: 500, max: 10000, benefit: 'Priority pickup + Exclusive deals' }
};

export const VOUCHERS: Voucher[] = [
  {
    id: 'V50',
    title: '₹50 Off Food Order',
    description: 'Valid on orders above ₹200',
    value: 50,
    pointsCost: 300,
    partnerLogo: '🍔',
    expiryMonths: 3,
    category: 'Food'
  },
  {
    id: 'V150',
    title: '₹150 Shopping Voucher',
    description: 'Valid at partner eco-stores',
    value: 150,
    pointsCost: 800,
    partnerLogo: '🛍️',
    expiryMonths: 6,
    category: 'Shopping'
  },
  {
    id: 'D100',
    title: 'Plant a Tree',
    description: 'Donate points to plant 1 tree',
    value: 100,
    pointsCost: 500,
    partnerLogo: '🌳',
    expiryMonths: 12,
    category: 'Donation'
  }
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'T1', date: '2023-10-25', type: 'EARN', amount: 30, description: 'Recycled 3 boxes' },
  { id: 'T2', date: '2023-10-20', type: 'EARN', amount: 10, description: 'Recycled 1 box' },
  { id: 'T3', date: '2023-10-15', type: 'REDEEM', amount: -300, description: 'Redeemed ₹50 Voucher' },
];