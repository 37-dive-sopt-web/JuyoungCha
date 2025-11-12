import { getMembers } from "./storage.js";

export const tbody = document.querySelector("tbody");
const COLUMN_KEYS = ["name","englishName","github","gender","role","codeReviewGroup","age"];
const prettyGender = (g) => (g === "female" ? "여자" : g === "male" ? "남자" : g);

export function renderRow(member) {
  const tr = document.createElement("tr");
  tr.classList.add(`members_row_${member.id}`);
  tr.dataset.id = member.id;

  const tdCheck = document.createElement("td");
  tdCheck.classList.add("col-checkbox");
  tdCheck.innerHTML = `<input type="checkbox" class="check row_check" aria-label="${member.name} 선택">`;
  tr.appendChild(tdCheck);

  COLUMN_KEYS.forEach((key) => {
    const td = document.createElement("td");
    td.classList.add(`members_row_${key}`);
    if (key === "github") {
      td.innerHTML = `<a href="https://github.com/${member.github}" target="_blank" rel="noopener noreferrer">${member.github}</a>`;
    } else if (key === "gender") {
      td.textContent = prettyGender(member.gender);
    } else {
      td.textContent = `${member[key]}`;
    }
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

export function renderAllMembers() {
  tbody.innerHTML = "";
  getMembers().forEach(renderRow);
}
