
export type QuestionType = 'radio' | 'checkbox-group' | 'table' | 'text' | 'select' | 'info';

export interface Option {
  id?: string;
  label: string;
  value: number;
  description?: string;
}

export interface TableRow {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  description?: string;
  options?: Option[];
  rows?: TableRow[];
  maxScore?: number;
}

export interface Series {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  maxScore: number;
  scoreMultiplier?: number;
  scoreCalculation?: 'sum' | 'max';
}

export interface Section {
  id: string;
  title: string;
  series: Series[];
  maxScore: number;
}

export interface Scores {
  [key: string]: number;
}
