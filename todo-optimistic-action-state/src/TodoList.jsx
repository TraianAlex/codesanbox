import { Check } from "lucide-react";
import { useOptimistic } from "react";
import { NetworkPanel } from "./NetworkPanel";

function Todo({ todo, action }) {
  // Wrap an existing value in an optimisitic value
  const [checked, setChecked] = useOptimistic(todo.completed);

  async function toggleAction() {
    // Set optimistic state
    setChecked(!checked);

    // Perform action
    await action({ ...todo, completed: !checked });
  }

  return (
    <form key={todo.id} action={toggleAction} className="todo-item">
      <span className="todo-title">{todo.title}</span>
      <button
        type="submit"
        className={`toggle-btn ${checked && "checked"}`}
      >
        {checked && <Check size={16} />}
      </button>
    </form>
  );
}

export function TodoList({ todos, toggleTodoAction }) {
  return (
    <div className="app-container">
      <div className="card">
        <h3>Todos</h3>
        <div className="todo-list">
          {Object.values(todos).map((todo) => (
            <Todo key={todo.id} todo={todo} action={toggleTodoAction} />
          ))}
        </div>
      </div>
      <NetworkPanel />
    </div>
  );
}