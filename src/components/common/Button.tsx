import { cn } from '../../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const base =
  'flex w-full items-center justify-center text-body-m-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40';

const variants = {
  primary:
    'h-12 rounded-button bg-green-600 text-gray-0 enabled:active:bg-green-700',
  secondary:
    'h-12 rounded-button border-[1.5px] border-green-600 bg-gray-0 text-green-600 enabled:active:bg-green-50',
  ghost: 'h-8 text-gray-600 enabled:active:text-gray-900',
} as const;

export default function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    />
  );
}
