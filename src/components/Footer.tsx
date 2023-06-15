import { FaGithub } from 'react-icons/fa'
import { classNames } from '~/utils/className'

export default function Footer({ className }: { className?: string }) {
  return (
    <nav
      className={classNames(
        'flex items-center justify-between px-3 py-4 md:px-12 lg:px-20 xl:px-28',
        className
      )}
    >
      {/* home link */}
      <a
        href="https://github.com/braswelljr"
        target="_blank"
        rel="noopener noreferer"
        className="font-serif text-xl font-extrabold dark:text-yellow-500"
      >
        <span>&copy;braswelljr</span>
      </a>
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
