import { cn } from '../../utils/cn'

type IconProps = {
  // 단색 SVG 파일 (모양만 사용하고 색은 글자색(text-*)을 따라가요)
  src: string
  className?: string
}

export default function Icon({ src, className }: IconProps) {
  const mask = `url("${src}")`
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}
