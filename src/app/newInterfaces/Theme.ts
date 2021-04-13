import {Modifier} from './AbilityScore';

export interface ITheme {
  name: string;
  modifier: Modifier;
}

export class Theme implements ITheme {
  private readonly _modifier: Modifier;
  private readonly _name: string;
  private readonly _containsWildcard: boolean;

  constructor(name: string, modifier: Modifier) {
    this._modifier = modifier;
    this._name = name;
    this._containsWildcard = this._modifier.wildcard;
  }

  get containsWildcard(): boolean {
    return this._containsWildcard;
  }

  get modifier(): Modifier {
    return this._modifier;
  }

  get name(): string {
    return this._name;
  }
}

export const Themes: Array<Theme> = [
  new Theme('Ace Pilot', new Modifier({name: 'Dexterity', themeModifier: true, value: 1})),
  new Theme('Bounty Hunter', new Modifier({name: 'Constitution', themeModifier: true, value: 1})),
  new Theme('Icon', new Modifier({name: 'Charisma', themeModifier: true, value: 1})),
  new Theme('Mercenary', new Modifier({name: 'Strength', themeModifier: true, value: 1})),
  new Theme('Outlaw', new Modifier({name: 'Dexterity', themeModifier: true, value: 1})),
  new Theme('Priest', new Modifier({name: 'Wisdom', themeModifier: true, value: 1})),
  new Theme('Scholar', new Modifier({name: 'Intelligence', themeModifier: true, value: 1})),
  new Theme('Spacefarer', new Modifier({name: 'Constitution', themeModifier: true, value: 1})),
  new Theme('Xenoseeker', new Modifier({name: 'Charisma', themeModifier: true, value: 1})),
  new Theme('Themeless', new Modifier({name: 'Any', themeModifier: true, value: 1, wildcard: true})),
];
