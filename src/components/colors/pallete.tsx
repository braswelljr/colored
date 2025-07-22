import { PaletteType } from '~/data/colors';
import { cn } from '~/utils/cn';

interface PalleteProps {
  palette: PaletteType;
  className?: string;
}

export default function Pallete({ palette, className }: PalleteProps) {
  return (
    <div className={cn('group/palette grid cursor-pointer rounded-lg', className)}>
      {palette.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color.hex, color: '' }}
          className={cn('h-16')}
        >
          <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">{color.name}</span>
        </div>
      ))}
    </div>
  );
}
