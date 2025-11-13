/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../styles/theme";
import { clearLogs, readLogs } from "../utils/storage";
import { dateLabel, msToSec2 } from "../utils/format";
import { useState } from "react";

export default function RankView() {
  const [rows, setRows] = useState(readLogs());

  const onClear = () => {
    clearLogs();
    setRows([]);
  };

  return (
    <section
      css={css({
        width: "100%",
        minHeight: "100vh",
        background: theme.color.bg,
      })}
    >
      <div
        css={css({
          width: "1290px",
          maxWidth: 1400,
          minHeight: 750,
          margin: "2px auto",
          padding: "32px 30px",
          background: theme.color.panel,
          borderRadius: theme.radius.lg,
          boxShadow: `0 6px 24px ${theme.color.shadow}`,
        })}
      >
        {/* 제목 + 기록 초기화  */}
        <div
          css={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            padding: "0 5px",
          })}
        >
          <h2 css={css({ margin: 0 })}>랭킹 보드</h2>
          <button
            onClick={onClear}
            css={css({
              background: theme.color.bad,
              color: theme.color.white,
              border: "none",
              padding: "8px 16px",
              borderRadius: 999,
              fontWeight: 700,
              cursor: "pointer",
            })}
          >
            기록 초기화
          </button>
        </div>

        <div
          css={css({
            background: theme.color.yellow,
            border: `1px solid ${theme.color.line}`,
            borderRadius: 10,
            padding: "14px 12px",
            minHeight: 700,
          })}
        >
          {rows.length === 0 ? (
            <div
              css={css({
                padding: "48px 0",
                textAlign: "center",
                display: "flex",           
                alignItems: "center",      
                justifyContent: "center",  
                minHeight: 600,    
                color: theme.color.sub,
                fontWeight: 600,
              })}
            >
              게임 기록이 없습니다
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                css={css({
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "transparent",
                })}
              >
                <thead
                  css={css({
                    background: theme.color.cardFront,
                  })}
                >
                  <tr>
                    {["순위", "레벨", "클리어 시간(초)", "기록 시작"].map((h) => (
                      <th
                        key={h}
                        css={css({
                          textAlign: "left",
                          padding: "10px 8px",
                          whiteSpace: "nowrap",
                        })}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} css={rowCss}>
                      <td css={tdCss}>{i + 1}</td>
                      <td css={tdCss}>Level {r.level}</td>
                      <td css={tdCss}>{msToSec2(r.clearMs)}</td>
                      <td css={tdCss}>{dateLabel(r.startedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* 표 */
const tdCss = css({
  padding: "10px 8px",
  whiteSpace: "nowrap",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
});

const rowCss = css({
  transition: "background-color .15s ease, transform .05s ease",
  cursor: "default",
  ":hover": {
    backgroundColor: "rgba(0,0,0,0.04)", 
  },
});
