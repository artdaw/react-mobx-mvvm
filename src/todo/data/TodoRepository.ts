import { computed, observable } from "mobx";
import { TodoWebservice } from "../api/Webservice";
import { Todo } from "./Model";
import { TodoDao } from "./TodoDao";

export class TodoRepository {
  private webService: TodoWebservice;
  private dao: TodoDao;

  constructor(webService?: TodoWebservice, dao?: TodoDao) {
    this.webService = webService || new TodoWebservice();
    this.dao = dao || new TodoDao();
    this._todos = this.dao.todos;
  }

  @observable private _todos: Todo[] = [];
  @computed get todos() {
    if (!this._todos.length) {
      this.refreshTodos();
    }
    return this._todos;
  }

  addTodo(todo: Todo) {
    this._todos.push(todo);
    this.dao.upsert(todo);
    this.webService.create(todo);
  }

  updateTodo(todo: Todo) {
    this._todos = this._todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        currentTodo = todo;
        this.dao.upsert(todo);
      }
      return currentTodo;
    });
    this.webService.put(todo);
  }

  removeTodo(id: number) {
    const filteredTodos = this._todos.filter(
      currentTodo => currentTodo.id !== id
    );
    this._todos = filteredTodos;
    this.dao.saveAll(this._todos);
  }

  private async refreshTodos() {
    try {
      const res = await this.webService.todos();
      this._todos = res;
      this.dao.saveAll(res);
    } catch (e) {}
  }
}
