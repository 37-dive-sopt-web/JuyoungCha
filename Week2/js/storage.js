import { members as seed } from "../data/data.js";

export const STORAGE_KEY = "membersData";

export function initMembers() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}

export function getMembers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setMembers(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
