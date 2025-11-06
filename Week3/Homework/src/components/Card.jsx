/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../styles/theme";

export default function Card({ data, onClick, size = 96 }) {
  const flipped = data.open || data.done;

  return (
    <div
      onClick={onClick}
      css={css({
        width: size,
        height: size,
        perspective: 800,
        cursor: data.done ? "default" : "pointer",
      })}
    >
      <div
        css={css({
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform .3s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
        })}
      >
        {/* 앞면: 물음표 */}
        <div
          css={css({
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            borderRadius: theme.radius.md,
            background: theme.color.cardBack,
            color: theme.color.white,
            fontSize: 30,
            fontWeight: 700,
            border: `2px solid ${theme.color.line}`,
          })}
        >
          ?
        </div>

        {/* 뒷면: 숫자 */}
        <div
          css={css({
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: theme.radius.md,
            background: data.done ? theme.color.primaryDark : theme.color.cardFront,
            color: data.done ? theme.color.white : theme.color.text,
            fontSize: 30,
            fontWeight: 700,
            border: `2px solid ${theme.color.line}`,
            transition: "background .2s",
          })}
        >
          {data.value}
        </div>
      </div>
    </div>
  );
}
