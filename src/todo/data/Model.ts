export const USER_ID = 1;

export interface Todo {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;
}

export interface TodoInfo {
  total?: number;
  finished?: number;
  todo?: number;
}
