export let initiativeOrder = [];

export let activeIndex = 0;
export let roundCount = 1;

export function addToInitiative(entity) {
  const combatInstance = structuredClone(entity);

  combatInstance.id = crypto.randomUUID();
  combatInstance.initiative =
    Math.floor(Math.random() * 20) + 1 + combatInstance.initiativeModifier;

  if (initiativeOrder.length === 0) {
    startInitiative();
  }

  initiativeOrder.push(combatInstance);

  initiativeOrder.sort((a, b) => b.initiative - a.initiative);
}

export function clearInitiative() {
  initiativeOrder.length = 0;
  activeIndex = 0;
  roundCount = 0;
}

export function removeFromInitiative(id) {
  const index = initiativeOrder.findIndex((creature) => creature.id === id);

  if (index !== -1) {
    initiativeOrder.splice(index, 1);
  }

  console.log("index to remove:", index);
}

export function nextTurn() {
  if (activeIndex < initiativeOrder.length - 1) {
    activeIndex++;
  } else {
    activeIndex = 0;
    roundCount++;
  }
}

export function startInitiative() {
  roundCount = 1;
  activeIndex = 0;
}

window.initiativeOrder = initiativeOrder;
