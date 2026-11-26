import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chip, OptionCard, SearchInput } from "../../components/common";
import { PageLayout } from "../../components/layout";
import { GROUPS, SHOW_DATES, SHOW_SESSIONS } from "../../constants/return";
import { useReturnStore } from "../../stores/returnStore";
import { cn } from "../../utils/cn";

// 02 공연 선택
export default function ShowSelectPage() {
  const navigate = useNavigate();
  const savedShow = useReturnStore((s) => s.show);
  const setShow = useReturnStore((s) => s.setShow);

  const [query, setQuery] = useState("");
  // 이미 고른 공연이 있으면 그 선택에서 시작해요 (처음 들어올 때는 스토어 기본값)
  const [group, setGroup] = useState(savedShow.group);
  const [dateId, setDateId] = useState(savedShow.dateId);
  const [sessionId, setSessionId] = useState(savedShow.sessionId);

  const date = SHOW_DATES.find((d) => d.id === dateId) ?? SHOW_DATES[0];
  const [month, day] = date.label.split("/").map(Number);

  // 그룹·날짜·검색어에 맞는 회차만 보여줘요
  const keyword = query.trim().toLowerCase();
  const visibleSessions = SHOW_SESSIONS.filter(
    (s) =>
      s.group === group &&
      s.dateId === date.id &&
      (keyword === "" || s.title.toLowerCase().includes(keyword)),
  );
  // 고른 회차가 목록에서 사라졌으면 첫 회차로 보고, 목록이 비면 선택 없음
  const selectedSession =
    visibleSessions.find((s) => s.id === sessionId) ??
    visibleSessions[0] ??
    null;

  const handleNext = () => {
    if (!selectedSession) return;
    setShow({
      title: selectedSession.title,
      date: `${date.label}(${date.day}) ${selectedSession.time}`,
      venue: selectedSession.venue,
      group,
      dateId: date.id,
      sessionId: selectedSession.id,
    });
    navigate("/return/setup");
  };

  return (
    <PageLayout
      title="공연 선택"
      bodyClassName="gap-[18px]"
      footer={
        <Button size="lg" disabled={!selectedSession} onClick={handleNext}>
          귀가 설정하기
        </Button>
      }
    >
      <SearchInput
        large
        placeholder="아티스트·공연 검색"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <Chip key={g} selected={group === g} onClick={() => setGroup(g)}>
            {g}
          </Chip>
        ))}
      </div>

      <section className="flex flex-col gap-[10px]">
        <h2 className="text-title-s text-gray-900">공연 날짜</h2>
        <div className="flex gap-2">
          {SHOW_DATES.map((d) => {
            const selected = d.id === dateId;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setDateId(d.id)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-button border-[1.5px] py-3 transition-colors",
                  selected
                    ? "border-green-600 bg-green-600"
                    : "border-pink-300 bg-gray-0",
                )}
              >
                <span
                  className={cn(
                    "text-caption-m",
                    selected ? "text-green-100" : "text-gray-500",
                  )}
                >
                  {d.day}
                </span>
                <span
                  className={cn(
                    "text-title-s",
                    selected ? "text-gray-0" : "text-gray-900",
                  )}
                >
                  {d.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-[10px]">
        <h2 className="text-title-s text-gray-900">
          {month}월 {day}일 공연 {visibleSessions.length}회
        </h2>
        {visibleSessions.length === 0 ? (
          <p className="rounded-input bg-gray-0 px-4 py-8 text-center text-caption-r text-gray-600">
            조건에 맞는 공연이 없어요.
          </p>
        ) : (
          visibleSessions.map((s) => (
            <OptionCard
              key={s.id}
              name="session"
              checked={selectedSession?.id === s.id}
              onChange={() => setSessionId(s.id)}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="truncate text-body-m-bold text-gray-900">
                  {s.title}
                </p>
                <p className="text-caption-r text-gray-600">
                  {s.round}회차 · {s.time} 시작 · {s.venue}
                </p>
              </div>
            </OptionCard>
          ))
        )}
      </section>

      <p className="flex justify-center gap-1 text-caption-r">
        <span className="text-gray-600">찾는 공연이 없나요?</span>
        {/* TODO: 제보 화면/폼 연결 */}
        <button type="button" className="text-caption-m text-green-600">
          공연 정보 제보하기
        </button>
      </p>
    </PageLayout>
  );
}
