import { characters } from "./characters.js";
import { monsters } from "./monsters.js";
import { initiativeOrder } from "./initiative.js";

//-------------THIS IS FOR INITIALIZING DISPLAY AND STARTING SHIT--------------
export function initDisplay() {
  const box = document.querySelectorAll(".panel-header");
  let sizeButtons = document.querySelectorAll(".toggle-size");
  const initiativeContainer = document.querySelector(
    '[data-panel="initiative"]',
  );

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".panel");
      const oldWidth = section.offsetWidth;

      section.classList.toggle("expanded");

      const newWidth = section.offsetWidth;
      const widthChange = newWidth - oldWidth;

      section.style.left = section.offsetLeft - widthChange + "px";
    });
  });

  box.forEach((header) => {
    header.addEventListener("mousedown", mouseDown);
  });

  initiativeContainer.addEventListener("dragover", dragOver);
  initiativeContainer.addEventListener("drop", dropHandler);

  renderCards();
}

//--------THIS IS FOR DRAGGING THE CARDS INTO INITIATIVE---------

function dragStartHandler(e) {
  e.dataTransfer.setData("type", e.currentTarget.dataset.type);
  e.dataTransfer.setData("id", e.currentTarget.dataset.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dropHandler(e) {
  const type = e.dataTransfer.getData("type");
  const id = e.dataTransfer.getData("id");

  let entity;

  if (type === "character") {
    entity = characters.find((character) => character.id === id);
  }
  if (type === "monster") {
    entity = monsters.find((monster) => monster.id === id);
  }

  initiativeOrder.push(entity);

  renderCards();
}

//---------THIS IS FOR RENDERING THE CARDS IN THE PANELS---------

function renderCards() {
  const characterContainer = document.querySelector(
    '[data-panel="characters"] .panel-content',
  );

  const monsterContainer = document.querySelector(
    '[data-panel="monsters"] .panel-content',
  );

  const initiativeContainer = document.querySelector(
    '[data-panel="initiative"] .panel-content',
  );

  characterContainer.replaceChildren();
  monsterContainer.replaceChildren();
  initiativeContainer.replaceChildren();

  characters.forEach((character) => {
    const card = createCard(character, "character");
    characterContainer.appendChild(card);
  });

  monsters.forEach((monster) => {
    const card = createCard(monster, "monster");
    monsterContainer.appendChild(card);
  });

  initiativeOrder.forEach((creature) => {
    const card = createCard(creature, "creature");
    initiativeContainer.appendChild(card);
  });
}

function createCard(entity, type) {
  const card = document.createElement("div");
  card.classList.add("entity-card");
  card.dataset.id = entity.id;
  card.dataset.type = type;

  const name = document.createElement("h3");
  name.textContent = entity.name;

  const ac = document.createElement("p");
  ac.textContent = `AC: ${entity.ac}`;

  const hp = document.createElement("p");
  hp.textContent = `HP: ${entity.hp}`;

  card.appendChild(name);
  card.appendChild(hp);
  card.appendChild(ac);
  card.draggable = "true";
  card.addEventListener("dragstart", dragStartHandler);

  return card;
}

//--------------THIS IS FOR MOVING THE CARDS AROUND--------------
let startX = 0;
let startY = 0;
let activePanel = null;

function mouseDown(e) {
  if (e.target.closest(".toggle-size")) {
    return;
  }

  e.preventDefault();

  activePanel = e.currentTarget.closest(".panel");

  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  let movementX = e.clientX - startX;
  let movementY = e.clientY - startY;

  let currentX = activePanel.offsetLeft;
  let currentY = activePanel.offsetTop;

  activePanel.style.top = currentY + movementY + "px";
  activePanel.style.left = currentX + movementX + "px";

  startX = e.clientX;
  startY = e.clientY;
}

function mouseUp() {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  activePanel = null;
}
