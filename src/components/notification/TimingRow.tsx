import { Chip } from '../common'

export const TIMING_OPTIONS = [5, 10, 20] as const
export type Timing = (typeof TIMING_OPTIONS)[number]

type TimingRowProps = {
  value: Timing
  onChange: (value: Timing) => void
}

export default function TimingRow({ value, onChange }: TimingRowProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-[14px]">
      <p className="flex-1 text-body-m-bold text-gray-900">알림 시점</p>
      {TIMING_OPTIONS.map((minute) => (
        <Chip key={minute} selected={value === minute} onClick={() => onChange(minute)}>
          {minute}분 전
        </Chip>
      ))}
    </div>
  )
}
