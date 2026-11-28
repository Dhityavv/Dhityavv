'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SparkleNavTriggerProps {
  isExpanded: boolean;
  isHoverPending: boolean;
}

const STAR_PATH =
  'M12 1.2C12.7 9.5 14.5 11.3 22.8 12C14.5 12.7 12.7 14.5 12 22.8C11.3 14.5 9.5 12.7 1.2 12C9.5 11.3 11.3 9.5 12 1.2Z';

interface MiniStarConfig {
  id: string;
  x: number;
  y: number;
  size: number;
  filled: boolean;
  color: string;
  /** Outward direction vector (px) for idle breathing, hover push-away, and expand scatter */
  outX: number;
  outY: number;
  scatterRotate: number;
  idleDuration: number;
  idleDelay: number;
}

const MINI_STARS: MiniStarConfig[] = [
  // Top-left (outlined)
  {
    id: 'tl',
    x: 9,
    y: 9,
    size: 10.5,
    filled: false,
    color: '#a5b4fc',
    outX: -14,
    outY: -10,
    scatterRotate: -85,
    idleDuration: 3.1,
    idleDelay: 0.0,
  },
  // Top-right (filled)
  {
    id: 'tr',
    x: 31,
    y: 7.5,
    size: 6.5,
    filled: true,
    color: '#38bdf8',
    outX: 14,
    outY: -12,
    scatterRotate: 105,
    idleDuration: 2.7,
    idleDelay: 0.4,
  },
  // Mid-right (outlined)
  {
    id: 'mr',
    x: 37,
    y: 16,
    size: 8,
    filled: false,
    color: '#c4b5fd',
    outX: 18,
    outY: -2,
    scatterRotate: 70,
    idleDuration: 3.4,
    idleDelay: 0.8,
  },
  // Bottom-left (outlined)
  {
    id: 'bl',
    x: 6.5,
    y: 33,
    size: 8,
    filled: false,
    color: '#67e8f9',
    outX: -16,
    outY: 10,
    scatterRotate: -110,
    idleDuration: 3.0,
    idleDelay: 0.25,
  },
  // Bottom-mid-left (filled)
  {
    id: 'bml',
    x: 16,
    y: 32,
    size: 6,
    filled: true,
    color: '#818cf8',
    outX: -9,
    outY: 14,
    scatterRotate: -65,
    idleDuration: 2.5,
    idleDelay: 0.65,
  },
  // Bottom-right (filled)
  {
    id: 'br',
    x: 34,
    y: 32.5,
    size: 8,
    filled: true,
    color: '#34d399',
    outX: 16,
    outY: 12,
    scatterRotate: 120,
    idleDuration: 2.9,
    idleDelay: 0.15,
  },
];

export function SparkleNavTrigger({
  isExpanded,
  isHoverPending,
}: SparkleNavTriggerProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-11 h-11 flex items-center justify-center overflow-visible select-none"
    >
      {/* Central Large 4-Point Star: steady opacity (no blinking), gentle up-down float */}
      <motion.svg
        viewBox="0 0 24 24"
        className="relative z-10 w-7 h-7 drop-shadow-[0_0_10px_rgba(99,102,241,0.55)]"
        animate={
          isExpanded
            ? {
                y: 0,
                scale: 0.35,
                rotate: 90,
                opacity: 0,
              }
            : isHoverPending
            ? {
                y: -2,
                scale: 1.12,
                rotate: 15,
                opacity: 1,
              }
            : {
                y: [-2.4, 2.4, -2.4],
                scale: 1,
                rotate: [0, 4, 0, -4, 0],
                opacity: 1,
              }
        }
        transition={
          isExpanded
            ? { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
            : isHoverPending
            ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            : {
                y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
              }
        }
      >
        <defs>
          <linearGradient id="sparkleMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="48%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path d={STAR_PATH} fill="url(#sparkleMainGrad)" />
      </motion.svg>

      {/* Surrounding 6 Mini Stars:
          - Idle: gently drift outward & back (never inward into the center star) + soft rotation
          - Hover Pending (0.5s): clearly push outward away from the center star
          - Expanded: scatter outward into stardust and fade cleanly */}
      {MINI_STARS.map((star) => (
        <motion.svg
          key={star.id}
          viewBox="0 0 24 24"
          style={{
            width: star.size,
            height: star.size,
            left: star.x - star.size / 2,
            top: star.y - star.size / 2,
          }}
          className="absolute pointer-events-none drop-shadow-[0_0_5px_rgba(129,140,248,0.45)]"
          animate={
            isExpanded
              ? {
                  x: star.outX * 2.5,
                  y: star.outY * 2.5,
                  scale: 0.25,
                  rotate: star.scatterRotate,
                  opacity: 0,
                }
              : isHoverPending
              ? {
                  x: star.outX * 0.65,
                  y: star.outY * 0.65,
                  scale: 1.18,
                  rotate: star.scatterRotate * 0.35,
                  opacity: 1,
                }
              : {
                  x: [0, star.outX * 0.22, 0],
                  y: [0, star.outY * 0.22 - 1.2, 0],
                  scale: [0.95, 1.1, 0.95],
                  rotate: [0, 18, 0],
                  opacity: 0.92,
                }
          }
          transition={
            isExpanded
              ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              : isHoverPending
              ? { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              : {
                  x: { duration: star.idleDuration, delay: star.idleDelay, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: star.idleDuration, delay: star.idleDelay, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                  rotate: { duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                }
          }
        >
          <path
            d={STAR_PATH}
            fill={star.filled ? star.color : 'none'}
            stroke={star.filled ? 'none' : star.color}
            strokeWidth={star.filled ? 0 : 2.1}
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
