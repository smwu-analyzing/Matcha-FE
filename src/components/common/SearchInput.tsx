import { cn } from '../../utils/cn';
import { SearchIcon } from './icons';

type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function SearchInput({ className, ...rest }: SearchInputProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center gap-2 rounded-input border-[1.5px] border-pink-300 bg-gray-0 px-[14px] py-3 transition-colors focus-within:border-pink-500',
        className,
      )}
    >
      <SearchIcon className="shrink-0 text-gray-700" />
      <input
        type="search"
        className="min-w-0 flex-1 bg-transparent text-caption-r text-gray-900 outline-none placeholder:text-gray-500"
        {...rest}
      />
    </label>
  );
}
