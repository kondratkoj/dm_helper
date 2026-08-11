import { characters } from "./characters.js";
import { monsters } from "./monsters.js";
import {
  initiativeOrder,
  addToInitiative,
  clearInitiative,
  removeFromInitiative,
  nextTurn,
  activeIndex,
  roundCount,
} from "./initiative.js";

//--------------------THIS IS FOR INITIALIZING DISPLAY AND SHIT--------------------//

export function initDisplay() {
  const panelHeader = document.querySelectorAll(".panel-header");
  const sizeButtons = document.querySelectorAll(".toggle-size");
  const clearBtn = document.querySelector(".clear-init");
  const nextTurnBtn = document.querySelector(".next-turn");
  const initiativeContainer = document.querySelector(
    '[data-panel="initiative"]',
  );

  clearBtn.addEventListener("click", () => {
    clearInitiative();
    updateRound();
    renderCards();
  });

  nextTurnBtn.addEventListener("click", () => {
    nextTurn();
    updateRound();
    renderCards();
  });

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

  panelHeader.forEach((header) => {
    header.addEventListener("mousedown", mouseDown);
  });

  initiativeContainer.addEventListener("dragover", dragOver);
  initiativeContainer.addEventListener("drop", dropHandler);

  renderCards();
}

//---------------------THIS IS FOR DRAGGING THE CARDS INTO INITIATIVE--------------------//

const roundText = document.querySelector(".round-count");

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

  addToInitiative(entity);

  updateRound();

  renderCards();
}

function updateRound() {
  if (roundCount === 0) {
    roundText.textContent = "";
  } else {
    roundText.textContent = `Round ${roundCount}`;
  }
}

//--------------------THIS IS FOR RENDERING THE CARDS IN THE PANELS--------------------//

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
    const card = createCard(character, "characterLibrary");
    characterContainer.appendChild(card);
  });

  monsters.forEach((monster) => {
    const card = createCard(monster, "monsterLibrary");
    monsterContainer.appendChild(card);
  });

  initiativeOrder.forEach((creature, index) => {
    const initiative = document.createElement("p");
    initiative.textContent = `Initiative: ${creature.initiative}`;

    const card = createCard(creature, "initiative");

    const removeBtn = document.createElement("button");

    const removeSVG = `
    <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
    d="M5 5L19 19M5 19L19 5"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    />
    </svg>
    `;

    removeBtn.innerHTML = removeSVG;
    removeBtn.classList.add("remove-button");
    removeBtn.dataset.id = creature.id;

    removeBtn.addEventListener("click", (e) => {
      removeFromInitiative(e.currentTarget.dataset.id);
      renderCards();
    });

    if (index === activeIndex) {
      card.classList.add("active-turn");
    }

    card.appendChild(initiative);
    card.appendChild(removeBtn);
    initiativeContainer.appendChild(card);
  });
}

function createCard(entity, context) {
  const card = document.createElement("div");
  card.classList.add("entity-card");
  card.dataset.id = entity.id;
  card.dataset.type = entity.type;
  card.dataset.context = context;

  const name = document.createElement("h3");
  name.textContent = entity.name;

  const ac = document.createElement("p");
  ac.textContent = `AC: ${entity.ac}`;

  const currentHp = document.createElement("p");
  currentHp.textContent = `HP: ${entity.hp.current} / ${entity.hp.max}`;

  card.appendChild(name);
  card.appendChild(currentHp);
  card.appendChild(ac);
  card.draggable = "true";
  card.addEventListener("dragstart", dragStartHandler);

  return card;
}

//---------------------THIS IS FOR MOVING THE CARDS AROUND---------------------//
let startX = 0;
let startY = 0;
let activePanel = null;

function mouseDown(e) {
  if (e.target.closest(".toggle-size") || e.target.closest(".clear-init")) {
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
