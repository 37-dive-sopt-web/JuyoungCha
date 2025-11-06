import { useCallback, useEffect, useMemo, useState } from "react";
import { createDeck } from "../utils/deck";
import { useTimer } from "./useTimer";
import { pushLog } from "../utils/storage";
import { theme } from "../styles/theme";

export const STATE = {
  READY: "ready",
  PICK1: "pick1",
  MATCHED: "matched",
  NOT_MATCH: "not_match",
  ALREADY: "already",   
  WIN: "win",
  TIMEOVER: "timeover",
};

export function useGameEngine(initLevel = 1) {
  const [level, setLevel] = useState(initLevel);
  const [cards, setCards] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [history, setHistory] = useState([]); 
  const [status, setStatus] = useState(STATE.READY);
  const [gameKey, setGameKey] = useState(1);
  const [startedAt, setStartedAt] = useState(null);

  const grid = theme.board.levelToGrid[level];
  const limitMs = theme.board.limitSec[level] * 1000;

  const { left, start, stop, reset } = useTimer(() => {
    setStatus(STATE.TIMEOVER);
  });

  // 새 게임 만들기
  const makeGame = useCallback(
    (nextLevel = level) => {
      const newDeck = createDeck(nextLevel, theme.board.levelToGrid);
      setLevel(nextLevel);
      setCards(newDeck);
      setClicks([]);
      setHistory([]);
      setStatus(STATE.READY);
      setGameKey((k) => k + 1);
      reset(theme.board.limitSec[nextLevel] * 1000);
      setStartedAt(null);
      stop(); 
    },
    [level, reset, stop]
  );

  useEffect(() => {
    makeGame(level);
  }, []);

  // 카드 클릭
  const onFlip = (card) => {
    if (status === STATE.WIN || status === STATE.TIMEOVER) return;
    if (clicks.length === 2) return; 

    if (card.done || card.open) {
      const fallback = clicks.length === 1 ? STATE.PICK1 : STATE.READY;
      setStatus(STATE.ALREADY);
      setTimeout(() => setStatus(fallback), 500);
      return;
    }

    // 타이머 시작
    if (!startedAt) {
      setStartedAt(new Date());
      start(limitMs);
    }

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, open: true } : c))
    );

    const picked = [...clicks, card];
    setClicks(picked);

    if (picked.length === 1) {
      setStatus(STATE.PICK1);
      return;
    }

    if (picked.length === 2) {
      const [a, b] = picked;
      const isOk = a.value === b.value;

      setTimeout(() => {
        if (isOk) {
          // 선택한 두 장의 카드가 일치
          setCards((prev) =>
            prev.map((c) =>
              c.id === a.id || c.id === b.id ? { ...c, done: true } : c
            )
          );
          setStatus(STATE.MATCHED);
        } else {
          // 선택한 두 장의 카드가 불일치
          setCards((prev) =>
            prev.map((c) =>
              c.id === a.id || c.id === b.id ? { ...c, open: false } : c
            )
          );
          setStatus(STATE.NOT_MATCH);
        }

        setHistory((prev) => [
          {
            id: typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Math.random()),
            pair: [a.value, b.value],
            ok: isOk,
          },
          ...prev,
        ]);

        setClicks([]);
      }, 300);
    }
  };

  const matchedCount = useMemo(
    () => cards.filter((c) => c.done).length,
    [cards]
  );

  useEffect(() => {
    if (!cards.length) return;
    const total = cards.length;
    if (matchedCount === total) {
      setStatus(STATE.WIN);
      stop();
    }
  }, [matchedCount, cards.length, stop]);

  // 랭킹 저장 
  useEffect(() => {
    if (status !== STATE.WIN) return;
    if (!startedAt) return;

    const clearMs = theme.board.limitSec[level] * 1000 - left; 
    pushLog({
      id: Date.now(),
      level,
      clearMs,
      startedAt,
    });
  }, [status, startedAt, left, level]);

  return {
    level,
    cards,
    clicks,
    history,
    status,
    left,
    grid,
    limitMs,
    gameKey,
    makeGame,
    setLevel, 
    onFlip,
  };
}
