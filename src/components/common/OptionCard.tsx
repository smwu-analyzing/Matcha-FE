import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type OptionCardProps = {
  name: string
  checked: boolean
  onChange: () => void
  children: ReactNode
  className?: string
}

// 라디오가 달린 선택 카드 (공연 회차, 기차 선택)
export default function OptionCard({ name, checked, onChange, children, className }: OptionCardProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-input border-[1.5px] border-pink-300 bg-gray-0 p-4 transition-colors',
        'has-[:checked]:border-2 has-[:checked]:border-green-500 has-[:checked]:bg-green-50',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink-300',
        className,
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          'flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors',
          'after:size-2 after:scale-0 after:rounded-full after:bg-gray-0 after:transition-transform',
          'peer-checked:border-green-600 peer-checked:bg-green-600 peer-checked:after:scale-100',
        )}
      />
      {children}
    </label>
  )
}
