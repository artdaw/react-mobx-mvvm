import { action, computed } from "mobx";
import { Todo, TodoInfo } from "../data/Model";
import { TodoRepository } from "../data/TodoRepository";
import { sortFinishedTodos } from "./Transform";

export class TodoViewModel {
  private repository?: TodoRepository;

  constructor(todoRepository?: TodoRepository) {
    this.repository = todoRepository || new TodoRepository();
  }

  @computed get todos() {
    return sortFinishedTodos(this.repository?.todos || []);
  }

  @action add = (todo: Todo) => {
    this.repository?.addTodo(todo);
  };

  @action remove = (id: number) => {
    this.repository?.removeTodo(id);
  };

  @action toggle = (todo: Todo) => {
    this.repository?.todos.map((currentTodo: Todo) => {
      if (currentTodo.id === todo.id) {
        this.repository?.updateTodo({
          ...currentTodo,
          completed: !currentTodo.completed
        });
      }
      return todo;
    });
  };

  @computed get info(): TodoInfo {
    return {
      total: this.repository?.todos.length,
      finished: this.repository?.todos.filter(todo => todo.completed).length,
      todo: this.repository?.todos.filter(todo => !todo.completed).length
    };
  }
}
