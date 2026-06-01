import { useState } from 'react';
import { useLocalStorage } from '../hooks';
import type { TodoItem } from '../types';

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('dashboard-todos', []);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now().toString(), text: input.trim(), done: false, createdAt: Date.now() }]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className="module">
      <h3 className="module-title">
        ✅ 待办 <span className="module-badge">{doneCount}/{todos.length}</span>
      </h3>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="添加待办..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <span className="todo-check" onClick={() => toggleTodo(todo.id)}>
              {todo.done ? '☑️' : '⬜'}
            </span>
            <span className="todo-text">{todo.text}</span>
            <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
