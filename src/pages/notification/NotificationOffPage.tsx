import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import character from "../../assets/characters/warn.webp";
import { Button, Toast } from "../../components/common";
import { NotificationLayout } from "../../components/notification";
import { useToast } from "../../hooks/useToast";
import {
  getNotificationState,
  isNotificationOn,
  requestNotificationPermission,
  saveAlertSettings,
} from "../../utils/notification";

// 브라우저에서 차단된 알림을 허용으로 바꾸는 방법
const STEPS = [
  { title: "사이트 정보 열기", desc: "주소창 왼쪽 아이콘을 눌러요" },
  { title: "알림 찾기", desc: "사이트 설정에서 알림 항목을 찾아요" },
  {
    title: "알림 허용으로 바꾸기",
    desc: "허용으로 바꾼 뒤 이 화면으로 돌아와요",
  },
];

const BLOCKED_MESSAGE =
  "알림이 차단되어 있어요. 주소창 왼쪽 아이콘에서 허용해 주세요.";

// 06-B 알림 꺼짐 안내
export default function NotificationOffPage() {
  const navigate = useNavigate();
  const { message, show } = useToast();

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

  const handleTurnOn = async () => {
    const current = getNotificationState();

    // 이미 차단된 권한은 다시 물어볼 수 없어서 방법만 안내해요
    if (current === "denied" || current === "unsupported") {
      show(BLOCKED_MESSAGE);
      return;
    }

    const state =
      current === "granted" ? "granted" : await requestNotificationPermission();

    if (state === "granted") {
      // 브라우저 권한은 허용된 상태에서 앱 알림만 꺼둔 경우도 다시 켜요
      saveAlertSettings({ exitAlert: true, riskAlert: true });
      navigate("/notification/settings", { replace: true });
    } else {
      show(BLOCKED_MESSAGE);
    }
  };

  return (
    <>
      <Toast message={message} className="bottom-[154px]" />
      <NotificationLayout
        footer={
          <>
            <Button size="lg" onClick={handleTurnOn}>
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
    </>
  );
}
