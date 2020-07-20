import { Todo } from "./Model";

export class TodoDao {
  private storage: typeof window.localStorage;

  constructor(storage?: typeof window.localStorage) {
    this.storage = storage || window.localStorage;

    if (!this.storage.mvvm) {
      this.storage.setItem(
        "mvvm",
        JSON.stringify({
          todos: []
        })
      );
    }
  }

  get todos(): Todo[] {
    return JSON.parse(this.storage.mvvm).todos;
  }

  upsert(todo: Todo) {
    let isUpdate = false;
    const todos: Todo[] = JSON.parse(this.storage.mvvm).todos?.map(
      (currentTodo: Todo) => {
        if (currentTodo.id === todo.id) {
          currentTodo = todo;
          isUpdate = true;
        }
        return currentTodo;
      }
    );

    if (!isUpdate) {
      todos.push(todo);
    }

    this.storage.setItem("mvvm", JSON.stringify({ todos }));
  }

  saveAll(todos: Todo[]) {
    this.storage.setItem("mvvm", JSON.stringify({ todos }));
  }
}
