import type { ReactNode } from 'react'
import NotificationHeader from './NotificationHeader'

type NotificationLayoutProps = {
  children: ReactNode
  // 하단 고정 영역(CTA 버튼들)
  footer: ReactNode
}

export default function NotificationLayout({ children, footer }: NotificationLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[393px] flex-col">
      <NotificationHeader />
      <main className="flex flex-col gap-3 px-5 pb-6">{children}</main>
      <footer className="sticky bottom-0 mt-auto flex flex-col items-center gap-2 rounded-t-[28px] bg-gray-0 px-5 pb-[30px] pt-4 shadow-[0_-6px_10px_rgba(255,112,191,0.14)]">
        {footer}
      </footer>
    </div>
  )
}
