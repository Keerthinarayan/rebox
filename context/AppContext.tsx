import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Transaction, Voucher } from '../types';
import { MOCK_USER, RECENT_TRANSACTIONS } from '../constants';

interface AppContextType {
  user: User;
  transactions: Transaction[];
  redeemVoucher: (voucher: Voucher) => boolean;
  addPoints: (amount: number) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [isLoading, setIsLoading] = useState(false);

  const redeemVoucher = (voucher: Voucher): boolean => {
    if (user.greenPoints < voucher.pointsCost) return false;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        greenPoints: prev.greenPoints - voucher.pointsCost
      }));
      
      const newTx: Transaction = {
        id: `T${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'REDEEM',
        amount: -voucher.pointsCost,
        description: `Redeemed ${voucher.title}`
      };
      
      setTransactions(prev => [newTx, ...prev]);
      setIsLoading(false);
    }, 800);

    return true;
  };

  const addPoints = (amount: number) => {
    setUser(prev => ({
      ...prev,
      greenPoints: prev.greenPoints + amount,
      boxesSaved: prev.boxesSaved + (amount / 10), // Assuming 10 pts per box
      totalRecycled: prev.totalRecycled + (amount / 10 * 0.3) // Assuming 0.3kg per box
    }));
    
    const newTx: Transaction = {
      id: `T${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'EARN',
      amount: amount,
      description: 'Manual Demo Credit'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, transactions, redeemVoucher, addPoints, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};