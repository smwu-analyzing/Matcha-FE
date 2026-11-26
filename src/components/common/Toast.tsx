import { cn } from "../../utils/cn";

type ToastProps = {
  // null이면 보이지 않아요
  message: string | null;
  // 세로 위치는 쓰는 화면에서 정해요 (예: "bottom-[154px]", "top-6")
  className?: string;
};

export default function Toast({ message, className }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 mx-auto w-fit max-w-[353px] rounded-button bg-green-500 px-4 py-3 text-center text-caption-m text-gray-0 shadow-card",
        className,
      )}
    >
      {message}
    </div>
  );
}
