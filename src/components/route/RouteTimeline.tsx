import { cn } from '../../utils/cn'
import type { RouteStep } from '../../types/return'
import { LINE_STYLE } from './lineStyle'

const DOT: Record<RouteStep['kind'], string> = {
  start: 'bg-green-600',
  board: 'border-[3px] border-green-600 bg-gray-0',
  end: 'bg-pink-500',
}

export default function RouteTimeline({ steps }: { steps: RouteStep[] }) {
  return (
    <ol className="flex flex-col rounded-[28px] bg-gray-0 p-5">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <li key={step.time} className="flex items-stretch gap-3">
            <p className="w-11 shrink-0 text-title-s text-gray-900">{step.time}</p>
            <div className="flex flex-col items-center">
              <span className={cn('size-[14px] shrink-0 rounded-full', DOT[step.kind])} />
              {!isLast && <span className="w-0.5 flex-1 bg-gray-200" />}
            </div>
            <div className={cn('flex min-w-0 flex-1 flex-col gap-[3px]', !isLast && 'pb-5')}>
              <div className="flex items-center gap-2">
                <p className="text-body-m-bold text-gray-900">{step.title}</p>
                {step.line && (
                  <span className={cn('rounded-[10px] px-2 py-0.5 text-micro', LINE_STYLE[step.line].chip)}>
                    {step.line}호선
                  </span>
                )}
              </div>
              <p className="text-caption-r text-gray-600">{step.desc}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
