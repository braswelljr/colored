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

export default function NotFoundPage() {
  const isReduced = useReducedMotion();

  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 py-16 text-center"
    >
      {/* 404 display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        aria-hidden="true"
        className="select-none"
      >
        <span className="font-kablammo text-[clamp(4rem,16vw,10rem)] leading-none tracking-tight">
          <span className="text-yellow-500">4</span>
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

      {/* Floating swatches */}
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
                : { opacity: 1, scale: 1, rotate: 0, y: [0, -6, 0] }
            }
            transition={{
              opacity: { duration: 0.3, delay: 0.1 + i * 0.055 },
              scale: { type: 'spring', stiffness: 320, damping: 16, delay: 0.1 + i * 0.055 },
              rotate: { duration: 0.3, delay: 0.1 + i * 0.055, ease: EASE_OUT },
              y: {
                delay: 0.9 + i * 0.1,
                duration: 2.2 + (i % 3) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="block rounded-lg shadow-md"
            style={{
              backgroundColor: swatch.hex,
              width: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              height: 'clamp(1.5rem, 3.5vw, 2.25rem)'
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
        className="max-w-sm space-y-3"
      >
        <h1
          id="not-found-heading"
          className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
        >
          Color not found
        </h1>
        <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          This page doesn't exist in our palette. Head back and explore the colors that do.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-md transition-all duration-200 hover:bg-yellow-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 focus-visible:outline-none active:scale-95 dark:focus-visible:ring-offset-stone-950"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to colors
        </Link>
      </motion.div>
    </section>
  );
}
