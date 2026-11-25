import { cn } from '../../utils/cn'
import heartPink from '../../assets/icons/pink_heart.svg'
import heartGreen from '../../assets/icons/green_heart.svg'
import chevronRight from '../../assets/icons/ChevronRightIcon.svg'
import type { Show } from '../../types/show'

type ShowCardProps = {
  show: Show
  // 썸네일 색 (Figma에서 핑크/초록이 번갈아 나와요)
  tone?: 'pink' | 'green'
  onClick?: (show: Show) => void
}

const TONE = {
  pink: { thumb: 'bg-pink-200', icon: heartPink },
  green: { thumb: 'bg-green-100', icon: heartGreen },
} as const

export default function ShowCard({ show, tone = 'pink', onClick }: ShowCardProps) {
  const classes = cn(
    'flex w-full items-center gap-3 rounded-[20px] bg-gray-0 p-[10px] text-left',
    onClick && 'transition-colors active:bg-gray-100',
  )

  const content = (
    <>
      <span
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-[14px]',
          TONE[tone].thumb,
        )}
      >
        <img src={TONE[tone].icon} alt="" className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-body-m-bold text-gray-900">{show.title}</span>
        <span className="truncate text-caption-r text-gray-600">
          {show.date} · {show.venue}
        </span>
      </span>
      <img src={chevronRight} alt="" className="size-[18px] shrink-0" />
    </>
  )

  return onClick ? (
    <button type="button" className={classes} onClick={() => onClick(show)}>
      {content}
    </button>
  ) : (
    <div className={classes}>{content}</div>
  )
}