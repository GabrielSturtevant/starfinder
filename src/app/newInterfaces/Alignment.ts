export interface IAlignment {
  name: string;
  abbreviation: string;
  enumVal: AlignmentEnum;
}

export class Alignment implements IAlignment {
  readonly name: string;
  readonly abbreviation: string;
  readonly enumVal: AlignmentEnum;
  constructor(alignment: AlignmentEnum) {
    this.name = AlignmentNames[alignment];
    this.abbreviation = alignmentAbbreviations[alignment];
    this.enumVal = alignment;
  }
}

export enum AlignmentEnum {
  CHAOTIC_GOOD,
  CHAOTIC_NEUTRAL,
  CHAOTIC_EVIL,
  NEUTRAL_GOOD,
  NEUTRAL_NEUTRAL,
  NEUTRAL_EVIL,
  LAWFUL_GOOD,
  LAWFUL_NEUTRAL,
  LAWFUL_EVIL
}

const alignmentAbbreviations = [
  'CG',
  'CN',
  'CE',
  'NG',
  'NN',
  'NE',
  'LG',
  'LN',
  'LE'
];

export const AlignmentNames = [
  'Chaotic Good',
  'Chaotic Neutral',
  'Chaotic Evil',
  'Neutral Good',
  'Neutral Neutral',
  'Neutral Evil',
  'Lawful Good',
  'Lawful Neutral',
  'Lawful Evil'
];

export const AlignmentList: Array<Alignment> = [
  new Alignment(AlignmentEnum.CHAOTIC_GOOD),
  new Alignment(AlignmentEnum.CHAOTIC_NEUTRAL),
  new Alignment(AlignmentEnum.CHAOTIC_EVIL),
  new Alignment(AlignmentEnum.NEUTRAL_GOOD),
  new Alignment(AlignmentEnum.NEUTRAL_NEUTRAL),
  new Alignment(AlignmentEnum.NEUTRAL_EVIL),
  new Alignment(AlignmentEnum.LAWFUL_GOOD),
  new Alignment(AlignmentEnum.LAWFUL_NEUTRAL),
  new Alignment(AlignmentEnum.LAWFUL_EVIL)
];
