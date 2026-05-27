import { useState } from 'react'

function AddTodoForm({ onAdd, isDark }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  const inputStyle = {
    padding: '10px 14px',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#444' : '#ddd'}`,
    fontSize: '16px',
    outline: 'none',
    backgroundColor: isDark ? '#1a1a2e' : '#fff',
    color: isDark ? '#e0e0e0' : '#333',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  }

  const buttonStyle = {
    padding: '10px 24px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s ease',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Добавить
      </button>
    </form>
  )
}

export default AddTodoForm