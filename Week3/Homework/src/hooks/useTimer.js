import { useCallback, useRef, useState } from "react";

export function useTimer(onFinish) {
  const [left, setLeft] = useState(0);
  const frame = useRef(null);
  const deadline = useRef(null);

  const loop = useCallback(() => {
    const remain = deadline.current - performance.now();
    if (remain <= 0) {
      setLeft(0);
      cancelAnimationFrame(frame.current);
      onFinish?.();
      return;
    }
    setLeft(remain);
    frame.current = requestAnimationFrame(loop);
  }, [onFinish]);

  const start = useCallback((ms) => {
    deadline.current = performance.now() + ms;
    setLeft(ms);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
  }, []);

  const reset = useCallback((ms) => {
    cancelAnimationFrame(frame.current);
    setLeft(ms);
  }, []);

  return { left, start, stop, reset };
}
