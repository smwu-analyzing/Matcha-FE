import logo from '../../assets/home_logo.png'
import bell from '../../assets/icons/Bell.svg'

type HomeHeaderProps = {
  onNotificationClick?: () => void
}

export default function HomeHeader({ onNotificationClick }: HomeHeaderProps) {
  return (
    <header className="flex h-8 items-center justify-between">
      <img src={logo} alt="MATCHA" className="h-8 w-auto" />
      <button type="button" aria-label="알림" onClick={onNotificationClick}>
        <img src={bell} alt="" className="size-8" />
      </button>
    </header>
  )
}