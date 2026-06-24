'use client';

// components/leads/LeadModalContext.tsx
// Provides openLead() to any component — no prop drilling needed.

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { LeadModalConfig } from '@/lib/leads/types';

type LeadModalContextValue = {
  config: LeadModalConfig | null;
  isOpen: boolean;
  openLead: (
    action: LeadModalConfig['action'],
    courseSlug?: string,
    courseTitle?: string,
    eventTitle?: string
  ) => void;
  closeLead: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<LeadModalConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openLead = useCallback(
    (
      action: LeadModalConfig['action'],
      courseSlug?: string,
      courseTitle?: string,
      eventTitle?: string
    ) => {
      setConfig({ action, courseSlug, courseTitle, eventTitle });
      setIsOpen(true);
    },
    []
  );

  const closeLead = useCallback(() => {
    setIsOpen(false);
    // small delay so exit animation plays before clearing config
    setTimeout(() => setConfig(null), 300);
  }, []);

  return (
    <LeadModalContext.Provider value={{ config, isOpen, openLead, closeLead }}>
      {children}
    </LeadModalContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx)
    throw new Error('useLeadModal must be used inside LeadModalProvider');
  return ctx;
}
