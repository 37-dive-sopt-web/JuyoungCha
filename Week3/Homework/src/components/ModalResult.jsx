/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import { msToSec2 } from "../utils/format";

export default function ModalResult({ open, win, level, elapsedMs, onAuto }) {
  const root = document.getElementById("overlay-root");
  const [count, setCount] = useState(3);

  // 0초 되었을 때 게임 다시 시작: 카운트다운 표시 
    useEffect(() => {
    if (!open) return;
    setCount(3);
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer);
          onAuto?.();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, onAuto]);

  if (!open || !root) return null;

  return createPortal(
    <div
      css={css({
        position: "fixed",
        inset: 0,
        background: theme.color.overlay,
        display: "grid",
        placeItems: "center",
        zIndex: 20,
      })}
    >
      <div
        css={css({
          width: "min(520px, 92vw)",
          background: theme.color.bg,
          borderRadius: theme.radius.xl,
          padding: 20,
          boxShadow: `0 12px 48px ${theme.color.shadow}`,
          textAlign: "center",
        })}
      >
        <h3
          css={css({
            margin: "10px 0 10px",
            fontSize: 22,
            color: theme.color.text,
            fontWeight: 700,
          })}
        >
          {win ? "축하해요!" : "실패했어요!"}
        </h3>

        <p css={css({ margin: 0, color: theme.color.sub })}>
          {win
            ? `Level ${level}을 ${msToSec2(elapsedMs)}초 만에 클리어했어요.`
            : `Level ${level} 도전에 실패했어요.`}
        </p>

        <p
          css={css({
            marginTop: 14,
            fontWeight: 700,
            color: win ? theme.color.ok : theme.color.bad,
          })}
        >
          {count}초 후 자동으로 새 게임을 시작합니다. (준비하세욥!)
        </p>
      </div>
    </div>,
    root
  );
}
