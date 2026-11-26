import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import closeIcon from "../../assets/icons/Close.svg";
import swapIcon from "../../assets/icons/Swap.svg";
import { Button, Chip, Icon, TextField } from "../common";
import { TRAIN_TYPES } from "../../constants/return";
import type { Train } from "../../types/return.ts";

type TrainAddSheetProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (train: Train) => void;
};

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

// 03-C 예매 내역 직접 추가 (바텀시트)
export default function TrainAddSheet({
  open,
  onClose,
  onSubmit,
}: TrainAddSheetProps) {
  const [type, setType] = useState(TRAIN_TYPES[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");

  const dialogRef = useRef<HTMLFormElement>(null);
  // 부모가 onClose를 매번 새로 만들어도 포커스 효과가 다시 돌지 않게 ref로 들고 있어요
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // 열릴 때 포커스를 시트 안으로 옮기고, 열린 동안 Tab을 시트 안에서만 돌리고,
  // 닫힐 때 열기 전에 포커스가 있던 요소로 돌려줘요. ESC로도 닫혀요.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    (dialog?.querySelector("input") ?? getFocusable()[0])?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !dialog?.contains(active);

      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const canSubmit = from.trim() && to.trim() && date.trim() && time.trim();

  // input 값이 바뀔 때 해당 state를 갱신하는 핸들러 만들기
  const bind =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      id: `train-${Date.now()}`,
      type,
      number: number.trim() || undefined,
      from: from.trim(),
      to: to.trim(),
      date: date.trim(),
      time: time.trim(),
    });
    setFrom("");
    setTo("");
    setDate("");
    setTime("");
    setNumber("");
    setType(TRAIN_TYPES[0]);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-gray-900/45"
        onClick={onClose}
        aria-hidden
      />
      <form
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="예매 내역 직접 추가"
        onSubmit={handleSubmit}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[92vh] w-full max-w-[393px] flex-col gap-4 overflow-y-auto rounded-t-[32px] bg-gray-0 px-5 pb-[34px] pt-3 shadow-[0_-8px_12px_rgba(0,0,0,0.12)]"
      >
        <div className="flex justify-center">
          <div className="h-1 w-10 rounded-sm bg-gray-200" />
        </div>

        <div className="flex items-start">
          <div className="flex flex-1 flex-col gap-0.5">
            <h2 className="text-title-m text-gray-900">예매 내역 직접 추가</h2>
            <p className="text-caption-r text-gray-600">
              승차권에 적힌 내용을 입력해주세요.
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-gray-700"
          >
            <Icon src={closeIcon} className="size-[22px]" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-caption-m text-gray-600">열차 종류</p>
          <div className="flex flex-wrap gap-2">
            {TRAIN_TYPES.map((t) => (
              <Chip key={t} selected={type === t} onClick={() => setType(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-2">
          <TextField
            label="출발역"
            placeholder="예: 서울역"
            value={from}
            onChange={bind(setFrom)}
          />
          <button
            type="button"
            aria-label="출발역과 도착역 바꾸기"
            onClick={handleSwap}
            className="mb-[7px] flex size-9 shrink-0 items-center justify-center rounded-[18px] bg-pink-200 text-green-600"
          >
            <Icon src={swapIcon} className="size-[18px]" />
          </button>
          <TextField
            label="도착역"
            placeholder="예: 부산역"
            value={to}
            onChange={bind(setTo)}
          />
        </div>

        <div className="flex gap-[10px]">
          <TextField
            label="출발 날짜"
            placeholder="예: 12/05(토)"
            value={date}
            onChange={bind(setDate)}
          />
          <TextField
            label="출발 시각"
            placeholder="예: 23:40"
            value={time}
            onChange={bind(setTime)}
          />
        </div>

        <TextField
          label="열차 번호 (선택)"
          placeholder="예: 231"
          inputMode="numeric"
          value={number}
          onChange={bind(setNumber)}
        />

        <Button size="lg" type="submit" disabled={!canSubmit}>
          추가하기
        </Button>
      </form>
    </div>
  );
}
