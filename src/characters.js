export let characters = [];

class Character {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.type = "character";

    this.name = name;
    this.color = "";

    this.class = "";
    this.subclass = "";
    this.level = 1;
    this.race = "";

    this.ac = 10;

    this.hp = {
      current: 0,
      max: 0,
      temp: 0,
    };

    this.speed = 30;

    this.initiativeModifier = 0;
    this.proficiencyBonus = 2;

    this.initiative = 0;
    this.turn = false;

    this.abilities = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };

    this.savingThrows = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };

    this.skills = {};

    this.passivePerception = 10;

    this.conditions = [];

    this.resources = [];

    this.spellcasting = null;

    this.notes = "";

    this.image = null;
  }
}

const joe = new Character("Joe");
joe.hp.current = 25;
joe.hp.max = 25;
characters.push(joe);
