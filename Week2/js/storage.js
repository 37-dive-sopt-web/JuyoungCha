import { members } from "../data/data.js";

function initMembers() {
  if (!localStorage.getItem("membersData")) {
    localStorage.setItem("membersData", JSON.stringify(members));
  }
}

function getMembers() {
  const raw = localStorage.getItem("membersData");
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setMembers(newMembers) {
  localStorage.setItem("membersData", JSON.stringify(newMembers));
}

export { initMembers, getMembers, setMembers };
