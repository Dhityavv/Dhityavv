'use client';

import { useEffect } from 'react';

export function ScrollRestorationReset() {
  useEffect(() => {
    // Force manual scroll restoration so browsers do not restore scroll position on reload
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        // Strip the hash on initial load/reload so the browser does not jump mid-page
        window.history.replaceState(null, '', window.location.pathname);
      }
      // Force instant scroll to top on page mount
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Prior to reload or navigation, reset scroll position so browser records (0, 0)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
