'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '@/components/shared/motion';

const SWATCHES = [
  { hex: '#ef4444', label: 'Red' },
  { hex: '#f97316', label: 'Orange' },
  { hex: '#eab308', label: 'Yellow' },
  { hex: '#84cc16', label: 'Lime' },
  { hex: '#22c55e', label: 'Green' },
  { hex: '#14b8a6', label: 'Teal' },
  { hex: '#3b82f6', label: 'Blue' },
  { hex: '#a855f7', label: 'Purple' },
  { hex: '#ec4899', label: 'Pink' }
];

export default function NotFound() {
  const isReduced = useReducedMotion();

  return (
    <main
      id="main-content"
      aria-labelledby="error-heading"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-stone-50 px-4 py-16 dark:bg-stone-950"
    >
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl dark:bg-yellow-500/10" />
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-green-400/20 blur-3xl dark:bg-green-500/10" />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/5" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        {/* 404 — decorative, screen-reader gets the h1 below */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          aria-hidden="true"
          className="select-none"
        >
          <span className="font-kablammo text-[clamp(5rem,20vw,15rem)] leading-none tracking-tight">
            <span className="text-yellow-500">4</span>
            {/* Rainbow "0" — conic gradient text */}
            <span
              style={{
                backgroundImage:
                  'conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #14b8a6, #3b82f6, #a855f7, #ec4899, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              0
            </span>
            <span className="text-green-500">4</span>
          </span>
        </motion.div>

        {/* Floating color swatches */}
        <div
          aria-hidden="true"
          className="flex flex-wrap items-end justify-center gap-2"
        >
          {SWATCHES.map((swatch, i) => (
            <motion.span
              key={swatch.hex}
              initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
              animate={
                isReduced
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      y: [0, -6, 0]
                    }
              }
              transition={{
                opacity: { duration: 0.3, delay: 0.15 + i * 0.06 },
                scale: { type: 'spring', stiffness: 320, damping: 16, delay: 0.15 + i * 0.06 },
                rotate: { duration: 0.35, delay: 0.15 + i * 0.06, ease: EASE_OUT },
                y: {
                  delay: 1.0 + i * 0.1,
                  duration: 2.2 + (i % 3) * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="block rounded-lg shadow-md"
              style={{
                backgroundColor: swatch.hex,
                width: `clamp(1.75rem, 4vw, 2.5rem)`,
                height: `clamp(1.75rem, 4vw, 2.5rem)`
              }}
            />
          ))}
        </div>

        {/* Heading + description */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: EASE_OUT }}
          className="max-w-sm space-y-3"
        >
          <h1
            id="error-heading"
            className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
          >
            Color not found
          </h1>
          <p className="text-base leading-relaxed text-stone-500 dark:text-stone-400">
            This page has wandered off the palette. The hue you're looking for doesn't exist — but
            there are thousands of beautiful colors waiting back home.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-stone-950 shadow-md transition-all duration-200 hover:bg-yellow-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 focus-visible:outline-none active:scale-95 dark:focus-visible:ring-offset-stone-950"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to colors
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
