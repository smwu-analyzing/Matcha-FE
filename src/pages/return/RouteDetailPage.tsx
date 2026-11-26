import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { PageLayout } from "../../components/layout";
import { RouteSummary, RouteTimeline } from "../../components/route";
import { ROUTE } from "../../constants/return";
import { getNotificationRoute } from "../../utils/notificationRoute.ts";
import { useReturnStore } from "../../stores/returnStore";

export default function RouteDetailPage() {
  const navigate = useNavigate();
  const confirmPlan = useReturnStore((s) => s.confirmPlan);

  const handleSetAlert = () => {
    confirmPlan();
    navigate(getNotificationRoute());
  };

  return (
    <PageLayout
      title="귀가 경로 상세"
      bodyClassName="gap-4"
      footer={
        <Button size="lg" onClick={handleSetAlert}>
          알림 설정하고 관람하기
        </Button>
      }
    >
      <RouteSummary
        totalMinutes={ROUTE.totalMinutes}
        crowdMinutes={ROUTE.crowdMinutes}
        depart={ROUTE.depart}
        arrive={ROUTE.arrive}
        segments={ROUTE.segments}
      />
      <RouteTimeline steps={ROUTE.steps} />
      <p className="text-center text-caption-r text-gray-600">
        지원 노선 (서울교통공사) 시간표 기준이며,
        <br />
        실시간 지연은 반영되지 않아요.
      </p>
    </PageLayout>
  );
}
