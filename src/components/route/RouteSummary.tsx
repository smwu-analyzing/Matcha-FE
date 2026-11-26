import { cn } from '../../utils/cn'
import type { RouteSegment } from '../../types/return'
import { LINE_STYLE } from './lineStyle'

type RouteSummaryProps = {
  totalMinutes: number
  crowdMinutes: number
  depart: string
  arrive: string
  segments: RouteSegment[]
}

const segmentClass = (s: RouteSegment) => {
  switch (s.type) {
    case 'crowd':
      return 'bg-pink-200'
    case 'walk':
      return 'bg-pink-400'
    case 'subway':
      return s.line ? LINE_STYLE[s.line].bar : 'bg-green-600'
    case 'transfer':
      return 'border-[1.5px] border-gray-700 bg-gray-0'
  }
}

const LEGEND = [
  { label: '퇴장 혼잡', dot: 'bg-pink-200' },
  { label: '도보', dot: 'bg-pink-400' },
  { label: '지하철', dot: 'bg-line-2' },
  { label: '환승', dot: 'border-[1.5px] border-gray-700 bg-gray-0' },
]

export default function RouteSummary({ totalMinutes, crowdMinutes, depart, arrive, segments }: RouteSummaryProps) {
  return (
    <section className="flex flex-col gap-[10px] rounded-[28px] bg-gray-0 p-5">
      <div className="flex items-end gap-2">
        <p className="text-title-2xl text-gray-900">총 {totalMinutes}분</p>
        <p className="text-caption-r text-gray-600">퇴장 혼잡 {crowdMinutes}분 포함</p>
      </div>
      <p className="whitespace-pre text-body-m-bold text-green-700">{`${depart} 퇴장  →  ${arrive} 도착`}</p>
      <div className="flex gap-0.5">
        {segments.map((s, i) => (
          <span
            key={i}
            className={cn('h-3 rounded-[5px]', segmentClass(s))}
            style={{ flex: `${s.flex} 0 0` }}
          />
        ))}
      </div>
      <ul className="flex gap-3">
        {LEGEND.map(({ label, dot }) => (
          <li key={label} className="flex items-center gap-1">
            <span className={cn('size-2 rounded-full', dot)} />
            <span className="text-micro text-gray-600">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
