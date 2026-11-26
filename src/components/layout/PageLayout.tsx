import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../../assets/icons/Back.svg'
import { cn } from '../../utils/cn'

type PageLayoutProps = {
  title: string
  children: ReactNode
  // 하단 고정 영역(CTA 버튼)
  footer?: ReactNode
  // 본문 세로 간격 등 (기본 gap-3)
  bodyClassName?: string
}

export default function PageLayout({ title, children, footer, bodyClassName }: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[393px] flex-col">
      <header className="flex items-center gap-1 px-4 py-[10px]">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="" className="size-6" />
        </button>
        <h1 className="text-title-m text-gray-900">{title}</h1>
      </header>
      <main className={cn('flex flex-col gap-3 px-5 pb-6', bodyClassName)}>{children}</main>
      {footer && (
        <footer className="sticky bottom-0 mt-auto rounded-t-[28px] bg-gray-0 px-5 pb-[30px] pt-[14px] shadow-[0_-6px_10px_rgba(255,112,191,0.14)]">
          {footer}
        </footer>
      )}
    </div>
  )
}
