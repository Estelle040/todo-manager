import { useState } from 'react'

function TodoItem({ task, onToggle, onDelete, onUpdate, isDark }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleDoubleClick = () => {
    setIsEditing(true)
    setEditText(task.text)
  }

  const handleEditSubmit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onUpdate(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(task.text)
    }
  }

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 8px',
    borderBottom: `1px solid ${isDark ? '#333' : '#eee'}`,
    transition: 'background 0.2s ease',
  }

  const textStyle = {
    flex: 1,
    textDecoration: task.completed ? 'line-through' : 'none',
    color: task.completed ? (isDark ? '#666' : '#999') : isDark ? '#e0e0e0' : '#333',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '16px',
  }

  const editInputStyle = {
    flex: 1,
    padding: '6px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: `1px solid ${isDark ? '#555' : '#ddd'}`,
    outline: 'none',
    backgroundColor: isDark ? '#1a1a2e' : '#fff',
    color: isDark ? '#e0e0e0' : '#333',
  }

  const deleteButtonStyle = {
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s ease',
  }

  return (
    <li style={itemStyle}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{
          width: '18px',
          height: '18px',
          cursor: 'pointer',
          accentColor: '#4CAF50',
        }}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleKeyDown}
          style={editInputStyle}
          autoFocus
        />
      ) : (
        <span style={textStyle} onDoubleClick={handleDoubleClick} title="Двойной клик для редактирования">
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={deleteButtonStyle}
      >
        Удалить
      </button>
    </li>
  )
}

export default TodoItem