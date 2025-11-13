function shuffle(list, rng = Math.random) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  export function createDeck(level, gridMap) {
    const [rows, cols] = gridMap[level] ?? [4, 4];
    const total = rows * cols;
    if (total % 2 !== 0) throw new Error("짝수 칸만 가능합니다.");
  
    const pairCount = total / 2;
    const values = Array.from({ length: pairCount }, (_, i) => i + 1);
  
    const raw = [];
    for (const v of values) {
      raw.push({ id: `${v}-a`, value: v, open: false, done: false });
      raw.push({ id: `${v}-b`, value: v, open: false, done: false });
    }
    return shuffle(raw);
  }
  