import { create } from "zustand";
import {
  DEPARTURE,
  INITIAL_TRAINS,
  RESULT,
  SHOW_DATES,
  SHOW_YEAR,
} from "../constants/return";
import type { ReturnShow, Train } from "../types/return.ts";
import { toTimestamp } from "../utils/time";

type ReturnState = {
  show: ReturnShow;
  trains: Train[];
  selectedTrainId: string | null;
  destination: string;
  // 권장 퇴장 시각(공연 날짜 포함, timestamp ms). 귀가 계획 확정 전에는 null
  exitAt: number | null;
  setShow: (show: ReturnShow) => void;
  selectTrain: (id: string) => void;
  // 직접 추가한 기차는 바로 선택돼요
  addTrain: (train: Train) => void;
  setDestination: (destination: string) => void;
  confirmPlan: () => void;
};

export const useReturnStore = create<ReturnState>((set) => ({
  show: {
    title: "A그룹 WORLD TOUR IN SEOUL",
    date: "12/05(토) 18:00",
    venue: DEPARTURE,
    group: "A그룹",
    dateId: "12-05",
    sessionId: 2,
  },
  trains: INITIAL_TRAINS,
  selectedTrainId: INITIAL_TRAINS[0].id,
  destination: "",
  exitAt: null,
  // 다른 회차를 고르면 이전에 확정한 귀가 계획은 지워요
  setShow: (show) =>
    set((state) => ({
      show,
      exitAt: state.show.sessionId === show.sessionId ? state.exitAt : null,
    })),
  selectTrain: (id) => set({ selectedTrainId: id }),
  addTrain: (train) =>
    set((state) => ({
      trains: [...state.trains, train],
      selectedTrainId: train.id,
    })),
  setDestination: (destination) => set({ destination }),
  // TODO: API 연동 시 분석 결과의 권장 퇴장 시각으로 교체
  confirmPlan: () =>
    set((state) => {
      const date = SHOW_DATES.find((d) => d.id === state.show.dateId);
      if (!date) return {};
      return {
        exitAt: toTimestamp(SHOW_YEAR, date.label, RESULT.exitTime),
      };
    }),
}));
