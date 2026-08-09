export let monsters = [];

class Monster {
  constructor(name, ac, hp) {
    this.id = crypto.randomUUID();
    this.type = "monster";
    this.name = name;
    this.ac = ac;
    this.hp = hp;
  }
}

const goblin = new Monster("Goblin", 14, 22);

monsters.push(goblin);
