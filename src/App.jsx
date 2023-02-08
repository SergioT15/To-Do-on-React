import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Form } from "./components/Form";
import { Title } from "./components/Title";
import { Tasks } from "./components/Tasks";
import { Filter } from "./components/Filter";

import styles from "./App.module.css";

const filterMap = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const filterNames = Object.keys(filterMap);

console.log(filterNames);

console.log(filterMap);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  // Add new task
  const addTodo = (todoText) => {
    if (!todoText.trim()) {
      return;
    }
    const newTask = {
      text: todoText,
      id: uuidv4(),
      completed: false,
    };

    setTodos([newTask, ...todos]);
  };

  console.log(todos);

  // Change completed and uncompleted
  const changeStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (id !== todo.id) {
        return todo;
      }
      return { ...todo, completed: !todo.completed };
    });
    setTodos(updatedTodos);
  };

  //Delete task
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  //Change all statuses completed and incomplete
  const changeAllStatuses = () => {
    const updatedTodos = todos.map((todo) => {
      if (!todos) {
        return todo;
      }
      return { ...todo, completed: !todo.completed };
    });
    setTodos(updatedTodos);
  };

  //Delete all completed tasks
  const deleteAllCompleted = () => {
    const updatedTodos = todos.filter((todo) => todo.completed !== true);

    setTodos(updatedTodos);
  };

  console.log();

  return (
    <div className={styles.container}>
      <Title />
      <Form addTodo={addTodo} />
      <Tasks
        todos={todos}
        changeStatus={changeStatus}
        deleteTodo={deleteTodo}
        filterMap={filterMap}
        filter={filter}
      />
      <Filter
        filter={filter}
        filterNames={filterNames}
        setFilter={setFilter}
        todos={todos}
        changeAllStatuses={changeAllStatuses}
        deleteAllCompleted={deleteAllCompleted}
      />
    </div>
  );
};

export { App };
