export let monsters = [];

class Monster {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.type = "monster";

    this.name = name;
    this.color = "";

    this.size = "";
    this.creatureType = "";
    this.alignment = "";

    this.ac = 10;

    this.hp = {
      current: 0,
      max: 0,
      temp: 0,
    };

    this.hitDice = "";

    this.speed = {
      walk: 0,
      fly: 0,
      swim: 0,
      climb: 0,
      burrow: 0,
    };

    this.initiativeModifier = 0;
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

    this.savingThrows = {};

    this.skills = {};

    this.damageVulnerabilities = [];
    this.damageResistances = [];
    this.damageImmunities = [];
    this.conditionImmunities = [];

    this.senses = [];
    this.languages = [];

    this.challengeRating = 0;
    this.proficiencyBonus = 2;

    this.traits = [];

    this.actions = [];
    this.bonusActions = [];
    this.reactions = [];
    this.legendaryActions = [];

    this.conditions = [];

    this.notes = "";

    this.image = null;
  }
}

const goblin = new Monster("Goblin");
goblin.hp.current = 12;
goblin.hp.max = 12;

monsters.push(goblin);
