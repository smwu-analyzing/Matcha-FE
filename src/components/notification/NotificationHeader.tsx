import { useNavigate } from 'react-router-dom'
import backIcon from '../../assets/icons/Back.svg'

export default function NotificationHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-1 px-4 py-[10px]">
      <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)}>
        <img src={backIcon} alt="" className="size-6" />
      </button>
      <h1 className="text-title-m text-gray-900">알림 설정</h1>
    </header>
  )
}
