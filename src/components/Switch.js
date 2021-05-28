import { useState } from 'react'
import { CodeIcon, XIcon } from '@heroicons/react/solid'
import { circuit } from '../backgrounds/background'
import useStore from '../store'
import clsx from 'clsx'

const Switch = () => {
  const [close, setClose] = useState('closed')
  const format = useStore(state => state.format)
  const switchHSL = useStore(state => state.setHSL)
  const switchRGB = useStore(state => state.setRGB)
  const switchHEX = useStore(state => state.setHEX)
  const theme = useStore(state => state.theme)

  return (
    <>
      <div
        className={`fixed z-[22] right-0 w-auto -mb-1 outline-none overflow-hidden space-x-0 top-[50vh] text-current transform transition-all ease-in duration-200 ${
          close === 'closed' ? 'translate-x-32' : 'translate-x-0'
        } flex items-center justify-center`}
      >
        <button
          type="button"
          style={{
            backgroundImage: circuit
          }}
          className={clsx(
            `text-yellow-300 outline-none focus:outline-none py-2 px-5 rounded-l-full`,
            {
              'bg-gray-900': theme === 'dark',
              'bg-[#9E2A2B]': theme !== 'dark'
            }
          )}
          onClick={event => {
            event.preventDefault()
            close === 'closed' ? setClose('opened') : setClose('closed')
          }}
          tabIndex={-1}
        >
          {close === 'closed' ? (
            <CodeIcon className="w-5 h-5" />
          ) : (
            <XIcon className="w-5 h-5" />
          )}
        </button>
        <div
          style={{
            backgroundImage: circuit
          }}
          className={clsx('w-auto text-yellow-300 p-0 rounded-l-xl', {
            'bg-gray-90': theme === 'dark',
            'bg-[#9E2A2B': theme !== 'dark'
          })}
        >
          <button
            style={{
              backgroundImage: circuit
            }}
            className={clsx(
              'block px-12 py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none',
              {
                'bg-gray-900': theme === 'dark',
                'bg-[#9E2A2B]': theme !== 'dark'
              }
            )}
            onClick={switchHSL}
          >
            HSL
          </button>
          <button
            style={{
              backgroundImage: circuit
            }}
            className={clsx(
              'block px-12 py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none',
              {
                'bg-gray-90': theme === 'dark',
                'bg-[#9E2A2': theme !== 'dark'
              }
            )}
            onClick={switchRGB}
          >
            RGB
          </button>
          <button
            style={{
              backgroundImage: circuit
            }}
            className={clsx(
              'block px-12 py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none',
              {
                'bg-gray-900': theme === 'dark',
                'bg-[#9E2A2B]': theme !== 'dark'
              }
            )}
            onClick={switchHEX}
          >
            HEX
          </button>
        </div>
      </div>
      <button
        className={`${
          close === 'closed' ? `hidden` : `fixed`
        } z-[21] inset-0 w-full h-full bg-gray-800 bg-opacity-20`}
        tabIndex={-1}
        onClick={() => setClose('closed')}
      ></button>
    </>
  )
}

export default Switch
