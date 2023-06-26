import { classNames } from '~/utils/className'

interface SkeletonProps {
  className: string
}

/**
 * Skeleton - for loading
 * @typedef {SkeletonProps}
 * @property {string} className - classNames
 * @returns {JSX.Element} Skeleton Componet
 */
export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement & SkeletonProps>): JSX.Element {
  return <div className={classNames('animate-pulse rounded-md', className)} {...props} />
}
