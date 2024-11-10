import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface UpgradePrompt {
  id: string;
  title: string;
  description: string;
  features: string[];
  threshold: number;
  type: 'usage' | 'feature' | 'team';
}

const upgradePrompts: UpgradePrompt[] = [
  {
    id: 'documents-limit',
    title: 'Unlock Unlimited Documents',
    description: 'You\'re approaching your monthly document limit',
    features: [
      'Generate unlimited documents',
      'Access premium templates',
      'Priority support'
    ],
    threshold: 0.8,
    type: 'usage'
  },
  {
    id: 'team-collaboration',
    title: 'Enable Team Collaboration',
    description: 'Upgrade to collaborate with your team',
    features: [
      'Real-time collaboration',
      'Document sharing',
      'Team permissions'
    ],
    threshold: 2,
    type: 'team'
  }
];

export function useUpgradePrompts() {
  const [activePrompts, setActivePrompts] = useState<UpgradePrompt[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Logic to determine which prompts to show based on usage, features, etc.
    const relevantPrompts = upgradePrompts.filter(prompt => {
      if (prompt.type === 'usage') {
        // Check usage thresholds
        return true; // Simplified for demo
      }
      if (prompt.type === 'team') {
        // Check team-related triggers
        return false; // Simplified for demo
      }
      return false;
    });

    setActivePrompts(relevantPrompts);
  }, [user]);

  return {
    activePrompts,
    dismissPrompt: (id: string) => {
      setActivePrompts(current => current.filter(prompt => prompt.id !== id));
    }
  };
}