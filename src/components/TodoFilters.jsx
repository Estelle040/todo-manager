function TodoFilters({ filter, onFilterChange, activeCount, isDark }) {
  const buttons = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Выполненные' },
  ]

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: `2px solid ${isDark ? '#333' : '#eee'}`,
    flexWrap: 'wrap',
    gap: '10px',
  }

  const counterStyle = {
    fontSize: '14px',
    color: isDark ? '#aaa' : '#666',
  }

  return (
    <div style={containerStyle}>
      <span style={counterStyle}>Осталось задач: {activeCount}</span>
      <div style={{ display: 'flex', gap: '5px' }}>
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onFilterChange(btn.key)}
            style={{
              padding: '6px 14px',
              background: filter === btn.key ? '#007bff' : isDark ? '#333' : '#f0f0f0',
              color: filter === btn.key ? 'white' : isDark ? '#ccc' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TodoFilters