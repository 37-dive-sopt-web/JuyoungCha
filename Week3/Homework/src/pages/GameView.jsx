/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../styles/theme";
import Card from "../components/Card";
import ModalResult from "../components/ModalResult";
import { msToSec2 } from "../utils/format";
import { useGameEngine, STATE } from "../hooks/useGameEngine";

export default function GameView() {
  const g = useGameEngine(1);

  const [rows, cols] = g.grid;
  const size = g.level === 1 ? 145 : g.level === 2 ? 110 : 100;

  const successPairs = g.cards.filter((c) => c.done).length / 2;
  const totalPairs = g.cards.length / 2;
  const remainingPairs = totalPairs - successPairs;

  const guideMap = {
    [STATE.READY]: "카드를 눌러 게임을 시작하세요!",
    [STATE.PICK1]: "카드를 한 장 더 선택하세요",
    [STATE.MATCHED]: "성공!",
    [STATE.NOT_MATCH]: "실패!",
    [STATE.ALREADY]: "이미 선택된 카드입니다.",
    [STATE.WIN]: "게임 클리어!",
    [STATE.TIMEOVER]: "시간 초과!",
  };

  const gameFinished = g.status === STATE.WIN || g.status === STATE.TIMEOVER;
  const elapsed = Math.max(0, g.limitMs - g.left);

  return (
    <main
      css={css({
        width: "100%",
        background: theme.color.bg,
      })}
    >
      <div
        css={css({
          width: "1290px",
          maxWidth: 1400,
          margin: "0 auto",
        })}
      >
        <section
          css={css({
            background: theme.color.panel,
            borderRadius: theme.radius.lg,
            padding: 24,
            boxShadow: `0 6px 24px ${theme.color.shadow}`,
          })}
        >
          <div
            css={css({
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 30,
            })}
          >
            {/* 게임 보드 */}
            <div
              css={css({
                background: theme.color.panel,
                borderRadius: 12,
                padding: 10,
                display: "grid",
                gridTemplateRows: "auto 1fr",
                gap: 12,
              })}
            >
              {/* 제목 + 리셋 버튼 */}
              <div
                css={css({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  fontSize: 16,
                  flexWrap: "wrap",
                })}
              >
                <h2 css={css({ margin: 0 })}>게임 보드</h2>
                <button
                  onClick={() => g.makeGame(g.level)}
                  css={css({
                    background: theme.color.bad,
                    color: theme.color.white,
                    border: "none",
                    borderRadius: 999,
                    padding: "8px 15px",
                    fontWeight: 800,
                    cursor: "pointer",
                  })}
                >
                  게임 리셋
                </button>
              </div>

              {/* 카드 */}
              <div css={css({ display: "grid", placeItems: "center" })}>
                {g.cards.length > 0 && (
                  <div
                    key={g.gameKey}
                    css={css({
                      display: "grid",
                      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
                      gap: 12,
                      justifyContent: "center",
                      alignContent: "center",
                      height: "700px", 
                    })}
                  >
                    {g.cards.map((c) => (
                      <Card
                        key={c.id}
                        data={c}
                        size={size}
                        onClick={() => g.onFlip(c)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 기록 */}
            <aside
              css={css({
                background: theme.color.cardFront,
                borderRadius: 12,
                padding: 20,
                display: "grid",
                gridTemplateRows: "auto auto auto 1fr",
                gap: 16,
                alignContent: "start",
                minHeight: 700, 
              })}
            >
              {/* 레벨 */}
              <div>
                <select
                  id="lvl"
                  value={g.level}
                  onChange={(e) => g.makeGame(Number(e.target.value))}
                  css={css({
                    width: "100%",
                    padding: "10px 10px",
                    borderRadius: 8,
                    border: `1px solid ${theme.color.line}`,
                    background: theme.color.yellow,
                  })}
                >
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                </select>
              </div>

              <div
                css={css({
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                })}
              >
                <Info title="남은 시간" value={msToSec2(g.left)} />
                <Info title="성공한 짝" value={`${successPairs}/${totalPairs}`} />
                <Info title="남은 짝" value={remainingPairs} />
              </div>

              {/* 안내 메시지 */}
              <div>
                <div
                  css={css({
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 8,
                  })}
                >
                  안내 메세지
                </div>

                <div
                  css={css({
                    padding: 18,
                    borderRadius: 10,
                    border: `1px solid ${theme.color.line}`,
                    background: theme.color.yellow,
                    color: "#000",
                    // minHeight: 46,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    fontSize: 15,
                  })}
                >
                  {guideMap[g.status]}
                </div>
              </div>

              {/* 최근 히스토리 */}
              <div
                css={css({
                  display: "grid",
                  gridTemplateRows: "auto 1fr",
                  minHeight: 0, 
                })}
              >
                <div css={css({ fontWeight: 700, marginBottom: 8 })}>
                  최근 히스토리
                </div>

                <div
                  css={css({
                    borderRadius: 10,
    
            
                    overflowY: "auto", 
                    height: 420,       
                    // border: `1px solid ${theme.color.line}`,
                    // background: theme.color.white,
                  })}
                >
                  {g.history.length === 0 ? (
                    <div
                      css={css({
                        color: theme.color.sub,
      
                        textAlign: "center",
                        padding: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      })}
                    >
                      아직 뒤집은 카드가 없어요
                    </div>
                  ) : (
                    g.history.map((h) => (
                      <div
                        key={h.id}
                        css={css({
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "6px 15px",
                          borderRadius: 8,
                          border: `1px solid ${theme.color.line}`,
                          background: theme.color.yellow,
                          color: h.ok ? theme.color.ok : theme.color.bad,
                          marginBottom: 6,
                        })}
                      >
                        <div>
                          {h.pair[0]}, {h.pair[1]}
                        </div>
                        <div>{h.ok ? "성공" : "실패"}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>

      {/* 모달 */}
      <ModalResult
        open={gameFinished}
        win={g.status === STATE.WIN}
        level={g.level}
        elapsedMs={elapsed}
        onAuto={() => g.makeGame(g.level)}
      />
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div
      css={css({
        border: `1px solid ${theme.color.line}`,
        background: theme.color.yellow,
        borderRadius: 10,
        padding: "14px 12px",
        textAlign: "center",
      })}
    >
      <div css={css({ fontSize: 13, color: theme.color.sub, marginBottom: 7 })}>
        {title}
      </div>
      <div css={css({ fontWeight: 700, fontSize: 20 })}>{value}</div>
    </div>
  );
}
