import { Todo, USER_ID } from "../data/Model";

export class TodoWebservice {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  async todos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/todos?userId=${USER_ID}`);
      return response.json();
    } catch (e) {
      throw e;
    }
  }

  async create(todo: Todo): Promise<Todo> {
    try {
      const response = await fetch(`${this.baseUrl}/todos?userId=${USER_ID}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  }

  async put(todo: Todo): Promise<Todo> {
    try {
      const response = await fetch(`${this.baseUrl}/todos?userId=${USER_ID}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return response.json();
    } catch (e) {
      throw e;
    }
  }
}
