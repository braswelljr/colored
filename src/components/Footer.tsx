import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { classNames } from '~/utils/className'

export default function Footer({ className }: { className?: string }) {
  return (
    <nav className={classNames('', className)}>
      {/* home link */}
      <Link href={'/'} className="uppercase">
        <span>&copy; Colored</span>
      </Link>
      {/* github */}
      <div className="">
        <a
          href="https://github.com/braswelljr/colored"
          target="_blank"
          rel="noopener noreferer"
          className=""
        >
          <FaGithub className="h-7 w-auto" />
        </a>
      </div>
    </nav>
  )
}
