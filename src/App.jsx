import { useState, useEffect } from 'react'
import AddTodoForm from './components/AddTodoForm'
import TodoFilters from './components/TodoFilters'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState('all')

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const themeStyles = {
    backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5',
    color: isDark ? '#e0e0e0' : '#333',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease',
  }

  const cardStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: isDark ? '#16213e' : '#ffffff',
    boxShadow: isDark
      ? '0 4px 20px rgba(0,0,0,0.5)'
      : '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={themeStyles}>
      <div style={cardStyles}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h1 style={{ textAlign: 'center', color: isDark ? '#e94560' : '#333', margin: 0 }}>
            Менеджер задач
          </h1>
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              background: isDark ? '#e94560' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
          >
            {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
          </button>
        </div>

        <AddTodoForm onAdd={addTodo} isDark={isDark} />
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          isDark={isDark}
        />
        {filteredTodos.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: isDark ? '#888' : '#999',
              padding: '40px 0',
            }}
          >
            {filter === 'all'
              ? 'Задач пока нет'
              : filter === 'active'
              ? 'Нет активных задач'
              : 'Нет выполненных задач'}
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                task={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                isDark={isDark}
              />
            ))}
          </ul>
        )}
        {todos.length > 0 && (
          <button
            onClick={() => setTodos([])}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
              transition: 'background 0.2s ease',
            }}
          >
            Очистить всё
          </button>
        )}
      </div>
    </div>
  )
}

export default App