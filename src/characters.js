export let characters = [];

class Character {
  constructor(name, ac, hp) {
    this.id = crypto.randomUUID();
    this.type = "character";
    this.name = name;
    this.ac = ac;
    this.hp = hp;
  }
}

const joe = new Character("Joe", 16, 50);

characters.push(joe);
