'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';

/**
 * Lightweight, privacy-friendly page view tracker.
 * Logs one view per (sessionStorage, path) for public pages, skipping /author-studio.
 */
export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/author-studio')) return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      let sessionId = sessionStorage.getItem('dhitya_session_id');
      if (!sessionId) {
        sessionId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        sessionStorage.setItem('dhitya_session_id', sessionId);
      }

      const dedupeKey = `dhitya_viewed_${pathname}`;
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, '1');

      const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';
      const referrer = document.referrer ? document.referrer.slice(0, 200) : null;

      supabase
        .from('page_views')
        .insert({
          path: pathname,
          session_id: sessionId,
          device_type: deviceType,
          referrer,
        })
        .then(() => {});
    } catch {
      // Ignore storage/network errors silently so visitors are never affected
    }
  }, [pathname]);

  return null;
}
