export let initiativeOrder = [];

export function addToInitiative(entity) {
  const combatInstance = structuredClone(entity);

  combatInstance.id = crypto.randomUUID();
  combatInstance.initiative =
    Math.floor(Math.random() * 20) + 1 + combatInstance.initiativeModifier;

  initiativeOrder.push(combatInstance);
}

export function clearInitiative() {
  initiativeOrder.length = 0;
}

export function removeFromInitiative(id) {
  const index = initiativeOrder.findIndex((creature) => creature.id === id);

  if (index !== -1) {
    initiativeOrder.splice(index, 1);
  }

  console.log("index to remove:", index);
}

window.initiativeOrder = initiativeOrder;
