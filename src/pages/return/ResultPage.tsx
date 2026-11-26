import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { PageLayout } from "../../components/layout";
import { FactsList, RiskBadge, TimeCompare } from "../../components/result";
import { DEPARTURE, RESULT } from "../../constants/return";
import { useReturnStore } from "../../stores/returnStore";
import { loadAlertSettings } from "../../utils/notification";
import { getNotificationRoute } from "../../utils/notificationRoute";
import { subtractMinutes } from "../../utils/time";

// 04 귀가 분석 결과
export default function ResultPage() {
  const navigate = useNavigate();
  const { destination, confirmPlan } = useReturnStore();
  const { risk } = RESULT;
  const { exitAlert, timing } = loadAlertSettings();
  const alertTime = subtractMinutes(RESULT.exitTime, timing);

  // 알림 설정을 시작하면 귀가 계획이 확정돼서 홈이 실시간 상태로 바뀌어요
  const handleSetAlert = () => {
    confirmPlan();
    navigate(getNotificationRoute());
  };

  return (
    <PageLayout
      title="귀가 분석 결과"
      footer={
        <div className="flex gap-[10px]">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => navigate("/return/route")}
          >
            경로 상세
          </Button>
          <Button size="lg" className="flex-1" onClick={handleSetAlert}>
            퇴장 알림 설정
          </Button>
        </div>
      }
    >
      <p className="whitespace-pre text-center text-caption-r text-gray-900">
        {`${DEPARTURE}  →  ${destination || "○○역(집)"}`}
      </p>

      <section className="flex flex-col gap-1 rounded-card bg-green-600 p-5">
        <p className="text-caption-m text-green-100">권장 퇴장 시각</p>
        <p className="text-display-xl text-gray-0">{RESULT.exitTime}</p>
        <p className="text-caption-r text-green-100">
          {exitAlert
            ? `공연 중 ${alertTime}에 알림을 보내드려요`
            : "퇴장 알림이 꺼져 있어요"}
        </p>
      </section>

      <section className="flex flex-col gap-[10px] rounded-input border-[1.5px] border-pink-300 bg-gray-0 p-4">
        <RiskBadge status={risk.status} label={risk.label} level={risk.level} />
        <p className="text-body-m-bold text-gray-900">{risk.message}</p>
      </section>

      <FactsList facts={RESULT.facts} />
      <TimeCompare axis={RESULT.axis} />
    </PageLayout>
  );
}
