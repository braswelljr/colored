import { useState, useEffect } from 'react'
import clsx from 'clsx'
import useStore from '../store'
import ColorPad from './palette/ColorPad'

// Alt + 127752 /-> rainbow
const Explore = () => {
  const colors = useStore(state => state.colors)
  const format = useStore(state => state.format)
  const filterate = useStore(state => state.filter)
  const query = useStore(state => state.query)
  const [renderAll, setRenderAll] = useState(false)

  useEffect(() => {
    setRenderAll(true)
  }, [])

  const filteredColors = filterate
    ? colors
        .filter(color => filterate.indexOf(color) !== -1)
        .sort((a, b) => filterate.indexOf(a) - filterate.indexOf(b))
    : colors

  if (filterate && filterate.length === 0) {
    return (
      <>
        <div
          className={clsx(
            'px-4 py-20 text-center sm:pt-24 sm:pb-36 lg:pt-40 lg:pb-56'
          )}
        >
          <div className="mb-3 text-lg font-medium leading-6 text-gray-500">
            <p>
              Sorry! There are no colors for “{query}” 😥 make sure the code you
              entered matches the following #abc012, rgb(0, 100, 255) and
              hsl(360, 100, 50)
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        style={{
          scrollBehavior: `smooth`
        }}
        className="grid gap-8 text-center text-xs leading-4 grid-cols-[repeat(auto-fill,minmax(132px,1fr))]"
      >
        {format === 'hsl' &&
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} name={`${color.string.hsl}`} color={color} />
            ))}

        {format === 'rgb' &&
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} name={`${color.string.rgb}`} color={color} />
            ))}

        {format === 'hex' &&
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} name={`${color.string.hex}`} color={color} />
            ))}
      </div>
    </>
  )
}

export default Explore
