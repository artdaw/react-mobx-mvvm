import { Todo } from "../data/Model";

export const sortFinishedTodos = (todos: Todo[]) =>
  todos.slice().sort((todo1, todo2) => {
    if (!todo1.completed && todo2.completed) {
      return -1;
    }
    return 0;
  });
