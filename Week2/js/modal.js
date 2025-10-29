import { getMembers, setMembers } from "./storage.js";
import { renderAllMembers } from "./render.js";

const modal = document.querySelector(".modal_overlay");
const modalCloseButton = document.querySelector(".button_modal_close");
const modalAddButton = document.querySelector(".button_modal_add");
const addButton = document.querySelector(".button_add");

const ModalInputs = {
  name: document.getElementById("modal_name"),
  englishName: document.getElementById("modal_name_english"),
  github: document.getElementById("modal_github"),
  gender: document.getElementById("modal_gender"),
  role: document.getElementById("modal_role"),
  codeReviewGroup: document.getElementById("modal_team"),
  age: document.getElementById("modal_age"),
};

function clearModal() {
  Object.values(ModalInputs).forEach((el) => (el.value = ""));
}
function openModal(){ modal.style.display = "block"; }
function closeModal(){ modal.style.display = "none"; clearModal(); }

addButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") closeModal();
});

function validateModal() {
  for (const el of Object.values(ModalInputs)) {
    if (!String(el.value || "").trim()) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }
  }
  return true;
}

function appendMember() {
  if (!validateModal()) return;

  const members = getMembers();
  const maxId = members.reduce((m, r) => Math.max(m, Number(r.id)||0), 0);

  const new_member = {
    id: maxId + 1,
    name: ModalInputs.name.value.trim(),
    englishName: ModalInputs.englishName.value.trim(),
    github: ModalInputs.github.value.trim(),
    gender: ModalInputs.gender.value,          
    role: ModalInputs.role.value,              
    codeReviewGroup: Number(ModalInputs.codeReviewGroup.value),
    age: Number(ModalInputs.age.value),
  };

  members.push(new_member);
  setMembers(members);
  closeModal();
  renderAllMembers();
}
modalAddButton.addEventListener("click", appendMember);
