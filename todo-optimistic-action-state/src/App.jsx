import {
  useState,
  useOptimistic,
  useActionState,
  startTransition,
} from "react";
import { TodoList } from "./TodoList";
import { updateTodo } from "./api";
import "./styles.css";

const initialTodos = {
  1: { id: "1", title: "Walk the dog", completed: false },
  2: { id: "2", title: "Walk the cat", completed: false },
};

export default function App() {
  // Wrap the todos in action state - think of this as an async state updater
  const [todos, toggleTodoAction] = useActionState(async (todos, newTodo) => {
    try {
      // 1. Server request
      const updated = await updateTodo(newTodo.id, newTodo);

      // 2. Return the new state
      return { ...todos, [updated.id]: updated };
    } catch (_) {
      // Return the previous state (or an error state)
      return todos;
    }
  }, initialTodos);

  return <TodoList todos={todos} toggleTodoAction={toggleTodoAction} />;
}
