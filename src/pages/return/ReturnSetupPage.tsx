import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../assets/icons/Plus.svg";
import { Button, Chip, Icon, Toast, Toggle } from "../../components/common";
import { PageLayout } from "../../components/layout";
import { TIMING_OPTIONS } from "../../components/notification";
import { SelectedShowCard, TrainSummary } from "../../components/return";
import { DEPARTURE } from "../../constants/return";
import { useToast } from "../../hooks/useToast";
import { useReturnStore } from "../../stores/returnStore";
import { loadAlertSettings, saveAlertSettings } from "../../utils/notification";
import type { AlertSettings } from "../../utils/notification";

const DESTINATION_REQUIRED_MESSAGE = "귀가 목적지를 입력해 주세요";

// 03 귀가 설정
export default function ReturnSetupPage() {
  const navigate = useNavigate();
  const { show, trains, selectedTrainId, destination, setDestination } =
    useReturnStore();
  const selectedTrain = trains.find((t) => t.id === selectedTrainId);
  const { message, show: showToast } = useToast();

  // 알림 화면(06-A/06-C)과 같은 저장된 설정을 읽고 갱신해요
  const [alerts, setAlerts] = useState<AlertSettings>(loadAlertSettings);

  const updateAlerts = (next: Partial<AlertSettings>) => {
    setAlerts((prev) => ({ ...prev, ...next }));
    saveAlertSettings(next);
  };

  const handleAnalyze = () => {
    if (!destination.trim()) {
      showToast(DESTINATION_REQUIRED_MESSAGE);
      return;
    }
    navigate("/return/result");
  };

  return (
    <>
      <PageLayout
        title="귀가 설정"
        bodyClassName="gap-4"
        footer={
          <Button size="lg" onClick={handleAnalyze}>
            귀가 분석하기
          </Button>
        }
      >
        <SelectedShowCard
          show={show}
          onChange={() => navigate("/show/select")}
        />

        <div className="flex flex-col divide-y divide-gray-200 rounded-3xl bg-gray-0">
          <div className="flex items-center gap-3 px-[18px] py-4">
            <span className="size-3 shrink-0 rounded-full border-[3px] border-green-600 bg-gray-0" />
            <span className="text-caption-r text-gray-500">출발</span>
            <p className="text-body-l text-gray-900">{DEPARTURE}</p>
          </div>
          <label className="flex items-center gap-3 px-[18px] py-4">
            <span className="size-3 shrink-0 rounded-full bg-pink-500" />
            <span className="text-caption-r text-gray-500">도착</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="귀가 목적지 검색"
              className="min-w-0 flex-1 bg-transparent text-body-l text-gray-900 outline-none placeholder:text-gray-500"
            />
          </label>
        </div>

        <section className="flex flex-col gap-[10px]">
          <h2 className="text-title-s text-gray-900">고정 이동수단</h2>
          {selectedTrain && (
            <div className="flex items-center gap-3 rounded-input border-[1.5px] border-pink-300 bg-gray-0 p-[14px]">
              <TrainSummary train={selectedTrain} active />
            </div>
          )}
          <button
            type="button"
            onClick={() => navigate("/return/train")}
            className="flex items-center justify-center gap-1 rounded-cta border-[1.5px] border-green-700 bg-green-50 py-[15px] text-body-m-bold text-gray-900"
          >
            <Icon src={plusIcon} className="size-4" />
            기차 정보 추가하기
          </button>
        </section>

        <section className="flex flex-col gap-[14px] rounded-3xl bg-gray-0 p-[18px]">
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-body-m-bold text-gray-900">퇴장 알림 받기</p>
              <p className="text-caption-r text-gray-600">
                권장 퇴장 시각 전에 알려드려요
              </p>
            </div>
            <Toggle
              checked={alerts.exitAlert}
              onChange={(checked) => updateAlerts({ exitAlert: checked })}
              aria-label="퇴장 알림 받기"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-caption-m text-gray-600">알림 시점</p>
            {TIMING_OPTIONS.map((minute) => (
              <Chip
                key={minute}
                selected={alerts.timing === minute}
                disabled={!alerts.exitAlert}
                onClick={() => updateAlerts({ timing: minute })}
              >
                {minute}분 전
              </Chip>
            ))}
          </div>
        </section>

        <p className="text-center text-caption-r text-gray-600">
          알림을 꺼도 귀가 분석은 그대로 이용할 수 있어요.
        </p>
      </PageLayout>

      <Toast message={message} className="bottom-[120px]" />
    </>
  );
}
