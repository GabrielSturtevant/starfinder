import {Modifier} from './AbilityScore';

export interface Speed {
  land: number;
  climb?: number | null;
  fly?: number | null;
  swim?: number | null;
  burrow?: number | null;
}

export interface IRace {
  name?: string;
  type?: string;
  subtype?: string;
  subSpecies?: string;
  subSpeciesOptions?: Array<string>;
  size?: string;
  speed?: Speed;
  hitPoints?: number;
  abilityAdjustmentOptions?: { [id: string]: Array<Modifier> };
}

export class Race implements IRace {
  private readonly _abilityAdjustmentsOptions: { [id: string]: Array<Modifier> };
  private readonly _name: string;
  private readonly _subtype: string;
  private readonly _type: string;
  private readonly _size: string;
  private readonly _hitPoints: number;
  private _subSpecies: string;
  private readonly _subSpeciesOptions: Array<string>;
  private _containsWildcard: boolean = false;
  private readonly _speed: Speed;

  constructor(properties: IRace = {}) {
    this._name = properties.name ?? '';
    this._type = properties.type ?? '';
    this._subtype = properties.subtype ?? '';
    this._size = properties.size ?? '';
    this._speed = properties.speed ?? {land: 30, climb: null,  fly: null, swim: null, burrow: null};
    this._hitPoints = properties.hitPoints ?? 1;
    this._subSpeciesOptions = properties.subSpeciesOptions ?? new Array<string>();
    this._subSpecies = properties.subSpecies ?? this._subSpeciesOptions[0];
    this._abilityAdjustmentsOptions = properties.abilityAdjustmentOptions ?? {[this._subSpecies]: new Array<Modifier>()};
    this.checkForWildcards();
  }


  get speed(): Speed {
    return this._speed;
  }

  get containsWildcard(): boolean {
    return this._containsWildcard;
  }

  private checkForWildcards(): void {
    this._abilityAdjustmentsOptions[this._subSpecies].map(x => {
      if (x.wildcard) {
        this._containsWildcard = true;
      }
    });
  }

  get subSpecies(): string {
    return this._subSpecies;
  }

  set subSpecies(value: string) {
    this._subSpecies = value;
  }

  get subSpeciesOptions(): Array<string> {
    return this._subSpeciesOptions;
  }

  get size(): string {
    return this._size;
  }

  get hitPoints(): number {
    return this._hitPoints;
  }

  getAbilityAdjustments(): Array<Modifier> {
    return this._abilityAdjustmentsOptions[this._subSpecies];
  }

  get name(): string {
    return this._name;
  }

  get subtype(): string {
    return this._subtype;
  }

  get type(): string {
    return this._type;
  }

  replaceWildcardAbilityModifier(mod: string): void {
    this.getAbilityAdjustments().forEach((x, index) => {
      if (x.wildcard) {
        this._abilityAdjustmentsOptions[this._subSpecies][index] =
          new Modifier({name: mod, racialModifier: true, value: x.value, wildcard: true});
        return;
      }
    });
  }

}

export const Races: Array<IRace> = [
  {
    name: 'Android',
    type: 'humanoid',
    subtype: 'android',
    size: 'medium',
    speed: {land: 30},
    subSpecies: 'Android',
    subSpeciesOptions: ['Android'],
    hitPoints: 4,
    abilityAdjustmentOptions: {
      Android: [
        new Modifier({
          name: 'Intelligence',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Dexterity',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Charisma',
          value: -2,
          racialModifier: true
        })
      ]
    }
  },
  {
    name: 'Kasathas',
    type: 'humanoid',
    subtype: 'kasathas',
    speed: {land: 30},
    size: 'medium',
    subSpecies: 'Kasathas',
    subSpeciesOptions: ['Kasathas'],
    hitPoints: 4,
    abilityAdjustmentOptions: {
      Kasathas: [
        new Modifier({
          name: 'Intelligence',
          value: -2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Wisdom',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Strength',
          value: 2,
          racialModifier: true
        })
      ]
    }
  },
  {
    name: 'Human',
    type: 'humanoid',
    subtype: 'human',
    speed: {land: 30},
    size: 'medium',
    subSpecies: 'Human',
    subSpeciesOptions: ['Human'],
    hitPoints: 4,
    abilityAdjustmentOptions: {
      Human: [
        new Modifier({
          name: 'Any',
          value: 2,
          racialModifier: true,
          wildcard: true
        })
      ]
    }
  },
  {
    name: 'Lashunta',
    type: 'humanoid',
    subtype: 'lashunta',
    speed: {land: 30},
    size: 'medium',
    subSpecies: 'Korasha',
    subSpeciesOptions: ['Korasha', 'Damaya'],
    hitPoints: 4,
    abilityAdjustmentOptions: {
      Korasha: [
        new Modifier({
          name: 'Charisma',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Wisdom',
          value: -2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Strength',
          value: 2,
          racialModifier: true
        })
      ],
      Damaya: [
        new Modifier({
          name: 'Intelligence',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Charisma',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Constitution',
          value: -2,
          racialModifier: true
        })
      ]
    }
  },
  {
    name: 'Shirren',
    type: 'humanoid',
    subtype: 'shirren',
    speed: {land: 30},
    size: 'medium',
    subSpecies: 'Shirren',
    subSpeciesOptions: ['Shirren'],
    hitPoints: 4,
    abilityAdjustmentOptions: {
      Shirren: [
        new Modifier({
          name: 'Charisma',
          value: -2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Wisdom',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Constitution',
          value: 2,
          racialModifier: true
        })
      ]
    }
  },
  {
    name: 'Ysoki',
    type: 'humanoid',
    subtype: 'ysoki',
    speed: {land: 30},
    size: 'small',
    subSpecies: 'Ysoki',
    subSpeciesOptions: ['Ysoki'],
    hitPoints: 2,
    abilityAdjustmentOptions: {
      Ysoki: [
        new Modifier({
          name: 'Intelligence',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Dexterity',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Strength',
          value: -2,
          racialModifier: true
        })
      ]
    }
  },
  {
    name: 'Vesk',
    type: 'humanoid',
    subtype: 'vesk',
    speed: {land: 30},
    size: 'medium',
    subSpecies: 'Vesk',
    subSpeciesOptions: ['Vesk'],
    hitPoints: 6,
    abilityAdjustmentOptions: {
      Vesk: [
        new Modifier({
          name: 'Intelligence',
          value: -2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Constitution',
          value: 2,
          racialModifier: true
        }),
        new Modifier({
          name: 'Strength',
          value: 2,
          racialModifier: true
        })
      ]
    }
  }
];
