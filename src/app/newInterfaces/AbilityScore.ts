export enum AbilityEnum {
  WISDOM = 'Wisdom',
  STRENGTH = 'Strength',
  DEXTERITY = 'Dexterity',
  CONSTITUTION = 'Constitution',
  INTELLIGENCE = 'Intelligence',
  CHARISMA = 'Charisma',
}

export const AbilityNamesEnum: Array<AbilityEnum> = [
  AbilityEnum.CHARISMA,
  AbilityEnum.CONSTITUTION,
  AbilityEnum.DEXTERITY,
  AbilityEnum.INTELLIGENCE,
  AbilityEnum.STRENGTH,
  AbilityEnum.WISDOM
];

export const AbilityNames: Array<string> = [
  'Wisdom',
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Charisma',
];

const abbreviations = {
  Wisdom: 'wis',
  Strength: 'str',
  Dexterity: 'dex',
  Constitution: 'con',
  Intelligence: 'int',
  Charisma: 'cha',
};

export interface IModifier {
  name: string;
  themeModifier?: boolean;
  racialModifier?: boolean;
  value: number;
  wildcard?: boolean;
}

export class Modifier implements IModifier {
  name: string;
  themeModifier: boolean;
  racialModifier: boolean;
  value: number;
  wildcard: boolean;

  constructor(properties: IModifier) {
    this.name = properties.name;
    this.themeModifier = properties.themeModifier ?? false;
    this.racialModifier = properties.racialModifier ?? false;
    this.value = properties.value;
    this. wildcard = properties.wildcard ?? false;
  }
}

export interface IAbilityScore {
  name: string;
  nameAbbreviation: string;
  baseScore: number;
  modifierValue: number;
  modifierArray: Array<Modifier>;
}

export class AbilityScore implements IAbilityScore {
  private _baseScore: number = 10;
  private readonly _name: string;
  private readonly _nameAbbreviation: string;
  private _modifierArray: Array<Modifier>;

  constructor(name: AbilityEnum) {
    this._name = name;
    this._nameAbbreviation = abbreviations[name];
    this._modifierArray = new Array<Modifier>();
  }

  get modifierArray(): Array<Modifier> {
    return this._modifierArray;
  }

  addModifier(modifier: Modifier): void {
    this._modifierArray.push(modifier);
  }

  removeModifier(modifier: Modifier): void {
    this._modifierArray.forEach((value, index) => {
      if (this.compareModifiers(value, modifier)) {
        this._modifierArray.splice(index, 1);
      }
    });
  }

  get raceModifiers(): Array<Modifier> {
    return this._modifierArray.filter(x => {
      return x.racialModifier;
    });
  }

  get raceModifierTotalNumber(): number {
    let sum = 0;
    this.raceModifiers.map(x => sum += x.value);
    return sum;
  }

  get raceModifierTotal(): string {
    const sum  = this.raceModifierTotalNumber;
    return sum >= 0 ? '+' + sum : '' + sum;
  }

  clearRaceModifiers(): void {
    this._modifierArray.reverse().forEach((value, index) => {
      if (value.racialModifier) {
        this._modifierArray.splice(index, 1);
      }
    });
  }

  get themeModifierTotalNumber(): number {
    let sum = 0;
    this.themeModifiers.map(x => sum += x.value);
    return sum;
  }

  clearThemeModifiers(): void {
    this._modifierArray.reverse().forEach((value, index) => {
      if (value.themeModifier) {
        this._modifierArray.splice(index, 1);
      }
    });
  }

  get themeModifierTotal(): string {
    const sum = this.themeModifierTotalNumber;
    return sum >= 0 ? '+' + sum : '-' + sum;
  }

    get themeModifiers(): Array<Modifier> {
    return this._modifierArray.filter(x => {
      return x.themeModifier;
    });
  }

  private compareModifiers(a: Modifier, b: Modifier): boolean {
    return a.name === b.name && a.racialModifier === b.racialModifier &&
      a.themeModifier === b.themeModifier && a.value === b.value;
  }

  get baseScore(): number {
    return this._baseScore;
  }

  set baseScore(value: number) {
    this._baseScore = value;
  }

  get name(): string {
    return this._name;
  }

  get nameAbbreviation(): string {
    return this._nameAbbreviation;
  }

  get totalScore(): number {
    return this.baseScore + this.raceModifierTotalNumber + this.themeModifierTotalNumber;
  }

  get modifierValue(): number {
    return Math.floor((this.totalScore - 10) / 2);
  }
}
