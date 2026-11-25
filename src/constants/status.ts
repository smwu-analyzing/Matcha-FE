import type { Status } from '../components/common'
import safe from '../assets/characters/safe.png'
import caution from '../assets/characters/caution.png'
import warn from '../assets/characters/warn.png'
import danger from '../assets/characters/danger.png'


export function getStatus(percent: number): Status {
  if (percent >= 70) return 'safe'
  if (percent >= 35) return 'caution'
  if (percent > 0) return 'warn'
  return 'danger'
}

export const STATUS_INFO: Record<Status, { label: string; message: string }> = {
  safe: { label: '여유 있어요', message: '여유롭게 탈 수 있어요' },
  caution: { label: '아슬아슬해요', message: '서두르면 탈 수 있어요' },
  warn: { label: '위험해요', message: '지금 바로 움직여야 해요' },
  danger: { label: '막차 놓침', message: '즐거운 시간 보내세요!' },
}

export const CHARACTER: Record<Status, string> = { safe, caution, warn, danger }
