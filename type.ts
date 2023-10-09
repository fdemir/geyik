type $fixme = any;

export interface Source {
  _id: string;
  name: string;
  book: string;
  editor: string;
  datePublished: string;
  timeCreated: string;
  timeUpdated: string;
  id_depr: number;
  abbreviation: string;
  date: string;
}

export interface History {
  _id: string;
  id_depr: number;
  language: $fixme;
  excerpt: string;
  definition: string;
  source: Source;
  date: string;
  dateSortable: number;
  quote: string;
  timeCreated: string;
  timeUpdated: string;
}

export interface Language {
  _id: string;
  name: string;
  description: string;
  description2: string;
  timeCreated: string;
  timeUpdated: string;
  abbreviation: string;
  id_depr: number;
}
export interface Etymology {
  _id: string;
  id_depr: number;
  paranthesis: string;
  relation: Relation;
  languages: Language[];
  originalText: string;
  romanizedText: string;
  definition: string;
  neologism: string;
  wordClass: WordClass;
  timeCreated: string;
  timeUpdated: string;
  affixes: Affixes;
  grammar: any;
}

export interface Relation {
  _id: string;
  name: string;
  abbreviation: string;
  text: string;
}

export interface WordClass {
  _id: string;
  name: string;
  description: string;
  abbreviation: string;
}

export interface Language2 {
  _id: string;
}

export interface Affixes {
  suffix?: Suffix;
}

export interface Suffix {
  _id: string;
  name: string;
  description: string;
  language: Language2;
  timeCreated: string;
  timeUpdated: string;
  id_depr: number;
}

export interface Word {
  _id: string;
  histories: History[];
  id_depr: number;
  name: string;
  note: string;
  queries: string[];
  similarWords: string[];
  timeCreated: string;
  timeUpdated: string;
  actualTimeUpdated: string;
  etymologies: Etymology[];
}

export interface Response {
  isUnsuccessful: boolean;
  words: Word[];
}
