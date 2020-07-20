import { observer } from "mobx-react-lite";
import React, { createContext, useContext } from "react";
import { TodoAdd } from "../components/TodoAdd";
import { TodoList } from "../components/TodoList";
import { TodoRepository } from "../data/TodoRepository";
import { TodoViewModel } from "../viewModel/TodoViewModel";

const TodoScreen = () => {
  const repository = new TodoRepository();
  const viewModel = new TodoViewModel(repository);
  const { todos, remove, toggle, info, add } = useContext(
    createContext(viewModel)
  );

  return (
    <>
      <TodoAdd addTodo={add} info={info} />
      <br />
      <TodoList todos={todos} onRemove={remove} onToggle={toggle} />
    </>
  );
};
export default observer(TodoScreen);
