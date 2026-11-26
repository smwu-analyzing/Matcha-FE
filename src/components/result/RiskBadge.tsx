import { cn } from '../../utils/cn'
import type { RiskStatus } from '../../types/return'

// Tailwind가 클래스를 찾을 수 있게 전체 이름을 적어둬요
const COLOR: Record<RiskStatus, string> = {
  safe: 'bg-status-safe',
  caution: 'bg-status-caution',
  warn: 'bg-status-warn',
  danger: 'bg-status-danger',
}

type RiskBadgeProps = {
  status: RiskStatus
  label: string
  // 채워지는 막대 개수 (1~3)
  level: 1 | 2 | 3
}

export default function RiskBadge({ status, label, level }: RiskBadgeProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <span
        className={cn(
          'rounded-[10px] px-2 py-0.5 text-micro',
          COLOR[status],
          status === 'caution' ? 'text-gray-900' : 'text-gray-0',
        )}
      >
        {label}
      </span>
      <div className="flex gap-1" role="img" aria-label={`위험도 ${level}/3`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={cn('h-1.5 w-[26px] rounded-[3px]', n <= level ? COLOR[status] : 'bg-gray-200')} />
        ))}
      </div>
    </div>
  )
}
