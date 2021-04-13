import {AbilityEnum} from './AbilityScore';
import {Skill} from './Skill';

export interface ICharacterClass {
  name?: string;
  ranksPerLevel?: number;
  description?: string;
  hitPoints?: number;
  baseAttackBonus?: number;
  fortitudeSaveBonus?: number;
  reflexSaveBonus?: number;
  willSaveBonus?: number;
  staminaPoints?: number;
  keyAbility?: AbilityEnum | string;
  proficiencies?: Array<any>;
  classSkills?: Array<string>;
  classLevel?: number;
  spellcaster?: boolean;
  spellSlotArray?: Array<number> | null;
}

export class CharacterClass implements ICharacterClass {
  private readonly _baseAttackBonus: number;
  private readonly _description: string;
  private readonly _fortitudeSaveBonus: number;
  private readonly _hitPoints: number;
  private readonly _staminaPoints: number;
  private readonly _name: string;
  private readonly _ranksPerLevel: number;
  private readonly _classSkills: Array<string>;
  private readonly _keyAbility: AbilityEnum | string;
  private readonly _proficiencies: Array<any>;
  private _classLevel: number;
  private readonly _spellcaster: boolean;
  private readonly _spellSlotArray: Array<number> | null;

  constructor(properties: ICharacterClass = {}) {
    this._baseAttackBonus = properties.baseAttackBonus ?? 0;
    this._description = properties.description ?? '';
    this._fortitudeSaveBonus = properties.fortitudeSaveBonus ?? 0;
    this._hitPoints = properties.hitPoints ?? 0;
    this._name = properties.name ?? '';
    this._ranksPerLevel = properties.ranksPerLevel ?? 0;
    this._classSkills = properties.classSkills ?? new Array<string>();
    this._keyAbility = properties.keyAbility ?? AbilityEnum.CHARISMA;
    this._proficiencies = properties.proficiencies ?? [];
    this._staminaPoints = properties.staminaPoints ?? 0;
    this._classLevel = properties.classLevel ?? 1;
    this._spellcaster = properties.spellcaster ?? false;
    this._spellSlotArray = properties.spellSlotArray ?? null;
  }


  get spellcaster(): boolean {
    return this._spellcaster;
  }

  get classLevel(): number {
    return this._classLevel;
  }

  set classLevel(value: number) {
    let num: number = value;
    if (num < 1) {
      num = 1;
    }
    if (num > 20) {
      num = 1;
    }
    this._classLevel = value;
  }

  get classSkills(): Array<string> {
    return this._classSkills;
  }

  get keyAbility(): AbilityEnum | string {
    return this._keyAbility;
  }

  get proficiencies(): Array<any> {
    return this._proficiencies;
  }

  get staminaPoints(): number {
    return this._staminaPoints;
  }

  get baseAttackBonus(): number {
    return ClassLevelStats[this._name][this._classLevel].baseAttackBonus;
  }

  get description(): string {
    return this._description;
  }

  get fortitudeSaveBonus(): number {
    return ClassLevelStats[this._name][this._classLevel].fortitudeSaveBonus;
  }

  get hitPoints(): number {
    return this._hitPoints;
  }

  get name(): string {
    return this._name;
  }

  calculateRanksPerLevel(val: number): number {
    let sum = 1 + val;
    sum += this._ranksPerLevel;
    return sum > 1 ? sum : 1;
  }

  get reflexSaveBonus(): number {
    return ClassLevelStats[this._name][this._classLevel].reflexSaveBonus;
  }

  get willSaveBonus(): number {
    return ClassLevelStats[this._name][this._classLevel].willSaveBonus;
  }

  get spellSlotArray(): Array<number> | null {
    if (!this._spellcaster) {
      return null;
    }
    const spellSlots = ClassLevelStats[this._name][this._classLevel].classFeatures[1];
    const spellSlotArray = spellSlots.split(' ');
    return spellSlotArray.map(x => {
      if (x === '-') {
        return 0;
      }
      return +x;
    });
  }
}

export const ClassesAvailable: Array<ICharacterClass> = [{
  description: 'The biohacker uses complex catalysts and fringe medical knowledge to augment her allies and inhibit her foes, often using injection weapons.',
  hitPoints: 6,
  name: 'Biohacker',
  ranksPerLevel: 4,
  classSkills: ['Acrobatics', 'Athletics', 'Bluff', 'Computers', 'Culture', 'Diplomacy', 'Engineering', 'Intimidate', 'Medicine', 'Perception', 'Piloting', 'Profession', 'Sense Motive', 'Sleight of Hand', 'Stealth'],
  keyAbility: 'Intelligence',
  proficiencies: [],
  staminaPoints: 6,
  spellcaster: false,
}, {
  description: 'The envoy uses her personal magnetism and intelligence to help her allies and baffle her enemies, often in the service of negotiation or politics.',
  hitPoints: 6,
  name: 'Envoy',
  ranksPerLevel: 8,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 6,
  spellcaster: false,
}, {
  description: 'Adept at building and modifying machinery, the mechanic has either an advanced Artificial intelligence or a cutting-edge robot Drone as his constant companion.',
  hitPoints: 6,
  name: 'Mechanic',
  ranksPerLevel: 4,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 6,
  spellcaster: false,
}, {
  description: 'The mystic magically channels the energy connecting all things, often through a Focus on the divine or intuitive understanding of biological systems.',
  hitPoints: 6,
  name: 'Mystic',
  ranksPerLevel: 6,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 6,
  spellcaster: true,
}, {
  description: 'The operative has the skills to complete almost any mission requiring stealth and discretion, whether it be simple espionage or messy wet work.',
  hitPoints: 6,
  name: 'Operative',
  ranksPerLevel: 8,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 6,
  spellcaster: false,
}, {
  description: 'The solarian contemplates and gains power from the life cycles of stars. His techniques allow him to create a weapon or suit of armor from a mote of Stellar energy.',
  hitPoints: 7,
  name: 'Solarian',
  ranksPerLevel: 4,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 7,
  spellcaster: false,
}, {
  description: 'Thoroughly familiar with weapons of war, the soldier is ready to wreak havoc when force is called for, and specializes in a particular fighting style.',
  hitPoints: 7,
  name: 'Soldier',
  ranksPerLevel: 4,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 7,
  spellcaster: false
}, {
  baseAttackBonus: 0,
  description: 'The technomancer understands the connections between technology and magic, and exploits them by bending reality to suit her needs.',
  fortitudeSaveBonus: 0,
  hitPoints: 5,
  name: 'Technomancer',
  ranksPerLevel: 4,
  reflexSaveBonus: 0,
  willSaveBonus: 0,
  classSkills: [],
  keyAbility: 'Intelligence',
  proficiencies: [],
  staminaPoints: 5,
  spellcaster: true,
}, {
  description: 'An expert at close combat, the vanguard has gained supernatural control over the power of entropy, and can speed, slow, or alter how energies and reactions occur.',
  hitPoints: 7,
  name: 'Vanguard',
  ranksPerLevel: 6,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 7,
  spellcaster: false,
}, {
  description: 'Witchwarpers are powerful spellcasters who draw their magic from alternate realities and can pull bubbles of those realities into their current space.',
  hitPoints: 5,
  name: 'Witchwarper',
  ranksPerLevel: 4,
  classSkills: [],
  keyAbility: 'Charisma',
  proficiencies: [],
  staminaPoints: 5,
  spellcaster: true,
}];

interface IClassLevelModifier {
  baseAttackBonus: number;
  fortitudeSaveBonus: number;
  reflexSaveBonus: number;
  willSaveBonus: number;
  classFeatures: Array<string>;
}

class ClassLevelModifier implements IClassLevelModifier {
  baseAttackBonus: number;
  fortitudeSaveBonus: number;
  reflexSaveBonus: number;
  willSaveBonus: number;
  classFeatures: Array<string>;

  constructor(baseAttackBonus: number,
              fortitudeSaveBonus: number,
              reflexSaveBonus: number,
              willSaveBonus: number,
              classFeatures: Array<string>) {
    this.baseAttackBonus = baseAttackBonus;
    this.fortitudeSaveBonus = fortitudeSaveBonus;
    this.reflexSaveBonus = reflexSaveBonus;
    this.willSaveBonus = willSaveBonus;
    this.classFeatures = classFeatures;
  }
}

export const ClassLevelStats: { [key: string]: { [key: number]: ClassLevelModifier } } = {
  Biohacker: {
    // tslint:disable-next-line:max-line-length
    1: new ClassLevelModifier(0, 2, 0, 0, ['biohacks', 'custom microlab', 'injection expert', 'primary field of study', 'scientific method']),
    2: new ClassLevelModifier(1, 3, 0, 0, ['injection expert +1', 'theorem']),
    3: new ClassLevelModifier(2, 3, 1, 1, ['Spark of ingenuity 1/day', 'weapon specialization']),
    4: new ClassLevelModifier(3, 4, 1, 1, ['Theorem']),
    5: new ClassLevelModifier(3, 4, 1, 1, ['Custom microlab (advanced medkit), primary field of study breakthrough']),
    6: new ClassLevelModifier(4, 5, 2, 2, ['Theorem']),
    7: new ClassLevelModifier(5, 5, 2, 2, ['Secondary field of study']),
    8: new ClassLevelModifier(6, 6, 2, 2, ['Theorem']),
    9: new ClassLevelModifier(6, 6, 3, 3, ['Custom microlab (medical lab, 90 feet), injection expert +2, spark of ingenuity 2/day']),
    10: new ClassLevelModifier(7, 7, 3, 3, ['Theorem']),
    11: new ClassLevelModifier(8, 7, 3, 3, ['Secondary field of study breakthrough']),
    12: new ClassLevelModifier(9, 8, 4, 4, ['Theorem']),
    13: new ClassLevelModifier(9, 8, 4, 4, ['Tertiary field of study']),
    14: new ClassLevelModifier(10, 9, 4, 4, ['Theorem']),
    15: new ClassLevelModifier(11, 9, 5, 5, ['Spark of ingenuity 3/day']),
    16: new ClassLevelModifier(12, 10, 5, 5, ['Theorem']),
    17: new ClassLevelModifier(12, 10, 5, 5, ['Custom microlab (120 feet), tertiary field of study breakthrough']),
    18: new ClassLevelModifier(13, 11, 6, 6, ['Injection expert +3, theorem']),
    19: new ClassLevelModifier(14, 11, 6, 6, ['Resolve analysis']),
    20: new ClassLevelModifier(15, 12, 6, 6, ['Superserum, theorem']),
  },
  Envoy: {
    1: new ClassLevelModifier(0, 0, 2, 2, ['Envoy improvisation, expertise (1d6), skill expertise']),
    2: new ClassLevelModifier(1, 0, 3, 3, ['Envoy improvisation']),
    3: new ClassLevelModifier(2, 1, 3, 3, ['Expertise talent, weapon specialization']),
    4: new ClassLevelModifier(3, 1, 4, 4, ['Envoy improvisation']),
    5: new ClassLevelModifier(3, 1, 4, 4, ['Expertise (1d6+1), skill expertise']),
    6: new ClassLevelModifier(4, 2, 5, 5, ['Envoy improvisation']),
    7: new ClassLevelModifier(5, 2, 5, 5, ['Expertise talent']),
    8: new ClassLevelModifier(6, 2, 6, 6, ['Envoy improvisation']),
    9: new ClassLevelModifier(6, 3, 6, 6, ['Expertise (1d6+2), skill expertise']),
    10: new ClassLevelModifier(7, 3, 7, 7, ['Envoy improvisation']),
    11: new ClassLevelModifier(8, 3, 7, 7, ['Expertise talent']),
    12: new ClassLevelModifier(9, 4, 8, 8, ['Envoy improvisation']),
    13: new ClassLevelModifier(9, 4, 8, 8, ['Expertise (1d8+2), skill expertise']),
    14: new ClassLevelModifier(10, 4, 9, 9, ['Envoy improvisation']),
    15: new ClassLevelModifier(11, 5, 9, 9, ['Expertise talent']),
    16: new ClassLevelModifier(12, 5, 0, 10, ['Envoy improvisation']),
    17: new ClassLevelModifier(12, 5, 0, 10, ['Expertise (1d8+3), skill expertise']),
    18: new ClassLevelModifier(13, 6, 1, 11, ['Envoy improvisation']),
    19: new ClassLevelModifier(14, 6, 1, 11, ['Expertise talent']),
    20: new ClassLevelModifier(15, 6, 2, 12, ['Envoy improvisation, expertise (1d8+4), true expertise']),
  },

  Mechanic: {
    1: new ClassLevelModifier(0, 2, 2, 0, ['Artificial intelligence, bypass +1, custom rig']),
    2: new ClassLevelModifier(1, 3, 3, 0, ['Mechanic trick']),
    3: new ClassLevelModifier(2, 3, 3, 1, ['Overload, weapon specialization']),
    4: new ClassLevelModifier(3, 4, 4, 1, ['Mechanic trick']),
    5: new ClassLevelModifier(3, 4, 4, 1, ['Bypass +2, remote hack']),
    6: new ClassLevelModifier(4, 5, 5, 2, ['Mechanic trick']),
    7: new ClassLevelModifier(5, 5, 5, 2, ['Expert rig, miracle worker 1/day']),
    8: new ClassLevelModifier(6, 6, 6, 2, ['Mechanic trick']),
    9: new ClassLevelModifier(6, 6, 6, 3, ['Bypass +3, override']),
    10: new ClassLevelModifier(7, 7, 7, 3, ['Mechanic trick']),
    11: new ClassLevelModifier(8, 7, 7, 3, ['Coordinated assault +1, miracle worker 2/day']),
    12: new ClassLevelModifier(9, 8, 8, 4, ['Mechanic trick']),
    13: new ClassLevelModifier(9, 8, 8, 4, ['Advanced rig, bypass +4']),
    14: new ClassLevelModifier(10, 9, 9, 4, ['Mechanic trick']),
    15: new ClassLevelModifier(11, 9, 9, 5, ['Miracle worker 3/day']),
    16: new ClassLevelModifier(12, 10, 0, 5, ['Mechanic trick']),
    17: new ClassLevelModifier(12, 10, 0, 5, ['Bypass +5, control net, coordinated assault +2']),
    18: new ClassLevelModifier(13, 11, 1, 6, ['Mechanic trick']),
    19: new ClassLevelModifier(14, 11, 1, 6, ['Ghost in the machine, miracle worker 4/day, superior rig']),
    20: new ClassLevelModifier(15, 12, 2, 6, ['Bypass +6, mechanic trick, tech master']),
  },
  Mystic: {
    1: new ClassLevelModifier(0, 0, 0, 2, ['Connection, connection power, connection spell, healing touch', '2 - - - - -']),
    2: new ClassLevelModifier(1, 0, 0, 3, ['Channel skill +1, mindlink', '2 - - - - -']),
    3: new ClassLevelModifier(2, 1, 1, 3, ['Connection power, weapon specialization', '3 - - - - -']),
    4: new ClassLevelModifier(3, 1, 1, 4, ['Connection spell', '3 2 - - - -']),
    5: new ClassLevelModifier(3, 1, 1, 4, ['Channel skill +2', '4 2 - - - -']),
    6: new ClassLevelModifier(4, 2, 2, 5, ['Connection power', '4 3 - - - -']),
    7: new ClassLevelModifier(5, 2, 2, 5, ['Connection spell', '4 3 2 - - -']),
    8: new ClassLevelModifier(6, 2, 2, 6, ['Channel skill +3', '4 4 2 - - -']),
    9: new ClassLevelModifier(6, 3, 3, 6, ['Connection power', '5 4 3 - - -']),
    10: new ClassLevelModifier(7, 3, 3, 7, ['Connection spell', '5 4 3 2 - -']),
    11: new ClassLevelModifier(8, 3, 3, 7, ['Channel skill +4, telepathic bond', '5 4 4 2 - -']),
    12: new ClassLevelModifier(9, 4, 4, 8, ['Connection power', '5 5 4 3 - -']),
    13: new ClassLevelModifier(9, 4, 4, 8, ['Connection spell', '5 5 5 3 2 -']),
    14: new ClassLevelModifier(10, 4, 4, 9, ['Channel skill +5', '5 5 5 4 2 -']),
    15: new ClassLevelModifier(11, 5, 5, 9, ['Connection power', '5 5 5 4 3 -']),
    16: new ClassLevelModifier(12, 5, 5, 10, ['Connection spell', '5 5 5 4 3 2']),
    17: new ClassLevelModifier(12, 5, 5, 10, ['Channel skill +6', '5 5 5 4 4 2']),
    18: new ClassLevelModifier(13, 6, 6, 11, ['Connection power', '5 5 5 4 4 3']),
    19: new ClassLevelModifier(14, 6, 6, 11, ['Transcendence', '5 5 5 5 5 4']),
    20: new ClassLevelModifier(15, 6, 6, 12, ['Channel skill +7, enlightenment', '5 5 5 5 5 5']),
  },
  Operative: {
    1: new ClassLevelModifier(0, 0, 2, 2, ['Operative’s edge +1, specialization, trick attack +1d4']),
    2: new ClassLevelModifier(1, 0, 3, 3, ['Evasion, operative exploit']),
    3: new ClassLevelModifier(2, 1, 3, 3, ['Operative’s edge +2, quick movement (+10 ft.), trick attack +1d8, weapon specialization']),
    4: new ClassLevelModifier(3, 1, 4, 4, ['Debilitating trick, operative exploit']),
    5: new ClassLevelModifier(3, 1, 4, 4, ['Specialization exploit, trick attack +3d8']),
    6: new ClassLevelModifier(4, 2, 5, 5, ['Operative exploit']),
    7: new ClassLevelModifier(5, 2, 5, 5, ['Operative’s edge +3, specialization skill mastery, trick attack +4d8, uncanny agility']),
    8: new ClassLevelModifier(6, 2, 6, 6, ['Operative exploit, triple attack']),
    9: new ClassLevelModifier(6, 3, 6, 6, ['Quick movement (+20 ft.), trick attack +5d8']),
    10: new ClassLevelModifier(7, 3, 7, 7, ['Operative exploit']),
    11: new ClassLevelModifier(8, 3, 7, 7, ['Operative’s edge +4, specialization power, trick attack +6d8']),
    12: new ClassLevelModifier(9, 4, 8, 8, ['Operative exploit']),
    13: new ClassLevelModifier(9, 4, 8, 8, ['Quad attack, trick attack +7d8']),
    14: new ClassLevelModifier(10, 4, 9, 9, ['Operative exploit']),
    15: new ClassLevelModifier(11, 5, 9, 9, ['Operative’s edge +5, quick movement (+30 ft.), trick attack +8d8']),
    16: new ClassLevelModifier(12, 5, 0, 10, ['Operative exploit']),
    17: new ClassLevelModifier(12, 5, 0, 10, ['Double debilitation, trick attack +9d8']),
    18: new ClassLevelModifier(13, 6, 1, 11, ['Operative exploit']),
    19: new ClassLevelModifier(14, 6, 1, 11, ['Operative’s edge +6, trick attack +10d8']),
    20: new ClassLevelModifier(15, 6, 2, 12, ['Operative exploit, supreme operative']),
  },
  Solarian: {
    1: new ClassLevelModifier(1, 2, 0, 2, ['Skill adept, solar manifestation, stellar mode, stellar revelation (black hole, supernova), +1 AC 1d6']),
    2: new ClassLevelModifier(2, 3, 0, 3, ['Stellar revelation, +1 AC 1d6']),
    3: new ClassLevelModifier(3, 3, 1, 3, ['Sidereal influence (2 skills), weapon specialization, +1 AC 1d6']),
    4: new ClassLevelModifier(4, 4, 1, 4, ['Stellar revelation, +1 AC 1d6']),
    5: new ClassLevelModifier(5, 4, 1, 4, ['-, +1 AC, resistance 5 1d6']),
    6: new ClassLevelModifier(6, 5, 2, 5, ['Stellar revelation, +1 AC, resistance 5 2d6']),
    7: new ClassLevelModifier(7, 5, 2, 5, ['Flashing strikes , +1 AC, resistance 5 2d6']),
    8: new ClassLevelModifier(8, 6, 2, 6, ['Stellar revelation, +1 AC, resistance 5 2d6']),
    9: new ClassLevelModifier(9, 6, 3, 6, ['Zenith revelations, +1 AC, resistance 5 3d6']),
    10: new ClassLevelModifier(10, 7, 3, 7, ['Stellar revelation, +2 AC, resistance 10 3d6']),
    11: new ClassLevelModifier(11, 7, 3, 7, ['Sidereal influence (4 skills), +2 AC, resistance 10 3d6']),
    12: new ClassLevelModifier(12, 8, 4, 8, ['Stellar revelation, +2 AC, resistance 10 4d6']),
    13: new ClassLevelModifier(13, 8, 4, 8, ['Solarian’s onslaught, +2 AC, resistance 10 5d6']),
    14: new ClassLevelModifier(14, 9, 4, 9, ['Stellar revelation, +2 AC, resistance 10 6d6']),
    15: new ClassLevelModifier(15, 9, 5, 9, ['-, +2 AC, resistance 15 7d6']),
    16: new ClassLevelModifier(16, 10, 5, 10, ['Stellar revelation, +2 AC, resistance 15 8d6']),
    17: new ClassLevelModifier(17, 10, 5, 10, ['Zenith revelations, +2 AC, resistance 15 9d6']),
    18: new ClassLevelModifier(18, 11, 6, 11, ['Stellar revelation, +2 AC, resistance 15 10d6']),
    19: new ClassLevelModifier(19, 11, 6, 11, ['Sidereal influence (6 skills), +2 AC, resistance 15 11d6']),
    20: new ClassLevelModifier(20, 12, 6, 12, ['Stellar revelation, +2 AC, resistance 20 12d6']),
  },
  Soldier: {
    1: new ClassLevelModifier(1, 2, 0, 2, ['Primary fighting style, primary style technique']),
    2: new ClassLevelModifier(2, 3, 0, 3, ['Combat feat']),
    3: new ClassLevelModifier(3, 3, 1, 3, ['Gear boost, weapon specialization']),
    4: new ClassLevelModifier(4, 4, 1, 4, ['Combat feat']),
    5: new ClassLevelModifier(5, 4, 1, 4, ['Primary style technique']),
    6: new ClassLevelModifier(6, 5, 2, 5, ['Combat feat']),
    7: new ClassLevelModifier(7, 5, 2, 5, ['Gear boost']),
    8: new ClassLevelModifier(8, 6, 2, 6, ['Combat feat']),
    9: new ClassLevelModifier(9, 6, 3, 6, ['Primary style technique, secondary fighting style, secondary style technique']),
    10: new ClassLevelModifier(10, 7, 3, 7, ['Combat feat']),
    11: new ClassLevelModifier(11, 7, 3, 7, ['Gear boost, soldier’s onslaught']),
    12: new ClassLevelModifier(12, 8, 4, 8, ['Combat feat']),
    13: new ClassLevelModifier(13, 8, 4, 8, ['Primary style technique, secondary style technique']),
    14: new ClassLevelModifier(14, 9, 4, 9, ['Combat feat']),
    15: new ClassLevelModifier(15, 9, 5, 9, ['Gear boost']),
    16: new ClassLevelModifier(16, 10, 5, 10, ['Combat feat']),
    17: new ClassLevelModifier(17, 10, 5, 10, ['Primary style technique, secondary style technique']),
    18: new ClassLevelModifier(18, 11, 6, 11, ['Combat feat']),
    19: new ClassLevelModifier(19, 11, 6, 11, ['Gear boost']),
    20: new ClassLevelModifier(20, 12, 6, 12, ['Combat feat']),
  },
  Technomancer: {
    1: new ClassLevelModifier(0, 0, 0, 2, ['Spell cache', '2 - - - - -']),
    2: new ClassLevelModifier(1, 0, 0, 3, ['Magic hack', '2 - - - - -']),
    3: new ClassLevelModifier(2, 1, 1, 3, ['Spell Focus, techlore +1, weapon specialization', '3 - - - - -']),
    4: new ClassLevelModifier(3, 1, 1, 4, ['-,', '3 2 - - - -']),
    5: new ClassLevelModifier(3, 1, 1, 4, ['Magic hack', '4 2 - - - -']),
    6: new ClassLevelModifier(4, 2, 2, 5, ['Cache capacitor 1, techlore +2', '4 3 - - - -']),
    7: new ClassLevelModifier(5, 2, 2, 5, ['-,', '4 3 2 - - -']),
    8: new ClassLevelModifier(6, 2, 2, 6, ['Magic hack', '4 4 2 - - -']),
    9: new ClassLevelModifier(6, 3, 3, 6, ['Techlore +3', '5 4 3 - - -']),
    10: new ClassLevelModifier(7, 3, 3, 7, ['-,', '5 4 3 2 - -']),
    11: new ClassLevelModifier(8, 3, 3, 7, ['Magic hack', '5 4 4 2 - -']),
    12: new ClassLevelModifier(9, 4, 4, 8, ['Cache capacitor 2, techlore +4', '5 5 4 3 - -']),
    13: new ClassLevelModifier(9, 4, 4, 8, ['-,', '5 5 5 3 2 -']),
    14: new ClassLevelModifier(10, 4, 4, 9, ['Magic hack', '5 5 5 4 2 -']),
    15: new ClassLevelModifier(11, 5, 5, 9, ['Techlore +5', '5 5 5 4 3 -']),
    16: new ClassLevelModifier(12, 5, 5, 10, ['-,', '5 5 5 4 3 2']),
    17: new ClassLevelModifier(12, 5, 5, 10, ['Magic hack', '5 5 5 4 4 2']),
    18: new ClassLevelModifier(13, 6, 6, 11, ['Cache capacitor 3, techlore +6', '5 5 5 4 4 3']),
    19: new ClassLevelModifier(14, 6, 6, 11, ['Resolve attunement', '5 5 5 5 5 4']),
    20: new ClassLevelModifier(15, 6, 6, 12, ['Fuse spells, magic hack', '5 5 5 5 5 5']),
  },
  Vanguard: {
    1: new ClassLevelModifier(1, 2, 0, 2, ['This Is Wrong']),
    2: new ClassLevelModifier(2, 3, 0, 3, ['Combat feat']),
    3: new ClassLevelModifier(3, 3, 1, 3, ['Gear boost, weapon specialization']),
    4: new ClassLevelModifier(4, 4, 1, 4, ['Combat feat']),
    5: new ClassLevelModifier(5, 4, 1, 4, ['Primary style technique']),
    6: new ClassLevelModifier(6, 5, 2, 5, ['Combat feat']),
    7: new ClassLevelModifier(7, 5, 2, 5, ['Gear boost']),
    8: new ClassLevelModifier(8, 6, 2, 6, ['Combat feat']),
    9: new ClassLevelModifier(9, 6, 3, 6, ['Primary style technique, secondary fighting style, secondary style technique']),
    10: new ClassLevelModifier(10, 7, 3, 7, ['Combat feat']),
    11: new ClassLevelModifier(11, 7, 3, 7, ['Gear boost, soldier’s onslaught']),
    12: new ClassLevelModifier(12, 8, 4, 8, ['Combat feat']),
    13: new ClassLevelModifier(13, 8, 4, 8, ['Primary style technique, secondary style technique']),
    14: new ClassLevelModifier(14, 9, 4, 9, ['Combat feat']),
    15: new ClassLevelModifier(15, 9, 5, 9, ['Gear boost']),
    16: new ClassLevelModifier(16, 10, 5, 10, ['Combat feat']),
    17: new ClassLevelModifier(17, 10, 5, 10, ['Primary style technique, secondary style technique']),
    18: new ClassLevelModifier(18, 11, 6, 11, ['Combat feat']),
    19: new ClassLevelModifier(19, 11, 6, 11, ['Gear boost']),
    20: new ClassLevelModifier(20, 12, 6, 12, ['Combat feat']),
  },
  Witchwarper: {
    1: new ClassLevelModifier(0, 0, 0, 2, ['This is wrong', '2 - - - - -']),
    2: new ClassLevelModifier(1, 0, 0, 3, ['Magic hack', '2 - - - - -']),
    3: new ClassLevelModifier(2, 1, 1, 3, ['Spell Focus, techlore +1, weapon specialization', '3 - - - - -']),
    4: new ClassLevelModifier(3, 1, 1, 4, ['-,', '3 2 - - - -']),
    5: new ClassLevelModifier(3, 1, 1, 4, ['Magic hack', '4 2 - - - -']),
    6: new ClassLevelModifier(4, 2, 2, 5, ['Cache capacitor 1, techlore +2', '4 3 - - - -']),
    7: new ClassLevelModifier(5, 2, 2, 5, ['-,', '4 3 2 - - -']),
    8: new ClassLevelModifier(6, 2, 2, 6, ['Magic hack', '4 4 2 - - -']),
    9: new ClassLevelModifier(6, 3, 3, 6, ['Techlore +3', '5 4 3 - - -']),
    10: new ClassLevelModifier(7, 3, 3, 7, ['-,', '5 4 3 2 - -']),
    11: new ClassLevelModifier(8, 3, 3, 7, ['Magic hack', '5 4 4 2 - -']),
    12: new ClassLevelModifier(9, 4, 4, 8, ['Cache capacitor 2, techlore +4', '5 5 4 3 - -']),
    13: new ClassLevelModifier(9, 4, 4, 8, ['-,', '5 5 5 3 2 -']),
    14: new ClassLevelModifier(10, 4, 4, 9, ['Magic hack', '5 5 5 4 2 -']),
    15: new ClassLevelModifier(11, 5, 5, 9, ['Techlore +5', '5 5 5 4 3 -']),
    16: new ClassLevelModifier(12, 5, 5, 10, ['-,', '5 5 5 4 3 2']),
    17: new ClassLevelModifier(12, 5, 5, 10, ['Magic hack', '5 5 5 4 4 2']),
    18: new ClassLevelModifier(13, 6, 6, 11, ['Cache capacitor 3, techlore +6', '5 5 5 4 4 3']),
    19: new ClassLevelModifier(14, 6, 6, 11, ['Resolve attunement', '5 5 5 5 5 4']),
    20: new ClassLevelModifier(15, 6, 6, 12, ['Fuse spells, magic hack', '5 5 5 5 5 5']),
  }
};
