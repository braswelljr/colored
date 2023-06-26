'use client'

import { useEffect, useState } from 'react'
import { HiClipboard } from 'react-icons/hi'
import { COLOR } from '~/types/color'
import { AnimatePresence, motion } from 'framer-motion'
import { invertHex } from 'lib/color'
import { classNames } from '~/utils/className'
import copy from '~/utils/copy'

interface ColorProps {
  color: COLOR
  className?: string
}

export default function Color({ color, className }: ColorProps) {
  const { name, hex } = color
  const [copied, setCopied] = useState<undefined | 'copied'>('copied')
  const [mouse, setMouse] = useState<'over' | 'out'>('out')

  useEffect(() => {
    // set copied to undefined after 1 second
    const c = window.setTimeout(() => setCopied(undefined), 1000)

    // clean up timeout
    return () => window.clearTimeout(c)
  }, [copied])

  return (
    <div
      style={{ backgroundColor: hex, color: invertHex(hex) }}
      className={classNames(
        'group relative flex h-24 cursor-pointer items-center justify-center rounded-md text-center font-semibold',
        className
      )}
      onMouseOver={() => setMouse('over')}
      onMouseOut={() => setMouse('out')}
    >
      <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">{name}</span>
      {/* color */}
      <span className="absolute bottom-2 left-2">{hex}</span>
      {/* indicator */}
      <div
        className={classNames(
          'absolute inset-0.5 z-[1] grid place-content-center rounded bg-zinc-950/90 transition-opacity duration-300',
          {
            'opacity-0': mouse === 'out',
            'opacity-100': mouse === 'over'
          }
        )}
      >
        <AnimatePresence>
          {/* copy button */}
          {copied === undefined && (
            <motion.button
              layoutId={hex}
              type="button"
              className="absolute bottom-2 right-2 inline-flex cursor-pointer items-center space-x-1 rounded px-2 py-0.5 text-zinc-950"
              style={{ backgroundColor: hex }}
              onClick={() => copy(hex).then(() => setCopied('copied'))}
            >
              <HiClipboard className="h-3 w-full" />
              <span className="text-sm font-bold uppercase">Copy</span>
            </motion.button>
          )}
          {/* copied */}
          {copied === 'copied' && (
            <motion.span layoutId={hex} className="text-xl font-black uppercase text-white">
              {copied}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
