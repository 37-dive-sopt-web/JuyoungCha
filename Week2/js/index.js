import { initMembers } from "./storage.js";
import { renderAllMembers } from "./render.js";
import { bindCheckboxes } from "./checkbox.js";
import "./filter.js";
import "./modal.js";
import "./delete.js";

initMembers();
renderAllMembers();

const master = document.getElementById("check_all");
bindCheckboxes(master);