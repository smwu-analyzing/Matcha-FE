export type ReturnShow = {
  title: string;
  // 예: 12/05(토) 18:00
  date: string;
  venue: string;
  // 공연 선택 화면에서 저장된 선택을 복원하기 위한 식별자
  group: string;
  dateId: string;
  sessionId: number;
};

// 공연 선택 화면의 회차 한 건
export type ShowSession = {
  id: number;
  group: string;
  dateId: string;
  title: string;
  round: number;
  // 예: 18:00
  time: string;
  venue: string;
};

export type Train = {
  id: string;
  // KTX / SRT / ITX-새마을 / 무궁화호
  type: string;
  number?: string;
  from: string;
  to: string;
  // 예: 12/05(토)
  date: string;
  // 예: 23:40
  time: string;
};

export type RiskStatus = "safe" | "caution" | "warn" | "danger";

export type RouteSegment = {
  type: "crowd" | "walk" | "subway" | "transfer";
  // 막대 길이 비율
  flex: number;
  // 지하철일 때 호선
  line?: "2" | "4";
};

export type RouteStep = {
  time: string;
  title: string;
  desc: string;
  kind: "start" | "board" | "end";
  line?: "2" | "4";
};
