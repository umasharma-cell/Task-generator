import { useState } from 'react';

const CATEGORIES = ['Frontend', 'Backend', 'Infrastructure'];

function TaskList({ tasks, onTasksChange, title }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const groupedTasks = CATEGORIES.reduce((acc, category) => {
    acc[category] = tasks.filter(task => task.category === category);
    return acc;
  }, {});

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    const updated = tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    );
    onTasksChange(updated);
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const moveTask = (id, direction) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tasks.length) return;

    const newTasks = [...tasks];
    [newTasks[index], newTasks[newIndex]] = [newTasks[newIndex], newTasks[index]];
    onTasksChange(newTasks);
  };

  const changeCategory = (id, newCategory) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, category: newCategory } : task
    );
    onTasksChange(updated);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="task-list">
      <h2>{title}</h2>
      {CATEGORIES.map(category => (
        groupedTasks[category].length > 0 && (
          <div key={category} className="task-category">
            <h3>{category}</h3>
            <ul>
              {groupedTasks[category].map((task, idx) => (
                <li key={task.id} className="task-item">
                  {editingId === task.id ? (
                    <div className="task-edit">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, task.id)}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(task.id)} className="btn-save">Save</button>
                        <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="task-view">
                      <span className="task-text" onClick={() => startEdit(task)}>{task.text}</span>
                      <div className="task-actions">
                        <select
                          value={task.category}
                          onChange={(e) => changeCategory(task.id, e.target.value)}
                          className="category-select"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => moveTask(task.id, 'up')}
                          disabled={idx === 0}
                          className="btn-move"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveTask(task.id, 'down')}
                          disabled={idx === groupedTasks[category].length - 1}
                          className="btn-move"
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
}

export default TaskList;
