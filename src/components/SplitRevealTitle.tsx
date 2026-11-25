'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  wordClassName?: string;
}

/**
 * GSAP + ScrollTrigger word-by-word masked reveal heading.
 * Automatically respects prefers-reduced-motion and re-runs cleanly on language switches.
 */
export function SplitRevealTitle({
  text,
  as: Tag = 'h2',
  className = '',
  wordClassName = '',
}: SplitRevealTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.split-word');
    if (!words.length) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        normal: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduceMotion } = context.conditions || {};
        if (reduceMotion) {
          gsap.set(words, { yPercent: 0, opacity: 1 });
          return;
        }

        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.065,
            clearProps: 'transform,willChange',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, [text]);

  const wordList = text.trim().split(/\s+/);

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {wordList.map((word, idx) => (
        <React.Fragment key={`${word}-${idx}`}>
          <span className="inline-block overflow-hidden align-bottom py-0.5 -my-0.5">
            <span className={`split-word inline-block will-change-transform ${wordClassName}`}>
              {word}
            </span>
          </span>
          {idx < wordList.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}
