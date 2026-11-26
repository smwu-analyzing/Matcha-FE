import { useEffect, useState } from "react";
import { useReturnStore } from "../stores/returnStore";

// 권장 퇴장까지 남은 분 → 홈 카드 단계 (큰 값부터 검사해요)
export const PERCENT_STEPS = [
  { minMinutes: 30, percent: 90 },
  { minMinutes: 10, percent: 50 },
  { minMinutes: 0, percent: 20 },
] as const;

const FAKE_NOW_KEY = "matcha:fake-now";

const isSameDay = (a: number, b: number) => {
  const x = new Date(a);
  const y = new Date(b);
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  );
};

// 공연 당일이 아니면 null, 당일이면 90 / 50 / 20 / 0 중 하나
export function calcPercent(exitAt: number, now: number): number | null {
  if (!isSameDay(exitAt, now)) return null;
  const remain = Math.floor((exitAt - now) / 60000);
  const step = PERCENT_STEPS.find((s) => remain >= s.minMinutes);
  return step ? step.percent : 0;
}

function getNow(): number {
  // 개발 중 확인용: 콘솔에서
  // sessionStorage.setItem("matcha:fake-now", "2026-12-05 21:10")
  if (import.meta.env.DEV) {
    try {
      const fake = sessionStorage.getItem(FAKE_NOW_KEY);
      const match = fake?.match(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{2})$/);
      if (match) {
        const [, y, mo, d, h, mi] = match.map(Number);
        return new Date(y, mo - 1, d, h, mi).getTime();
      }
    } catch {
      // 저장소를 못 쓰면 실제 시각 사용
    }
  }
  return Date.now();
}

export function useReturnPercent(): number | null {
  const exitAt = useReturnStore((s) => s.exitAt);
  const [now, setNow] = useState(getNow);

  useEffect(() => {
    const id = setInterval(() => setNow(getNow()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (exitAt === null) return null;
  return calcPercent(exitAt, now);
}
