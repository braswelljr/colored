import { cn } from '~/utils/cn';

interface SkeletonProps {
  className: string;
}

/**
 * Skeleton - for loading
 * @typedef {SkeletonProps}
 * @property {string} className - cn
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement & SkeletonProps>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-800', className)}
      {...props}
    />
  );
}
