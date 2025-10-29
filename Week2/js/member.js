import { getMembers } from "./storage.js";
import { renderAllMembers, renderMembers } from "./render.js";

const tbody = document.querySelector("tbody");

const filterInputs = {
  name: document.getElementById("user_name"),
  englishName: document.getElementById("user_name_english"),
  github: document.getElementById("user_github"),
  gender: document.getElementById("user_gender"),    
  role: document.getElementById("user_role"),        
  codeReviewGroup: document.getElementById("user_team"),
  age: document.getElementById("user_age"),
};

const submit_button = document.querySelector(".button_submit");
const reset_button  = document.querySelector(".button_reset");

function filterMembers() {
  const rows = getMembers();

  const filtered = rows.filter((m) => {
    return Object.entries(filterInputs).every(([key, el]) => {
      const q = String(el.value ?? "").trim();
      if (q === "") return true;

      const src = String(m[key] ?? "");
      const qLow = q.toLowerCase();
      const srcLow = src.toLowerCase();

      if (key === "gender" || key === "role") {
        return srcLow === qLow;
      }

      return srcLow.includes(qLow);
    });
  });

  tbody.innerHTML = "";
  filtered.forEach(renderMembers);
}

submit_button.addEventListener("click", filterMembers);

function resetFilter() {
  Object.values(filterInputs).forEach((el) => (el.value = ""));
  renderAllMembers();
}
reset_button.addEventListener("click", resetFilter);
