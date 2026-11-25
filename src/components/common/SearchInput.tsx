import { cn } from '../../utils/cn'
import searchIcon from '../../assets/icons/SearchIcon.svg'

type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  // 홈 화면용 큰 검색창 (기본은 DS 크기)
  large?: boolean
}

export default function SearchInput({ large = false, className, ...rest }: SearchInputProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center border-[1.5px] border-pink-300 bg-gray-0 transition-colors focus-within:border-pink-500',
        large ? 'gap-[10px] rounded-[24px] px-4 py-[13px]' : 'gap-2 rounded-input px-[14px] py-3',
        className,
      )}
    >
      <img
        src={searchIcon}
        alt=""
        className={cn('shrink-0', large ? 'size-5' : 'size-[18px]')}
      />
      <input
        type="search"
        className={cn(
          'min-w-0 flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-500',
          large ? 'text-body-m' : 'text-caption-r',
        )}
        {...rest}
      />
    </label>
  )
}