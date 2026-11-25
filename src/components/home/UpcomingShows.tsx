import chevronRight from '../../assets/icons/ChevronRightIcon.svg'

import type { Show } from '../../types/show'
import ShowCard from './ShowCard'

type UpcomingShowsProps = {
  shows: Show[]
  onViewAll?: () => void
  onSelectShow?: (show: Show) => void
}

export default function UpcomingShows({ shows, onViewAll, onSelectShow }: UpcomingShowsProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-title-m text-gray-900">다가오는 공연</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-caption-m text-gray-600"
        >
          전체보기
          <img src={chevronRight} alt="" className="size-[14px]" />
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {shows.map((show, i) => (
          <li key={show.id}>
            <ShowCard
              show={show}
              tone={i % 2 === 0 ? 'pink' : 'green'}
              onClick={onSelectShow}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
