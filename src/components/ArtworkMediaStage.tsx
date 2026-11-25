'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RenderItem } from '@/types/portfolio';

interface ArtworkMediaStageProps {
  artwork: RenderItem;
  selectedAngleIndex: number;
  title: string;
}

/**
 * Fixed-height, zero-layout-shift media viewer for 3D Showcase modals.
 * Keeps video & all angle images mounted with priority preloading so switching
 * between animation and render angles is instant, smooth, and glitch-free.
 */
export function ArtworkMediaStage({
  artwork,
  selectedAngleIndex,
  title,
}: ArtworkMediaStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(artwork.video);
  const isVideoActive = hasVideo && selectedAngleIndex === 0;

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isVideoActive) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isVideoActive]);

  const images = artwork.images && artwork.images.length > 0 ? artwork.images : [artwork.image];

  return (
    <div className="relative w-full h-[250px] sm:h-[360px] md:h-[400px] rounded-xl overflow-hidden bg-black/75 border border-token select-none">
      {/* Persistent Video Layer (never unmounted while modal is open -> 0 re-buffer glitch) */}
      {hasVideo && (
        <motion.div
          initial={false}
          animate={{
            opacity: isVideoActive ? 1 : 0,
            scale: isVideoActive ? 1 : 0.985,
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 flex items-center justify-center ${
            isVideoActive ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none'
          }`}
        >
          <video
            ref={videoRef}
            src={artwork.video}
            poster={artwork.image}
            preload="auto"
            autoPlay
            loop
            muted
            controls
            playsInline
            aria-label={title}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}

      {/* Preloaded Image Layers with Smooth Crossfade & Micro-Scale */}
      {images.map((imgUrl, idx) => {
        const targetIndex = hasVideo ? idx + 1 : idx;
        const isActive = selectedAngleIndex === targetIndex;

        return (
          <motion.div
            key={`${artwork.id}-${imgUrl}-${idx}`}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.985,
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 flex items-center justify-center p-1 ${
              isActive ? 'z-10 pointer-events-auto' : 'z-0 pointer-events-none'
            }`}
          >
            <Image
              src={imgUrl}
              alt={`${title} — ${idx + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
