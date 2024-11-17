export interface Poem {
  id: number;
  title: string;
  author: string;
  dynasty: 'tang' | 'song';
  content: string;
  difficulty: 1 | 2 | 3;
}

export type Difficulty = 1 | 2 | 3;

export interface LearningProgress {
  [key: number]: {
    completed: boolean;
    lastPlayed?: string;
    score?: number;
  };
}