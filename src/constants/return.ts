import type {
  RiskStatus,
  RouteSegment,
  RouteStep,
  Train,
} from "../types/return";

// TODO: API 연동 전 임시 데이터

export const GROUPS = ["A그룹", "B그룹", "C그룹", "D그룹"];

export const SHOW_DATES = [
  { id: "12-05", day: "토", label: "12/05" },
  { id: "12-06", day: "일", label: "12/06" },
  { id: "12-13", day: "토", label: "12/13" },
  { id: "12-14", day: "일", label: "12/14" },
];

export const DEPARTURE = "KSPO DOME";

export const SHOW_SESSIONS = [
  {
    id: 1,
    title: "A그룹 WORLD TOUR IN SEOUL",
    round: 1,
    time: "14:00",
    venue: DEPARTURE,
  },
  {
    id: 2,
    title: "A그룹 WORLD TOUR IN SEOUL",
    round: 2,
    time: "18:00",
    venue: DEPARTURE,
  },
];

export const INITIAL_TRAINS: Train[] = [
  {
    id: "ktx-231",
    type: "KTX",
    number: "231",
    from: "서울역",
    to: "부산역",
    date: "12/05(토)",
    time: "23:40",
  },
  {
    id: "ktx-245",
    type: "KTX",
    number: "245",
    from: "서울역",
    to: "부산역",
    date: "12/06(일)",
    time: "06:30",
  },
];

export const TRAIN_TYPES = ["KTX", "SRT", "ITX-새마을", "무궁화호"];

export const RESULT: {
  exitTime: string;
  alertTime: string;
  risk: {
    status: RiskStatus;
    label: string;
    level: 1 | 2 | 3;
    message: string;
  };
  facts: { label: string; value: string; sub?: string }[];
  axis: {
    start: string;
    end: string;
    exit: string;
    lastTrain: string;
    endFrom: string;
    endTo: string;
  };
} = {
  exitTime: "21:50",
  alertTime: "21:40",
  risk: {
    status: "warn",
    label: "위험도 높음",
    level: 2,
    message: "끝까지 관람하면 막차(22:20)를 놓칠 수 있어요.",
  },
  facts: [
    { label: "예상 종료 시각", value: "22:05", sub: "(21:55~22:20)" },
    { label: "막차 승차 시각", value: "22:20", sub: "○○역 · 2호선" },
    { label: "퇴장 혼잡 여유", value: "20분" },
    { label: "도보·환승 이동", value: "10분" },
  ],
  axis: {
    start: "21:40",
    end: "22:30",
    exit: "21:50",
    lastTrain: "22:20",
    endFrom: "21:55",
    endTo: "22:20",
  },
};

export const ROUTE: {
  totalMinutes: number;
  crowdMinutes: number;
  depart: string;
  arrive: string;
  segments: RouteSegment[];
  steps: RouteStep[];
} = {
  totalMinutes: 82,
  crowdMinutes: 20,
  depart: "21:50",
  arrive: "23:12",
  segments: [
    { type: "crowd", flex: 74 },
    { type: "walk", flex: 36 },
    { type: "subway", flex: 90, line: "2" },
    { type: "transfer", flex: 13 },
    { type: "subway", flex: 90, line: "4" },
  ],
  steps: [
    {
      time: "21:50",
      title: "공연장 출구",
      desc: "퇴장 혼잡 약 20분 + 도보 10분",
      kind: "start",
    },
    {
      time: "22:20",
      title: "○○역 승차",
      desc: "막차 시간표 확인됨 · 24분 이동",
      kind: "board",
      line: "2",
    },
    {
      time: "22:44",
      title: "△△역 환승",
      desc: "환승 도보 4분 · 막차 22:50 승차 가능",
      kind: "board",
      line: "4",
    },
    {
      time: "23:12",
      title: "□□역 도착",
      desc: "귀가 목적지 인근",
      kind: "end",
    },
  ],
};
