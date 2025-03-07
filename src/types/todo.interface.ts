export interface ITodoItem {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface ITodoInfo {
  all: number;
  completed: number;
  inWork: number;
}
