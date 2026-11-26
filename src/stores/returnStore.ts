import { create } from "zustand";
import { DEPARTURE, INITIAL_TRAINS, RESULT } from "../constants/return";
import type { Train, ReturnShow } from "../types/return";

type ReturnState = {
  show: ReturnShow;
  trains: Train[];
  selectedTrainId: string | null;
  destination: string;
  // 귀가 분석을 마친 뒤 홈을 '남은 시간' 상태로 바꾸기 위한 값
  exitTime: string | null;
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
  },
  trains: INITIAL_TRAINS,
  selectedTrainId: INITIAL_TRAINS[0].id,
  destination: "",
  exitTime: null,
  setShow: (show) => set({ show }),
  selectTrain: (id) => set({ selectedTrainId: id }),
  addTrain: (train) =>
    set((state) => ({
      trains: [...state.trains, train],
      selectedTrainId: train.id,
    })),
  setDestination: (destination) => set({ destination }),
  // TODO: API 연동 시 분석 결과의 권장 퇴장 시각으로 교체
  confirmPlan: () => set({ exitTime: RESULT.exitTime }),
}));
