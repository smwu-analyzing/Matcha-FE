import { cn } from '../../utils/cn';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export default function Toggle({
  checked,
  onChange,
  disabled,
  className,
  ...rest
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        checked ? 'bg-green-600' : 'bg-gray-300',
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          'absolute left-[3px] top-[3px] size-[22px] rounded-full bg-gray-0 shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform',
          checked && 'translate-x-5',
        )}
      />
    </button>
  );
}
