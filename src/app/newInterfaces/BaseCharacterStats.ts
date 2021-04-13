import {AbilityEnum, AbilityNamesEnum, AbilityScore, Modifier} from './AbilityScore';
import {Alignment, AlignmentEnum} from './Alignment';
import {CharacterClass, ClassesAvailable} from './CharacterClass';
import {Race, Races, Speed} from './Race';
import {Theme, Themes} from './Theme';
import {Skill, Skills} from './Skill';

export interface IBaseCharacterStats {
  name?: string;
  characterClass?: Array<CharacterClass>;
  level?: number;
  race?: Race;
  theme?: Theme;
  gender?: string;
  homeWorld?: string;
  alignment?: Alignment;
  deity?: string;
  skillRanksPerLevel?: number;
  baseAttackBonus?: number;
  hitPointsTotal?: number;
  hitPointsCurrent?: number;
  staminaPointsTotal?: number;
  staminaPointsCurrent?: number;
  resolvePointsTotal?: number;
  resolvePointsCurrent?: number;
  readonly abilities?: Array<AbilityScore>;
}

export class BaseCharacterStats implements IBaseCharacterStats {
  private _name: string;
  private _alignment: Alignment;
  private _characterClass: Array<CharacterClass>;
  private _deity: string;
  private _gender: string;
  private _homeWorld: string;
  private _level: number = 1;
  private _race!: Race;
  private _theme!: Theme;
  private readonly _abilities!: Array<AbilityScore>;
  private _hitPointsCurrent: number;
  private _staminaPointsCurrent: number;
  private _resolvePointsCurrent: number;
  private abilityKeys!: {};
  private _baseAttackBonus!: number;
  private _hitPoints!: number;
  private _staminaPoints!: number;
  private _resolvePoints!: number;
  private _fortitudeSaveBonus!: number;
  private _willSaveBonus!: number;
  private _reflexSaveBonus!: number;
  private _classLevelTotal!: number;
  private _skillsList: Array<Skill> = new Array<Skill>();

  constructor(properties: IBaseCharacterStats = {}) {
    this._abilities = new Array<AbilityScore>();
    this.generateBaseAbilities();
    this._name = properties.name ?? 'Foobar the Slow';
    this._alignment = properties.alignment ?? new Alignment(AlignmentEnum.CHAOTIC_GOOD);
    this._characterClass = properties.characterClass ?? [new CharacterClass(ClassesAvailable[0])];
    this._deity = properties.deity ?? 'Yahweh';
    this._gender = properties.gender ?? 'Toaster';
    this._homeWorld = properties.homeWorld ?? 'Mars';
    this._level = properties.level ?? 1;
    this.race = properties.race ?? new Race(Races[5]);
    this.theme = properties.theme ?? Themes[6];
    this.generateSkills();
    this.calculatePoints();
    this._hitPointsCurrent = this.hitPointsTotal;
    this._staminaPointsCurrent = this.staminaPoints;
    this._resolvePointsCurrent = this.resolvePoints;
  }

  private generateSkills(): void {
    Skills.forEach(x => {
      this._skillsList.push(
        new Skill(x)
      );
    });
  }

  private generateBaseAbilities(): void {
    AbilityNamesEnum.forEach(x => {
      this._abilities.push(
        new AbilityScore(x)
      );
    });
  }

  massUpdate(properties: IBaseCharacterStats): void {
    this._name = properties.name ?? this._name;
    this._alignment = properties.alignment ?? this._alignment;
    this._characterClass = properties.characterClass ?? this._characterClass;
    this._deity = properties.deity ?? this._deity;
    this._gender = properties.gender ?? this._gender;
    this._homeWorld = properties.homeWorld ?? this._homeWorld;
    this._level = properties.level ?? this._level;
    this._race = properties.race ?? this._race;
    this.theme = properties.theme ?? this._theme;
    this.calculatePoints();
  }

  calculatePoints(): void {
    this.calculateResolvePoints();
    this.calculateBaseAttackBonus();
    this.calculateHitPoints();
    this.calculateStaminaPoints();
    this.calculateFortitudeSaveBonus();
    this.calculateWillSaveBonus();
    this.calculateReflexSaveBonus();
    this.calculateClassLevelTotal();

    // Do last
    this.calculateSkills();
  }

  calculateSkills(): void {
    this.skillList.forEach(x => {
      x.abilityModifier = this.getSpecificAbility(x.associatedAbility).modifierValue;
      let foo = false;
      this._characterClass.forEach(y => {
        if (y.classSkills.indexOf(x.name) >= 0) {
          foo = true;
        }
      });
      x.classSkill = foo;
    });
  }

  calculateClassLevelTotal(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.classLevel;
    });
    this._classLevelTotal = sum;
  }

  calculateFortitudeSaveBonus(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.fortitudeSaveBonus;
    });
    this._fortitudeSaveBonus = sum;
  }

  calculateWillSaveBonus(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.willSaveBonus;
    });
    this._willSaveBonus = sum;
  }

  calculateReflexSaveBonus(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.reflexSaveBonus;
    });
    this._reflexSaveBonus = sum;
  }

  calculateStaminaPoints(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.staminaPoints;
    });
    this._staminaPoints = sum;
  }

  calculateHitPoints(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.hitPoints;
    });
    this._hitPoints = sum;
  }

  calculateBaseAttackBonus(): void {
    let sum = 0;
    this._characterClass.forEach(x => {
      sum += x.baseAttackBonus;
    });
    this._baseAttackBonus = sum;
  }

  calculateResolvePoints(): void {
    let val = Math.floor(this._level / 2);
    val = val > 0 ? val : 1;
    this._abilities.map(x => {
      this._characterClass.forEach(y => {
        if (x.name === y.keyAbility) {
          val += x.modifierValue;
        }
      });
    });
    this._resolvePoints = val;
  }

  get skillList(): Array<Skill> {
    return this._skillsList;
  }

  get canAddClass(): boolean {
    return this.level > this._classLevelTotal;
  }

  get classLevelTotal(): number {
    return this._classLevelTotal;
  }

  get hitPoints(): number {
    return this._hitPoints;
  }

  get fortitudeSaveBonus(): number {
    return this._fortitudeSaveBonus;
  }

  get willSaveBonus(): number {
    return this._willSaveBonus;
  }

  get reflexSaveBonus(): number {
    return this._reflexSaveBonus;
  }

  get abilities(): Array<AbilityScore> {
    return this._abilities;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get alignment(): Alignment {
    return this._alignment;
  }

  set alignment(value: Alignment) {
    this._alignment = value;
  }

  get baseAttackBonus(): number {
    return this._baseAttackBonus;
  }

  setAbilityBaseScore(event: any, index: number): void {
    this._abilities[index].baseScore = +event.target.value;
    this.calculatePoints();
  }

  get characterClass(): Array<CharacterClass> {
    return this._characterClass;
  }

  addClass(charClass: CharacterClass): void {
    this._characterClass.push(charClass);
    this.calculatePoints();
  }

  removeClass(charClass: CharacterClass): void {
    this._characterClass.forEach((x, index) => {
      if (x.name === charClass.name) {
        this._characterClass.splice(index, 1);
      }
    });
    this.calculatePoints();
  }

  changeClassLevel(val: number, index: number): void {
    this._characterClass[index].classLevel = val;
    this.calculatePoints();
  }

  get deity(): string {
    return this._deity;
  }

  set deity(value: string) {
    this._deity = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get homeWorld(): string {
    return this._homeWorld;
  }

  set homeWorld(value: string) {
    this._homeWorld = value;
  }

  get hitPointsTotal(): number {
    return this._race.hitPoints + this._hitPoints;
  }

  get hitPointsCurrent(): number {
    return this._hitPointsCurrent;
  }

  set hitPointsCurrent(val: number) {
    this._hitPointsCurrent = val;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
    this.calculatePoints();
  }

  setRacialAbilityModifier(name: string): void {
    this._race.replaceWildcardAbilityModifier(name);
    this.race = this._race;
  }

  setSubSpecies(subSpeciesName: string): void {
    this._race.subSpecies = subSpeciesName;
    this.race = this._race;
  }

  get race(): Race {
    return this._race;
  }

  set race(value: Race) {
    this._race = value;
    this._abilities.forEach(x => {
      x.clearRaceModifiers();
      value.getAbilityAdjustments().forEach(y => {
        if (x.name.toLowerCase() === y.name.toLowerCase()) {
          x.addModifier(y);
        }
      });
    });
    this.calculatePoints();
  }

  get size(): string {
    return this._race.size;
  }

  get speed(): Speed {
    return this._race.speed;
  }

  getSpecificAbility(name: AbilityEnum|string): AbilityScore {
    let abil = new AbilityScore(AbilityEnum.INTELLIGENCE);
    this._abilities.forEach(x => {
      if (name === x.name) {
        abil = x;
      }
    });
    return abil;
  }

  getSpecificAbilityModifier(name: AbilityEnum): number {
    let val = 0;
    this._abilities.map(x => {
      if (x.name === name) {
        val = x.modifierValue;
      }
    });
    return val;
  }

  get staminaPoints(): number {
    return this._staminaPoints + this.getSpecificAbilityModifier(AbilityEnum.CONSTITUTION);
  }

  get staminaPointsCurrent(): number {
    return this._staminaPointsCurrent;
  }

  set staminaPointsCurrent(val: number) {
    this._staminaPointsCurrent = val;
  }

  get resolvePoints(): number {
    return this._resolvePoints;
  }

  get resolvePointsCurrent(): number {
    return this._resolvePointsCurrent;
  }

  set resolvePointsCurrent(val: number) {
    this._resolvePointsCurrent = val;
  }

  get theme(): Theme {
    return this._theme;
  }

  set theme(value: Theme) {
    this._theme = value;
    this._abilities.forEach(x => {
      x.clearThemeModifiers();
      if (x.name.toLowerCase() === value.modifier.name.toLowerCase()) {
        x.addModifier(value.modifier);
      }
    });
  }

  setThemelessModifier(abilityName: string): void {
    if (!this._theme.containsWildcard) {
      return;
    }
    this.theme = new Theme('Themeless', new Modifier({name: abilityName, themeModifier: true, value: 1, wildcard: true}));
  }
}
