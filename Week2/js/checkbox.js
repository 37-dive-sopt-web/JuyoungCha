import { getMembers, setMembers } from "./storage.js";
import { renderAllMembers, tbody } from "./render.js";

const buttonDelete = document.querySelector(".button_delete");
const master = document.querySelector(".check_all");

function syncMaster() {
  const items = [...tbody.querySelectorAll(".row_check")];
  const all = items.length > 0 && items.every((i) => i.checked);
  master.checked = all;
}

// 전체 선택 및 해제
master.addEventListener("change", (e) => {
  const checked = e.currentTarget.checked;
  tbody.querySelectorAll(".row_check").forEach((i) => (i.checked = checked));
});

// 개별 체크
tbody.addEventListener("change", (e) => {
  if (e.target.classList.contains("row_check")) syncMaster();
});

// 선택 삭제
buttonDelete.addEventListener("click", () => {
  const ids = [...tbody.querySelectorAll(".row_check")]
    .filter((c) => c.checked)
    .map((c) => Number(c.closest("tr").dataset.id));

  if (ids.length === 0) return;

  const next = getMembers().filter((m) => !ids.includes(Number(m.id)));
  setMembers(next);
  renderAllMembers();
  master.checked = false;
});
