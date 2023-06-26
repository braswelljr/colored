import { COLOR } from '~/types/color'
import { invertHex } from 'lib/color'
import { classNames } from '~/utils/className'

interface PalleteProps {
  pallete: COLOR[]
  className?: string
}

export default function Pallete({ pallete, className }: PalleteProps) {
  return (
    <div
      className={classNames(
        'group/color grid h-64 cursor-pointer grid-rows-5 rounded-lg',
        className
      )}
    >
      {pallete.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color.hex, color: invertHex(color.hex) }}
          className={classNames('hover:h-16')}
        >
          <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">{color.name}</span>
        </div>
      ))}
    </div>
  )
}
