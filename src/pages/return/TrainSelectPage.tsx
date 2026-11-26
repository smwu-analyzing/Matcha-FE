import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../assets/icons/Plus.svg'
import { Button, Icon, OptionCard } from '../../components/common'
import { PageLayout } from '../../components/layout'
import { SelectedShowCard, TrainAddSheet, TrainSummary } from '../../components/return'
import { useReturnStore } from '../../stores/returnStore'

// 03-B 기차 정보 (기차 선택) + 03-C 예매 내역 직접 추가(바텀시트)
export default function TrainSelectPage() {
  const navigate = useNavigate()
  const { show, trains, selectedTrainId, selectTrain, addTrain } = useReturnStore()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <PageLayout
      title="기차 정보"
      footer={
        <Button size="lg" onClick={() => navigate('/return/setup')}>
          기차 정보 추가하기
        </Button>
      }
    >
      <SelectedShowCard show={show} onChange={() => navigate('/show/select')} />

      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-title-s text-gray-900">기차 예매 내역</h2>
          <p className="text-caption-r text-gray-600">타는 기차만 골라주세요. 나머지는 자동으로 맞춰드려요.</p>
        </div>

        {trains.map((train) => (
          <OptionCard
            key={train.id}
            name="train"
            className="p-[14px]"
            checked={selectedTrainId === train.id}
            onChange={() => selectTrain(train.id)}
          >
            <TrainSummary train={train} active={selectedTrainId === train.id} />
          </OptionCard>
        ))}

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center justify-center gap-1.5 rounded-cta border-[1.5px] border-pink-300 bg-gray-0 py-[13px] text-body-m-bold text-green-600"
        >
          <Icon src={plusIcon} className="size-4" />
          예매 내역 직접 추가
        </button>
      </section>

      <TrainAddSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSubmit={(train) => {
          addTrain(train)
          setSheetOpen(false)
        }}
      />
    </PageLayout>
  )
}
