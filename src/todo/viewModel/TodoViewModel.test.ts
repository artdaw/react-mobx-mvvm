import { TodoWebservice } from "../api/Webservice";
import { TodoDao } from "../data/TodoDao";
import { TodoRepository } from "../data/TodoRepository";
import { TodoViewModel } from "./TodoViewModel";

describe("TodoViewModel", () => {
  const dao = new TodoDao();
  let store: TodoViewModel;

  beforeEach(() => {
    dao.saveAll([]);
    const repo = new TodoRepository(new TodoWebservice(), dao);
    store = new TodoViewModel(repo);
  });

  it("should add a new todo", () => {
    expect(store.todos.length).toBe(0);

    store.add({
      title: "Todo 1",
      completed: false
    });
    expect(store.todos.length).toBe(1);
    expect(store.todos[0].title).toBe("Todo 1");
  });

  it("should remove a todo", () => {
    expect(store.todos.length).toBe(0);

    store.add({
      id: 1,
      title: "Todo 1",
      completed: false
    });
    store.add({
      id: 2,
      title: "Todo 2",
      completed: false
    });
    expect(store.todos.length).toBe(2);

    store.remove(1);
    expect(store.todos.length).toBe(1);
    expect(store.todos[0].title).toBe("Todo 2");
  });

  it("should return overall info", () => {
    expect(store.todos.length).toBe(0);

    store.add({
      id: 1,
      title: "Todo 1",
      completed: false
    });
    store.add({
      id: 2,
      title: "Todo 2",
      completed: false
    });
    store.add({
      id: 2,
      title: "Todo 3",
      completed: true
    });
    expect(store.todos.length).toBe(3);

    expect(store.info.total).toBe(3);
    expect(store.info.finished).toBe(1);
    expect(store.info.todo).toBe(2);
  });
});
