import { useEffect, useState } from "react";
import { useReturnStore } from "../stores/returnStore";

// 권장 퇴장 시각까지 남은 분 → 홈 카드 단계 (큰 값부터 검사해요)
export const PERCENT_STEPS = [
  { minMinutes: 30, percent: 90 },
  { minMinutes: 10, percent: 50 },
  { minMinutes: 0, percent: 20 },
] as const;

const FAKE_NOW_KEY = "matcha:fake-now";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function getNowMinutes() {
  // 개발 중 확인용: 콘솔에서 sessionStorage.setItem("matcha:fake-now", "21:35")
  if (import.meta.env.DEV) {
    try {
      const fake = sessionStorage.getItem(FAKE_NOW_KEY);
      if (fake && /^\d{1,2}:\d{2}$/.test(fake)) return toMinutes(fake);
    } catch {
      // 저장소를 못 쓰면 실제 시각 사용
    }
  }
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

// 귀가 설정 전에는 null, 설정 후에는 90 / 50 / 20 / 0 중 하나
export function useReturnPercent(): number | null {
  const exitTime = useReturnStore((s) => s.exitTime);
  const [now, setNow] = useState(getNowMinutes);

  useEffect(() => {
    const id = setInterval(() => setNow(getNowMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!exitTime) return null;

  const remain = toMinutes(exitTime) - now;
  const step = PERCENT_STEPS.find((s) => remain >= s.minMinutes);
  return step ? step.percent : 0;
}
