import { useCallback, useEffect, useRef, useState } from "react";

// 몇 초 동안 메시지를 보여주고 사라지게 해요
export function useToast(duration = 3000) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback(
    (text: string) => {
      setMessage(text);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), duration);
    },
    [duration],
  );

  // 화면을 벗어나면 타이머 정리
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { message, show };
}
