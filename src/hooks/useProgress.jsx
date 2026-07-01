import { useContext } from 'react';
import { DSAProgressContext } from '../contexts/DSAProgressContext';

export const useProgress = () => {
  const context = useContext(DSAProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a DSAProgressProvider');
  }
  return context;
};