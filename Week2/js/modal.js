import { getMembers, setMembers } from "./storage.js";
import { renderAllMembers } from "./render.js";
import { resetMasterState } from "./checkbox.js";

const modal = document.querySelector(".modal_overlay");
const modalCloseButton = document.querySelector(".button_modal_close");
const addButton = document.querySelector(".button_add");
const modalForm = document.querySelector(".modal_form");
const modalAddButton = document.querySelector(".button_modal_add");
const master = document.getElementById("check_all");

const modalInputs = {
  name: document.getElementById("modal_name"),
  englishName: document.getElementById("modal_name_english"),
  github: document.getElementById("modal_github"),
  gender: document.getElementById("modal_gender"),
  role: document.getElementById("modal_role"),
  codeReviewGroup: document.getElementById("modal_team"),
  age: document.getElementById("modal_age"),
};

function clearModal() {
  Object.values(modalInputs).forEach((el) => (el.value = ""));
}

function lockScroll(lock) {
  document.body.classList.toggle("is-modal-open", lock);
}

function openModal() {
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("is-open");
  lockScroll(true);
}

function closeModal() {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("is-open");
  clearModal();
  lockScroll(false);
}

addButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);

// 오버레이 클릭 닫기
modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ESC 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

function validateModal() {
  for (const el of Object.values(modalInputs)) {
    if (!el || el.value === null || el.value === undefined || String(el.value).trim() === "") {
      alert("모든 항목을 입력해주세요.");
      return false;
    }
  }

  // 숫자/범위 체크
  const age = Number(modalInputs.age.value);
  const team = Number(modalInputs.codeReviewGroup.value);

  if (!Number.isFinite(age) || age <= 0) {
    alert("나이는 양의 숫자로 입력해주세요.");
    modalInputs.age.focus();
    return false;
  }

  if (!Number.isFinite(team) || team < 1 || team > 9) {
    alert("금잔디조는 1~9 사이의 숫자로 입력해주세요.");
    modalInputs.codeReviewGroup.focus();
    return false;
  }

  return true;
}


function appendMember() {
  if (!validateModal()) return;

  const list = getMembers();
  const maxId = list.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);

  const newMember = {
    id: maxId + 1,
    name: modalInputs.name.value.trim(),
    englishName: modalInputs.englishName.value.trim(),
    github: modalInputs.github.value.trim(),
    gender: modalInputs.gender.value,
    role: modalInputs.role.value,
    codeReviewGroup: Number(modalInputs.codeReviewGroup.value),
    age: Number(modalInputs.age.value),
  };

  setMembers([...list, newMember]);
  closeModal();
  renderAllMembers();
  resetMasterState(master); 
}

modalAddButton.addEventListener("click", appendMember);
modalForm.addEventListener("submit", (e) => { e.preventDefault(); appendMember(); });
