import { useNavigate } from "react-router-dom";
import { Button, SearchInput } from "../../components/common";
import {
  EmptyHeroCard,
  HeroCard,
  HomeHeader,
  UpcomingShows,
} from "../../components/home";
import { RESULT } from "../../constants/return";
import { getStatus } from "../../constants/status";
import { useReturnPercent } from "../../hooks/useReturnPercent";
import { useReturnStore } from "../../stores/returnStore";
import type { Show } from "../../types/show";
import {
  getNotificationState,
  isNotificationOn,
} from "../../utils/notification";

// TODO: API 연동 전 임시 데이터
const UPCOMING_SHOWS: Show[] = [
  {
    id: 1,
    title: "A그룹 WORLD TOUR IN SEOUL",
    date: "2026.12.05(토) 18:00",
    venue: "KSPO DOME",
  },
  {
    id: 2,
    title: "B그룹 단독 콘서트",
    date: "2026.12.13(일) 17:00",
    venue: "KSPO DOME",
  },
  {
    id: 3,
    title: "C그룹 팬콘서트",
    date: "2026.12.20(일) 15:00",
    venue: "KSPO DOME",
  },
];

type HomePageProps = {
  // 미리보기처럼 값을 직접 넘기면 그 값을 써요.
  // 넘기지 않으면 귀가 설정 + 현재 시각으로 계산한 값을 써요 (설정 전에는 null)
  percent?: number | null;
};

export default function HomePage({ percent: percentOverride }: HomePageProps) {
  const navigate = useNavigate();
  const show = useReturnStore((s) => s.show);
  const livePercent = useReturnPercent();
  const percent = percentOverride !== undefined ? percentOverride : livePercent;
  const status = percent === null ? null : getStatus(percent);

  const handleBellClick = () => {
    if (getNotificationState() === "default") {
      // 아직 허용/차단을 안 정했으면 권한 요청 화면(06-A)
      navigate("/notification/permission");
    } else if (isNotificationOn()) {
      navigate("/notification/settings");
    } else {
      // 차단했거나 토글을 모두 꺼둔 상태
      navigate("/notification/off");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[393px] flex-col gap-4 px-5 pb-10 pt-2">
      <HomeHeader onNotificationClick={handleBellClick} />
      <SearchInput large placeholder="아티스트·공연 검색" />

      {percent === null ? (
        <EmptyHeroCard />
      ) : (
        <>
          <HeroCard
            showTitle={show.title}
            percent={percent}
            recommendedExit={RESULT.exitTime}
            lastTrain={RESULT.axis.lastTrain}
          />
          {/* 막차를 놓친 경우(0%)에는 경로 보기 버튼이 없어요 */}
          {status !== "danger" && (
            <Button
              variant={status === "safe" ? "primary" : "soft"}
              size="lg"
              className={
                status === "caution"
                  ? "bg-pink-100"
                  : status === "warn"
                    ? "bg-pink-200"
                    : undefined
              }
              onClick={() => navigate("/return/route")}
            >
              지금 퇴장하고 귀가 경로 보기
            </Button>
          )}
        </>
      )}

      <UpcomingShows shows={UPCOMING_SHOWS} />
    </main>
  );
}
