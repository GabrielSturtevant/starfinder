import {Component, OnInit} from '@angular/core';
import {BaseCharacterStats} from '../../newInterfaces/BaseCharacterStats';
import {Alignment, AlignmentList} from '../../newInterfaces/Alignment';
import {Skill, Skills} from '../../newInterfaces/Skill';
import {CharacterClass, ClassesAvailable, ICharacterClass} from '../../newInterfaces/CharacterClass';
import {Race, Races} from '../../newInterfaces/Race';
import {Theme, Themes} from '../../newInterfaces/Theme';
import {AbilityNames} from '../../newInterfaces/AbilityScore';

@Component({
  selector: 'app-character-entry',
  templateUrl: './character-entry.component.html',
  styleUrls: ['./character-entry.component.css']
})
export class CharacterEntryComponent implements OnInit {
  character: BaseCharacterStats = new BaseCharacterStats();
  alignmentList: Array<Alignment> = AlignmentList;
  chosenAlignment: string = this.character.alignment.name;
  skillList: Array<Skill> = new Array<Skill>();
  availableClasses = ClassesAvailable;
  chosenRace: string = this.character.race.name;
  availableRaces = Races;
  availableThemes: Array<Theme> = Themes;
  availableModifiers: Array<string> = AbilityNames;
  availableCharacterLevels: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  availableClassLevels: Array<number> = new Array<number>();

  constructor() {
    Skills.forEach(x => {
      this.skillList.push(
        new Skill(x)
      );
    });
    this.alignmentList.map(x => {
      if (x.name === this.character.alignment.name) {

      }
    });
    this.classLevelOptions();
    console.log('character: ', this.character);
  }


  ngOnInit(): void {

  }

  classLevelOptions(): void {
    const levelOptions: Array<number> = new Array<number>();
    for (let i = 1; i <= this.character.level; i++) {
      levelOptions.push(i);
    }
    this.availableClassLevels = levelOptions;
  }

  onRaceChange(event: any): void {
    this.availableRaces.forEach(x => {
      if (x.name === event.target.value) {
        this.character.race = new Race(x);
      }
    });
  }

  onCharacterClassChange(event: any, index: number): void {
    this.availableClasses.forEach(x => {
      if (x.name === event.name) {
        x.classLevel = this.character.characterClass[index].classLevel;
        this.character.removeClass(this.character.characterClass[index]);
        this.character.addClass(new CharacterClass(x));
      }
    });
    this.updateSelectedClassesFromOptions();
  }

  updateSelectedClassesFromOptions(): void {
    const newAvailableClasses = new Array();
    ClassesAvailable.map(x => {
      let inCharacter = false;
      this.character.characterClass.map(y => {
        if (x.name === y.name) {
          inCharacter = true;
        }
      });
      if (!inCharacter) {
        newAvailableClasses.push(x);
      }
    });
    this.availableClasses = newAvailableClasses;
  }

  addClass(): void {
    this.character.addClass(new CharacterClass(this.availableClasses[0]));
    this.updateSelectedClassesFromOptions();
  }

  removeClass(x: CharacterClass): void {
    this.character.removeClass(x);
    this.updateSelectedClassesFromOptions();
  }

  onClassLevelChange(event: number, index: number): void {
    console.log('event: ', event);
    let num: number = event;
    if (num < 1) {
      num = 1;
    }
    if (num > 20) {
      num = 20;
    }
    this.character.changeClassLevel(num, index);
  }

  get charInfo(): string {
    return JSON.stringify(this.character);
  }

  changeSomeShit(): void {
    this.character.massUpdate({name: 'Lawrence', alignment: new Alignment(5)});
  }
}
