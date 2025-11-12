import { getMembers, setMembers } from "./storage.js";
import { renderAllMembers } from "./render.js";
import { resetMasterState } from "./checkbox.js";

const buttonDelete = document.querySelector(".button_delete");
const tbody = document.querySelector("tbody");
const master = document.getElementById("check_all");

buttonDelete.addEventListener("click", () => {
  const ids = [...tbody.querySelectorAll(".row_check")]
    .filter((c) => c.checked)
    .map((c) => Number(c.closest("tr")?.dataset.id))
    .filter((n) => Number.isFinite(n));

  if (ids.length === 0) return;

  const next = getMembers().filter((m) => !ids.includes(Number(m.id)));
  setMembers(next);
  renderAllMembers();
  resetMasterState(master); 
});
