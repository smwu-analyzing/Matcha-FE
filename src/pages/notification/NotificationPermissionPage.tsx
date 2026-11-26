import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bellIcon from "../../assets/icons/pink_Bell.svg";
import alertIcon from "../../assets/icons/alert.svg";
import character from "../../assets/characters/safe.png";
import { Button } from "../../components/common";
import { NotificationLayout, TimingRow } from "../../components/notification";
import type { Timing } from "../../components/notification";
import {
  loadAlertSettings,
  markNotificationPromptSeen,
  requestNotificationPermission,
  saveAlertSettings,
} from "../../utils/notification";

const BENEFITS = [
  {
    icon: bellIcon,
    title: "퇴장 알림",
    desc: "내가 정한 시점에 권장 퇴장 시각을 알려줘요",
  },
  {
    icon: alertIcon,
    title: "막차 위험 안내",
    desc: "관람을 이어가면 놓칠 수 있을 때 알려줘요",
  },
];

// 06-A 알림 권한 요청
export default function NotificationPermissionPage() {
  const navigate = useNavigate();
  const [timing, setTiming] = useState<Timing>(
    () => loadAlertSettings().timing,
  );

  useEffect(() => {
    markNotificationPromptSeen();
  }, []);

  const handleTimingChange = (next: Timing) => {
    setTiming(next);
    saveAlertSettings({ timing: next });
  };

  const handleAllow = async () => {
    const result = await requestNotificationPermission();
    if (result === "granted") {
      // 알림 시점은 그대로 두고 두 알림만 켜요
      saveAlertSettings({ exitAlert: true, riskAlert: true });
      navigate("/notification/settings");
    } else {
      navigate("/notification/off");
    }
  };

  return (
    <NotificationLayout
      footer={
        <>
          <p className="text-caption-r text-gray-600">
            알림은 설정에서 언제든 끌 수 있어요.
          </p>
          <Button size="lg" onClick={handleAllow}>
            알림 허용하기
          </Button>
          <Button variant="ghost" onClick={() => navigate("/home")}>
            나중에 할게요
          </Button>
        </>
      }
    >
      <section className="flex flex-col items-center gap-1.5 rounded-card bg-pink-200 p-5 text-center">
        <img
          src={character}
          alt=""
          className="h-[142px] w-[134px] object-cover"
        />
        <h2 className="text-title-l text-gray-900">
          퇴장 시간을 알림으로
          <br />
          놓치지 않게 알려드려요
        </h2>
        <p className="text-caption-r text-gray-700">
          알림을 켜면 공연 중에도 딱 맞는 퇴장 시각에 알려드려요.
        </p>
      </section>

      <ul className="flex flex-col gap-3 rounded-3xl bg-gray-0 p-4">
        {BENEFITS.map(({ icon, title, desc }) => (
          <li key={title} className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-pink-200">
              <img src={icon} alt="" className="size-5" />
            </div>
            <div className="flex min-w-0 flex-col gap-px">
              <p className="text-body-m-bold text-gray-900">{title}</p>
              <p className="text-caption-r text-gray-600">{desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-3xl bg-gray-0">
        <TimingRow value={timing} onChange={handleTimingChange} />
      </div>
    </NotificationLayout>
  );
}
