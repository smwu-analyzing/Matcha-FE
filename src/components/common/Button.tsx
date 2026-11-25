import { cn } from '../../utils/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost'
  size?: 'md' | 'lg'
}

const base =
  'flex w-full items-center justify-center text-body-m-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40'

const sizes = {
  md: 'h-12 rounded-button',
  lg: 'h-14 rounded-cta text-title-s',
} as const

const variants = {
  primary: 'bg-green-600 text-gray-0 enabled:active:bg-green-700',
  secondary:
    'border-[1.5px] border-green-600 bg-gray-0 text-green-600 enabled:active:bg-green-50',
  soft: 'text-gray-900 enabled:active:opacity-80',
  ghost: 'h-8 text-gray-600 enabled:active:text-gray-900',
} as const

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variant !== 'ghost' && sizes[size], variants[variant], className)}
      {...rest}
    />
  )
}