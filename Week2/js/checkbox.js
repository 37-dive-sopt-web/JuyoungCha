import { tbody } from "./render.js";

/* 부분 선택 및 전체 선택 동기화 */
export function syncMaster(master) {
  const items = [...tbody.querySelectorAll(".row_check")];
  const total = items.length;
  const checked = items.filter(i => i.checked).length;

  master.checked = total > 0 && checked === total;
  master.indeterminate = checked > 0 && checked < total;
}

/* 체크박스 관련 핸들러 바인딩 */
export function bindCheckboxes(master) {
  // 전체 선택
  master.addEventListener("change", (e) => {
    const checked = e.currentTarget.checked;
    tbody.querySelectorAll(".row_check").forEach((i) => (i.checked = checked));
    syncMaster(master);
  });

  // 개별 체크
  tbody.addEventListener("change", (e) => {
    if (e.target.classList.contains("row_check")) {
      syncMaster(master);
    }
  });
}

/* 렌더 후 초기화 */
export function resetMasterState(master) {
  master.checked = false;
  master.indeterminate = false;
}
