type Axis = {
  start: string
  end: string
  exit: string
  lastTrain: string
  endFrom: string
  endTo: string
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export default function TimeCompare({ axis }: { axis: Axis }) {
  const start = toMinutes(axis.start)
  const range = toMinutes(axis.end) - start
  // 시각 → 막대 위 위치(%)
  const pct = (hhmm: string) => ((toMinutes(hhmm) - start) / range) * 100

  const exitAt = pct(axis.exit)
  const trainAt = pct(axis.lastTrain)
  const endFrom = pct(axis.endFrom)
  const endTo = pct(axis.endTo)

  return (
    <section className="flex flex-col gap-1.5 rounded-input bg-gray-0 p-4">
      <h3 className="text-caption-m text-gray-600">시간대 비교</h3>
      <div className="relative h-[62px]">
        <div className="absolute inset-x-0 top-[26px] h-2 rounded bg-gray-100" />
        <div
          className="absolute top-[26px] h-2 rounded bg-pink-400"
          style={{ left: `${endFrom}%`, width: `${endTo - endFrom}%` }}
        />
        <span
          className="absolute top-[22px] size-4 -translate-x-1/2 rounded-full bg-green-600 ring-2 ring-gray-0"
          style={{ left: `${exitAt}%` }}
        />
        <span
          className="absolute top-[19px] h-[22px] w-[3px] -translate-x-1/2 rounded-sm bg-pink-500"
          style={{ left: `${trainAt}%` }}
        />
        <p
          className="absolute top-0.5 -translate-x-1/2 whitespace-nowrap text-micro text-green-700"
          style={{ left: `${exitAt}%` }}
        >
          권장 퇴장 {axis.exit}
        </p>
        <p
          className="absolute top-0.5 -translate-x-1/2 whitespace-nowrap text-micro text-gray-900"
          style={{ left: `${trainAt}%` }}
        >
          막차 {axis.lastTrain}
        </p>
        <p
          className="absolute top-[44px] -translate-x-1/2 whitespace-nowrap text-micro text-gray-600"
          style={{ left: `${(endFrom + endTo) / 2}%` }}
        >
          예상 종료 {axis.endFrom}~{axis.endTo}
        </p>
      </div>
    </section>
  )
}
