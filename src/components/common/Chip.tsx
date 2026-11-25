import { cn } from '../../utils/cn';

type ChipProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  selected?: boolean;
  children: React.ReactNode;
};

export default function Chip({
  selected = false,
  className,
  type = 'button',
  children,
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center rounded-chip border-[1.5px] px-[14px] py-2 text-caption-m transition-colors',
        selected
          ? 'border-green-600 bg-green-600 text-gray-0'
          : 'border-pink-300 bg-gray-0 text-gray-700',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
