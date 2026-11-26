import { useState } from "react";
import { useNavigate } from "react-router-dom";
import character from "../../assets/characters/danger.png";
import { Button, Toggle } from "../../components/common";
import { NotificationLayout, TimingRow } from "../../components/notification";
import type { Timing } from "../../components/notification";
import { loadAlertSettings, saveAlertSettings } from "../../utils/notification";
import type { AlertSettings } from "../../utils/notification";

export default function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [timing, setTiming] = useState<Timing>(10);
  const [alerts, setAlerts] = useState(loadAlertSettings);

  const updateAlerts = (next: Partial<AlertSettings>) => {
    const merged = { ...alerts, ...next };
    setAlerts(merged);
    saveAlertSettings(merged);
  };

  return (
    <NotificationLayout
      footer={
        <Button size="lg" onClick={() => navigate("/home")}>
          완료
        </Button>
      }
    >
      <section className="flex items-center gap-2 rounded-card bg-green-100 p-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h2 className="text-title-l text-gray-900">
            퇴장 알림이
            <br />
            켜졌어요!
          </h2>
          <p className="text-caption-r text-gray-700">
            공연 중에 딱 맞는 시간에 알려드릴게요.
          </p>
        </div>
        <img
          src={character}
          alt=""
          className="h-[82px] w-[79px] shrink-0 object-cover"
        />
      </section>

      <div className="flex flex-col divide-y divide-gray-100 rounded-3xl bg-gray-0">
        <div className="flex items-center gap-3 px-4 py-[14px]">
          <div className="flex min-w-0 flex-1 flex-col gap-px">
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
        <div className="flex items-center gap-3 px-4 py-[14px]">
          <div className="flex min-w-0 flex-1 flex-col gap-px">
            <p className="text-body-m-bold text-gray-900">막차 위험 알림</p>
            <p className="text-caption-r text-gray-600">
              막차를 놓칠 수 있을 때 알려드려요
            </p>
          </div>
          <Toggle
            checked={alerts.riskAlert}
            onChange={(checked) => updateAlerts({ riskAlert: checked })}
            aria-label="막차 위험 알림"
          />
        </div>
        <TimingRow value={timing} onChange={setTiming} />
      </div>
    </NotificationLayout>
  );
}
