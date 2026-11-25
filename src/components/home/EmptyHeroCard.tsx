import { Button } from '../common'
import heartGreen from '../../assets/icons/green_heart.svg'
import { CHARACTER } from '../../constants/status'

type EmptyHeroCardProps = {
  onSelectShow?: () => void
}

// 공연을 아직 고르지 않았을 때 보이는 카드
export default function EmptyHeroCard({ onSelectShow }: EmptyHeroCardProps) {
  return (
    <section className="flex flex-col gap-2 rounded-card bg-pink-200 p-5">
      <div className="relative min-h-[91px]">
        <span className="inline-flex items-center gap-1 rounded-badge bg-gray-0 px-[10px] py-1 text-caption-m text-green-700">
          <img src={heartGreen} alt="" className="size-3" />
          막차 골든타임
        </span>
        <h2 className="mt-2 text-title-l text-gray-900">
          막차 걱정은 미리,
          <br />
          공연의 순간은 온전히.
        </h2>
        <img
          src={CHARACTER.caution}
          alt=""
          className="absolute right-0 top-0 h-[91px] w-[85px] object-cover"
        />
      </div>
      <p className="text-caption-r text-gray-700">
        공연 종료 시각을 예측해 나에게 맞는 퇴장 시각을 알려드려요.
      </p>
      <Button size="lg" className="bg-green-500" onClick={onSelectShow}>
        공연 선택하고 귀가 계획 세우기
      </Button>
    </section>
  )
}
