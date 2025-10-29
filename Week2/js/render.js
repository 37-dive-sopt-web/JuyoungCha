import { getMembers } from "./storage.js";

const tbody = document.querySelector("tbody");

const K = ["name","englishName","github","gender","role","codeReviewGroup","age"];
const prettyGender = (g) => (g === "female" ? "여자" : g === "male" ? "남자" : g);

function renderMembers(member) {
  const tr = document.createElement("tr");
  tr.classList.add(`members_row_${member.id}`);
  tr.dataset.id = member.id;

  const tdCheck = document.createElement("td");
  tdCheck.innerHTML = `<input type="checkbox" class="check row_check" aria-label="${member.name} 선택">`;
  tr.appendChild(tdCheck);

  K.forEach((key) => {
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

function renderAllMembers() {
  tbody.innerHTML = "";
  getMembers().forEach(renderMembers);
}

export { renderMembers, renderAllMembers, tbody };
