function History({ specs, onSelect, currentIndex }) {
  if (specs.length === 0) return null;

  return (
    <div className="history-panel">
      <h3>Recent Specs</h3>
      <ul>
        {specs.map((spec, index) => (
          <li
            key={spec.id}
            className={`history-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => onSelect(index)}
          >
            <span className="history-goal">{spec.formData.goal.slice(0, 40)}{spec.formData.goal.length > 40 ? '...' : ''}</span>
            <span className="history-type">{spec.formData.projectType}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
