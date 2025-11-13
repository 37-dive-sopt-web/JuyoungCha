export const msToSec2 = (ms) => (Math.max(0, ms) / 1000).toFixed(2);

export const dateLabel = (d) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d instanceof Date ? d : new Date(d));
