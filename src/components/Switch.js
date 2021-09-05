import clsx from 'clsx'
import useStore from '@/store/index'

const Switch = () => {
  const format = useStore(state => state.format)
  const switchHSL = useStore(state => state.setHSL)
  const switchRGB = useStore(state => state.setRGB)
  const switchHEX = useStore(state => state.setHEX)
  const theme = useStore(state => state.theme)

  return (
    <>
      <div
        className={clsx(
          'sm:px-6 lg:px-16 font-semibold px-4 pb-2 grid grid-cols-3 gap-4'
        )}
      >
        <button
          type="button"
          onClick={switchHEX}
          className={clsx('w-full py-2 rounded-3xl focus:outline-none', {
            'bg-gray-700': theme !== 'light' && format !== 'hex',
            'bg-gray-100': theme === 'light' && format !== 'hex',
            'bg-yellow-300 text-gray-900': format === 'hex'
          })}
        >
          HEX
        </button>
        <button
          type="button"
          onClick={switchRGB}
          className={clsx('w-full py-2 rounded-3xl focus:outline-none', {
            'bg-gray-700': theme !== 'light' && format !== 'rgb',
            'bg-gray-100': theme === 'light' && format !== 'rgb',
            'bg-yellow-300 text-gray-900': format === 'rgb'
          })}
        >
          rgb
        </button>
        <button
          type="button"
          onClick={switchHSL}
          className={clsx('w-full py-2 rounded-3xl focus:outline-none', {
            'bg-gray-700': theme !== 'light' && format !== 'hsl',
            'bg-gray-100': theme === 'light' && format !== 'hsl',
            'bg-yellow-300 text-gray-900': format === 'hsl'
          })}
        >
          HSL
        </button>
      </div>
    </>
  )
}

export default Switch
