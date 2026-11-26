// "21:50", 10 → "21:40" (자정을 넘어가도 0~23시로 맞춰요)
export function subtractMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = (((h * 60 + m - minutes) % 1440) + 1440) % 1440;
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

// (2026, "12/05", "21:50") → 그 날짜·시각의 timestamp(ms)
export function toTimestamp(year: number, mmdd: string, hhmm: string): number {
  const [month, day] = mmdd.split("/").map(Number);
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(year, month - 1, day, h, m).getTime();
}
