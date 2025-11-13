const KEY = "pairgame:logs";

export function readLogs() {
  const raw = localStorage.getItem(KEY);
  const arr = raw ? JSON.parse(raw) : [];
  return arr.sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level; 
    return a.clearMs - b.clearMs; 
  });
}

export function writeLogs(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function pushLog(log) {
  const cur = readLogs();
  cur.push(log);
  writeLogs(cur);
}

export function clearLogs() {
  writeLogs([]);
}
