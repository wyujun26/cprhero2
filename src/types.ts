export type Language = 'en' | 'bn' | 'ta' | 'id' | 'my' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export interface Song {
  id: string;
  name: string;
  bpm: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LearnStep {
  id: string;
  letter: string;
  title: string;
  instruction: string;
  tip: string;
}
