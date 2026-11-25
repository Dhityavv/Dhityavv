'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export function Toast() {
  const { toastMessage, showToast } = useModal();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        showToast('');
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, showToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[110] pointer-events-none"
        >
          <div className="surface-card flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-mono font-medium pointer-events-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
