import { getMembers } from "./storage.js";
import { renderRow } from "./render.js";
import { resetMasterState } from "./checkbox.js";

const tbody = document.querySelector("tbody");
const filterForm = document.querySelector(".filter_form");
const submitButton = document.querySelector(".button_submit");
const resetButton  = document.querySelector(".button_reset");
const master = document.getElementById("check_all");

const filterInputs = {
  name: document.getElementById("user_name"),
  englishName: document.getElementById("user_name_english"),
  github: document.getElementById("user_github"),
  gender: document.getElementById("user_gender"),
  role: document.getElementById("user_role"),
  codeReviewGroup: document.getElementById("user_team"),
  age: document.getElementById("user_age"),
};

function filterMembers() {
  const rows = getMembers();
  const filtered = rows.filter((m) => {
    return Object.entries(filterInputs).every(([key, el]) => {
      const q = String(el.value ?? "").trim();
      if (q === "") return true;

      const src = String(m[key] ?? "");
      const qLow = q.toLowerCase();
      const srcLow = src.toLowerCase();

      if (key === "gender" || key === "role") return srcLow === qLow;
      return srcLow.includes(qLow);
    });
  });

  tbody.innerHTML = "";
  filtered.forEach(renderRow);
  resetMasterState(master); 
}

function resetFilter() {
  Object.values(filterInputs).forEach((el) => (el.value = ""));
  filterMembers();
}

// 버튼 클릭 + 폼 submit(Enter) 지원
submitButton.addEventListener("click", filterMembers);
resetButton.addEventListener("click", resetFilter);
filterForm.addEventListener("submit", (e) => { e.preventDefault(); filterMembers(); });
