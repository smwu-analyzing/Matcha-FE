import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import character from "../../assets/characters/warn.png";
import { Button } from "../../components/common";
import { NotificationLayout } from "../../components/notification";
import {
  getNotificationState,
  isNotificationOn,
  requestNotificationPermission,
  saveAlertSettings,
} from "../../utils/notification";

const STEPS = [
  { title: "설정 열기", desc: "기기 설정 앱으로 이동해요" },
  { title: "알림 선택", desc: "앱 목록에서 막차 골든타임을 눌러요" },
  { title: "알림 허용 켜기", desc: "알림 허용 스위치를 켜주세요" },
];

// 06-B 알림 꺼짐 안내
export default function NotificationOffPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 브라우저 설정에서 켜고 돌아오면 설정 화면으로 보내요
    const check = () => {
      if (isNotificationOn())
        navigate("/notification/settings", { replace: true });
    };
    check();
    window.addEventListener("focus", check);
    return () => window.removeEventListener("focus", check);
  }, [navigate]);

  const handleOpenSettings = async () => {
    const state =
      getNotificationState() === "granted"
        ? "granted"
        : await requestNotificationPermission();
    if (state === "granted") {
      // 브라우저 권한은 허용된 상태에서 앱 알림만 꺼둔 경우도 다시 켜요
      saveAlertSettings({ exitAlert: true, riskAlert: true });
      navigate("/notification/settings", { replace: true });
    }
  };

  return (
    <NotificationLayout
      footer={
        <>
          <Button size="lg" onClick={handleOpenSettings}>
            알림 켜기
          </Button>
          <Button variant="ghost" onClick={() => navigate("/home")}>
            알림 없이 계속하기
          </Button>
        </>
      }
    >
      <section className="flex flex-col items-center gap-1.5 rounded-card border-[1.5px] border-pink-300 bg-gray-0 p-5 text-center">
        <img
          src={character}
          alt=""
          className="h-[141px] w-[132px] object-cover"
        />
        <h2 className="text-title-l text-gray-900">알림이 꺼져 있어요</h2>
        <p className="text-caption-r text-gray-700">
          알림 권한이 꺼져 있으면 퇴장 시각을 놓칠 수 있어요.
          <br />
          아래 순서로 켜주세요.
        </p>
      </section>

      <ol className="flex flex-col gap-[14px] rounded-3xl bg-gray-0 p-4">
        {STEPS.map(({ title, desc }, index) => (
          <li key={title} className="flex items-center gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[14px] bg-green-600 text-caption-m text-gray-0">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-px">
              <p className="text-body-m-bold text-gray-900">{title}</p>
              <p className="text-caption-r text-gray-600">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </NotificationLayout>
  );
}
