import trainIcon from '../../assets/icons/Train.svg'
import { Icon } from '../common'
import { cn } from '../../utils/cn'
import type { Train } from '../../types/return'

type TrainSummaryProps = {
  train: Train
  // 선택된 상태면 아이콘이 초록색
  active?: boolean
}

// 역 이름 끝의 '역'은 떼고 보여줘요 (서울역 → 서울)
const cityOf = (station: string) => station.replace(/역$/, '')

export default function TrainSummary({ train, active = false }: TrainSummaryProps) {
  const label = train.number ? `${train.type} ${train.number}` : train.type

  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded-[10px] bg-pink-200 px-2 py-0.5 text-micro text-gray-900">
            {label}
          </span>
          <p className="truncate text-body-m-bold text-gray-900">
            {cityOf(train.from)} → {cityOf(train.to)}
          </p>
        </div>
        <p className="truncate text-caption-r text-gray-600">
          {train.date} {train.time} 출발 · {train.from}
        </p>
      </div>
      <Icon src={trainIcon} className={cn('size-[22px]', active ? 'text-green-700' : 'text-gray-500')} />
    </>
  )
}
