import { useState } from 'react'
import { circuit } from '../backgrounds/background'
import useStore from '../store'
import { Switch } from '@headlessui/react'
import { HiCode, HiColorSwatch, HiHashtag } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import clsx from 'clsx'

const Navbar = ({ appName }) => {
  const theme = useStore(state => state.theme)
  const themeLight = useStore(state => state.themeLight)
  const themeDark = useStore(state => state.themeDark)
  const colors = useStore(state => state.colors)
  const [enabled, setEnabled] = useState(false)

  return (
    <nav
      style={{
        backgroundImage: circuit
      }}
      className={clsx(
        'w-full px-3 text-yellow-300 py-4  shadow-lg md:px-12 xl:px-28 lg:px-20 clip-head',
        {
          'bg-gray-900': theme !== 'light',
          'bg-[#9E2A2B]': theme === 'light'
        }
      )}
    >
      <section className={`flex items-center justify-between w-full`}>
        <div
          className={`flex items-center justify-center space-x-2 text-lg font-normal md:text-2xl`}
        >
          <HiColorSwatch className="block w-auto h-6" />
          <div className={`uppercase font-extrabold text-xl`}>{appName}</div>
        </div>
        <div className="">
          <Switch
            checked={enabled}
            onChange={() => {
              setEnabled(!enabled)
              if (theme !== 'light') {
                themeLight()
                localStorage.setItem(appName, 'light')
              } else {
                themeDark()
                localStorage.setItem(appName, 'dark')
              }
            }}
            className={clsx(
              'relative bg-[#FFE66D] inline-flex items-center h-[30px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              style={{
                backgroundImage: circuit,
                backgroundColor: theme.foreground
              }}
              className={`${
                theme === 'dark'
                  ? 'translate-x-[28px] bg-gray-900 text-white'
                  : 'translate-x-[2px] bg-[#9E2A2B] text-yellow-300'
              }
            pointer-events-none inline-block h-[26px] w-[26px] rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
      </section>
      <section
        className={`w-full px-6 py-5 space-y-10 md:py-8 text-center lg:py-10 lg:flex-row xl:px-28 lg:px-20 lg:space-x-10`}
      >
        <div className="text-xl font-bold leading-9 tracking-wider grid lg:grid-cols-[4fr,2fr] gap-10 text-center px-auto">
          <div className="uppercase">
            <span className="text-gray-300">{appName}</span>, gets you to chose
            design with your handpicked colors.
          </div>
          <div className="">
            <a
              href="https://github.com/braswelljr/colored"
              target="_blank"
              className="w-full block font-semibold text-lg transform transition-all hover:-translate-y-0.5 py-1 space-x-7 bg-yellow-200 border-[0.5px] border-current rounded bg-opacity-20 hover:shadow-lg md:w-auto px-10"
            >
              <FaGithub className="inline w-auto h-6" />
              <span className="">GitHub</span>
            </a>
          </div>
        </div>
        <div className="grid items-center justify-center w-full grid-cols-3 text-xs font-semibold justify-items-center">
          <div className="flex items-center">
            <HiHashtag className="block w-auto h-6" />
            <div className="">{colors.length} Colors</div>
          </div>
          <div className="flex items-center">
            <HiCode className="block w-auto h-6" />
            <div className="">3 Different format</div>
          </div>
          <div className="flex items-center">
            <HiColorSwatch className="block w-auto h-6" />
            <div className="">Create a palette</div>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default Navbar
