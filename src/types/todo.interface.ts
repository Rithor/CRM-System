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

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export enum TodoFilter {
  ALL = 'All',
  COMPLETED = 'completed',
  IN_WORK = 'inWork',
}
