import {AbilityEnum, AbilityScore} from './AbilityScore';

export interface ISkill {
  name?: string;
  associatedAbility?: string;
  total?: number;
  ranks?: number;
  classBonus?: number;
  abilityModifier?: number;
  miscModifier?: number;
  trainedOnly?: boolean;
  classSkill?: boolean;
  armorCheckPenalty?: boolean;
}

export class Skill implements ISkill {
  private _abilityModifier: number;
  private _armorCheckPenalty: boolean;
  private _associatedAbility: string;
  private _classBonus: number;
  private _classSkill: boolean;
  private _miscModifier: number;
  private _name: string;
  private _ranks: number;
  private _total!: number;
  private _trainedOnly: boolean;

  constructor(properties: ISkill = {}) {
    this._abilityModifier = properties.abilityModifier ?? 0;
    this._armorCheckPenalty = properties.armorCheckPenalty ?? true;
    this._associatedAbility = properties.associatedAbility ?? 'Intelligence';
    this._classBonus = properties.classBonus ?? 0;
    this._classSkill = properties.classSkill ?? false;
    this._miscModifier = properties.miscModifier ?? 0;
    this._name = properties.name ?? '';
    this._ranks = properties.ranks ?? 0;
    this._trainedOnly = properties.trainedOnly ?? false;
    this.updateValues();
  }

  updateArbitrary(properties: ISkill = {}): void {
    this._abilityModifier = properties.abilityModifier ?? this._abilityModifier;
    this._armorCheckPenalty = properties.armorCheckPenalty ?? this._armorCheckPenalty;
    this._associatedAbility = properties.associatedAbility ?? this._associatedAbility;
    this._classBonus = properties.classBonus ?? this._classBonus;
    this._classSkill = properties.classSkill ?? this._classSkill;
    this._miscModifier = properties.miscModifier ?? this._miscModifier;
    this._name = properties.name ?? this._name;
    this._ranks = properties.ranks ?? this._ranks;
    this._trainedOnly = properties.trainedOnly ?? this._trainedOnly;
    this.updateValues();
  }

  private updateValues(): void {
    this.calculateTotalScore();
  }

  get abilityModifier(): number {
    return this._abilityModifier;
  }

  set abilityModifier(value: number) {
    this._abilityModifier = value;
    this.updateValues();
  }

  get armorCheckPenalty(): boolean {
    return this._armorCheckPenalty;
  }

  set armorCheckPenalty(value: boolean) {
    this._armorCheckPenalty = value;
  }

  get associatedAbility(): string {
    return this._associatedAbility;
  }

  set associatedAbility(value: string) {
    this._associatedAbility = value;
  }

  get classBonus(): number {
    return this._classBonus;
  }

  set classBonus(value: number) {
    this._classBonus = value;
  }

  get classSkill(): boolean {
    return this._classSkill;
  }

  set classSkill(value: boolean) {
    this._classSkill = value;
  }

  get miscModifier(): number {
    return this._miscModifier;
  }

  set miscModifier(value: number) {
    this._miscModifier = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get ranks(): number {
    return this._ranks;
  }

  set ranks(value: number) {
    this._ranks = value;
    if (this._ranks > 0 && this._classSkill) {
      this._classBonus = 3;
      this.updateValues();
      return;
    }
    this._classBonus = 0;
    this.updateValues();
  }

  get total(): number {
    return this._total;
  }

  get trainedOnly(): boolean {
    return this._trainedOnly;
  }

  set trainedOnly(value: boolean) {
    this._trainedOnly = value;
  }

  addMiscModifier(modifier: number): void {
    throw new Error('Method not implemented.');
  }

  private calculateTotalScore(): void {
    this._total = this._ranks + this._classBonus + this._abilityModifier + this._miscModifier;
  }

}

export const Skills: Array<ISkill> = [
  {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Strength',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Acrobatics',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Dexterity',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Athletics',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Charisma',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Bluff',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Computers',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Culture',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Charisma',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Diplomacy',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Charisma',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Disguise',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Engineering',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Charisma',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Intimidate',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Life Science',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Medicine',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Wisdom',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Mysticism',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Wisdom',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Perception',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Intelligence',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Physical Science',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Dexterity',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Piloting',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Charisma',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Profession',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Wisdom',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Sense Motive',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Dexterity',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Sleight of Hand',
    ranks: 0,
    total: 0,
    trainedOnly: true
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Dexterity',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Stealth',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }, {
    abilityModifier: 0,
    armorCheckPenalty: true,
    associatedAbility: 'Wisdom',
    classBonus: 0,
    classSkill: false,
    miscModifier: 0,
    name: 'Survival',
    ranks: 0,
    total: 0,
    trainedOnly: false
  }];
