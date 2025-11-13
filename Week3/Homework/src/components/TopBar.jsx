/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../styles/theme";

export default function TopBar({ tab, onChange }) {
  return (
    <div
      css={css({
        background: theme.color.bg, 
        paddingTop: 40,
        paddingBottom: 40, 
      })}
    >
    <header
      css={css({
        width: "1300px",
        maxWidth: 1400,
        margin: "0 auto", 
        padding: "18px 30px",
        borderRadius: theme.radius.lg,
        background: theme.color.panel,
        boxShadow: `0 6px 24px ${theme.color.shadow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <h1
        css={css({
          margin: 0,
          fontSize: 25,
          color: theme.color.text,
          fontWeight: 700,
        })}
      >
        숫자 카드 짝 맞추기
      </h1>
      <nav css={css({ display: "flex", gap: 10 })}>
        {[
          { key: "play", label: "게임" },
          { key: "records", label: "랭킹" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            css={css({
              padding: "8px 18px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 16,
              background:
                tab === t.key ? theme.color.primary : theme.color.cardFront,
              color: tab === t.key ? theme.color.white : theme.color.text,
              transition: "all .15s",
            })}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
    </div>
  );
}
