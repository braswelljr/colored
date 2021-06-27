import { useEffect } from 'react'
import useStore from '../store'
import { circuit } from '../backgrounds/background'
import clsx from 'clsx'
import { HiChevronUp } from 'react-icons/hi'

const Topper = () => {
  const theme = useStore(state => state.theme)

  useEffect(() => {
    const topper = document.querySelector(`#topper`)
    window.addEventListener('scroll', () => {
      document.documentElement.scrollTop > 250 || document.body.scrollTop > 250
        ? topper.classList.remove('translate-y-20')
        : topper.classList.add('translate-y-20')
    })
  }, [])

  return (
    <button
      type="button"
      id="topper"
      style={{
        backgroundImage: circuit
      }}
      className={clsx(
        'rounded-full fixed bottom-4 right-4 p-2 transition-all focus:outline-none transform duration-500 translate-y-20',
        {
          'text-gray-900 bg-yellow-300': theme === 'dark',
          'bg-[#9E2A2B]  text-yellow-300': theme !== 'dark'
        }
      )}
      onClick={() =>
        (document.documentElement.scrollTop = 0) &&
        (document.body.scrollTop = 0)
      }
      tabIndex={-1}
    >
      <HiChevronUp className="w-10 h-10" />
    </button>
  )
}

export default Topper
