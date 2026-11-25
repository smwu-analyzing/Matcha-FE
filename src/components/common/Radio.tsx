import { cn } from '../../utils/cn';

type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function Radio({ className, ...rest }: RadioProps) {
  return (
    <label className={cn('inline-flex cursor-pointer', className)}>
      <input type="radio" className="peer sr-only" {...rest} />
      <span
        className={cn(
          'flex size-[22px] items-center justify-center rounded-full border-2 border-gray-300 transition-colors',
          'after:size-2 after:scale-0 after:rounded-full after:bg-gray-0 after:transition-transform',
          'peer-checked:border-green-600 peer-checked:bg-green-600 peer-checked:after:scale-100',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-pink-300 peer-disabled:opacity-40',
        )}
      />
    </label>
  );
}
