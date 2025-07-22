'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { HiClipboard } from 'react-icons/hi';
import { ColorType } from '~/data/colors';
import { cn } from '~/utils/cn';
import copy from '~/utils/copy';

interface ColorProps {
  color: ColorType;
  className?: string;
}

export default function Color({ color, className }: ColorProps) {
  const { name, hex } = color;
  const [copied, setCopied] = useState<undefined | 'copied'>('copied');
  const [mouse, setMouse] = useState<'over' | 'out'>('out');

  useEffect(() => {
    // set copied to undefined after 1 second
    const c = window.setTimeout(() => setCopied(undefined), 1000);

    // clean up timeout
    return () => window.clearTimeout(c);
  }, [copied]);

  return (
    <div
      style={{ backgroundColor: hex, color: '' }}
      className={cn('group relative flex h-24 cursor-pointer items-center justify-center rounded-md text-center font-semibold', className)}
      onMouseOver={() => setMouse('over')}
      onMouseOut={() => setMouse('out')}
    >
      <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">{name}</span>
      <span className="absolute bottom-2 left-2">{hex}</span>
      <motion.div
        className={cn(
          'absolute inset-0.5 z-[1] grid place-content-center rounded bg-neutral-950/70 transition-opacity duration-300',
          mouse === 'over' ? 'opacity-100' : 'opacity-0'
        )}
      >
        <AnimatePresence mode="sync">
          {copied === undefined ? (
            <motion.button
              layoutId={hex}
              type="button"
              className="absolute right-2 bottom-2 inline-flex cursor-pointer items-center space-x-1 rounded px-2 py-0.5 text-neutral-950"
              style={{ backgroundColor: hex }}
              onClick={() => copy(hex).then(() => setCopied('copied'))}
            >
              <HiClipboard className="h-3 w-full" />
              <span className="text-sm font-bold uppercase">Copy</span>
            </motion.button>
          ) : (
            <motion.span
              layoutId={hex}
              className="text-xl font-black text-white uppercase"
            >
              {copied}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
