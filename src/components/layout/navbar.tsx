'use client';

import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { HiColorSwatch } from 'react-icons/hi';
import ThemeSwitcher from '~/components/shared/theme-switcher';
import { cn } from '~/utils/cn';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn('px-3 py-4 md:px-12 lg:px-20 xl:px-28', className)}>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-kablammo inline-flex items-center space-x-2 text-2xl font-extrabold uppercase dark:text-yellow-500"
        >
          <HiColorSwatch className="block h-6 w-auto" />
          <span className="uppercase">Colored</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/braswelljr/colored"
            target="_blank"
            rel="noopener noreferer"
            className="inline-flex w-full items-center justify-center rounded p-1 transition-transform hover:translate-y-0.5 focus:translate-y-0.5 lg:max-w-xl dark:text-yellow-500"
          >
            <FaGithub className="h-6 w-auto" />
          </Link>
          <ThemeSwitcher className="shrink-0" />
        </div>
      </div>
    </nav>
  );
}
