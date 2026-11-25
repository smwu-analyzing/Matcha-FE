import { StatusBadge } from '../common'
import type { Status } from '../common'
import { cn } from '../../utils/cn'
import { CHARACTER, STATUS_INFO, getStatus } from '../../constants/status'

type HeroCardProps = {
  showTitle: string
  // 막차 탑승 확률 (0~100)
  percent: number
  // 권장 퇴장 시각 (예: 21:50)
  recommendedExit: string
  // 막차 출발 시각 (예: 22:20)
  lastTrain: string
}

// 상태별로 달라지는 스타일. Tailwind가 클래스를 찾을 수 있게 전체 문자열로 적어요.
const THEME: Record<
  Status,
  { card: string; percent: string; bar: string; image: string }
> = {
  safe: {
    card: 'bg-green-100',
    percent: 'text-status-safe',
    bar: 'bg-status-safe',
    image: 'h-[142px] w-[134px]',
  },
  caution: {
    card: 'bg-pink-100',
    percent: 'text-status-caution',
    bar: 'bg-status-caution',
    image: 'h-[141px] w-[132px]',
  },
  warn: {
    card: 'bg-pink-200',
    percent: 'text-status-warn',
    bar: 'bg-status-warn',
    image: 'h-[141px] w-[132px]',
  },
  danger: {
    card: 'bg-hero-miss',
    percent: 'text-gray-0',
    bar: '',
    image: 'h-[90px] w-[88px]',
  },
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-tile bg-gray-0 p-3">
      <p className="text-caption-r text-gray-600">{label}</p>
      <p className="text-title-s text-gray-900">{value}</p>
    </div>
  )
}

export default function HeroCard({
  showTitle,
  percent,
  recommendedExit,
  lastTrain,
}: HeroCardProps) {
  const value = Math.min(100, Math.max(0, Math.round(percent)))
  const status = getStatus(value)
  const info = STATUS_INFO[status]
  const theme = THEME[status]
  const missed = status === 'danger'

  return (
    <section className={cn('flex flex-col gap-3 rounded-card p-5', theme.card)}>
      <p className="text-caption-m text-gray-900">{showTitle}</p>

      <div className="flex items-center gap-1">
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <StatusBadge status={status} className="self-start py-1 -ml-[3px]">
            {info.label}
          </StatusBadge>
          {!missed && <p className="text-caption-m text-gray-700">지금 막차를 타면</p>}
          <p className={cn('text-display', theme.percent)}>{value}%</p>
          {!missed && <p className="text-title-m text-gray-900">{info.message}</p>}
        </div>
        <img
          src={CHARACTER[status]}
          alt=""
          className={cn('shrink-0 object-cover', theme.image)}
        />
      </div>

      {missed ? (
        <div className="rounded-tile bg-gray-0 p-3">
          <p className="text-center text-title-s text-pink-500">{info.message}</p>
        </div>
      ) : (
        <>
          <div
            role="progressbar"
            aria-label="막차 탑승 확률"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className="h-[10px] overflow-hidden rounded-[5px] bg-gray-0"
          >
            <div
              className={cn('h-full rounded-[5px]', theme.bar)}
              style={{ width: `${value}%` }}
            />
          </div>
          <div className="flex gap-2">
            <Tile label="권장 퇴장" value={recommendedExit} />
            <Tile label="막차 출발" value={lastTrain} />
          </div>
        </>
      )}
    </section>
  )
}
