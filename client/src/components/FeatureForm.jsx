import { useState } from 'react';

const PROJECT_TYPES = ['Web App', 'Mobile App', 'Internal Tool'];

function FeatureForm() {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: '',
    projectType: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.goal.trim()) newErrors.goal = 'Goal is required';
    if (!formData.users.trim()) newErrors.users = 'Target users is required';
    if (!formData.constraints.trim()) newErrors.constraints = 'Constraints is required';
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log({
      goal: formData.goal,
      users: formData.users,
      constraints: formData.constraints,
      projectType: formData.projectType
    });
  };

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="goal">Goal</label>
        <textarea
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="Describe what you want to build..."
          rows={3}
        />
        {errors.goal && <span className="error">{errors.goal}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="users">Target Users</label>
        <input
          type="text"
          id="users"
          name="users"
          value={formData.users}
          onChange={handleChange}
          placeholder="Who will use this feature?"
        />
        {errors.users && <span className="error">{errors.users}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="constraints">Constraints</label>
        <textarea
          id="constraints"
          name="constraints"
          value={formData.constraints}
          onChange={handleChange}
          placeholder="Any limitations or requirements..."
          rows={3}
        />
        {errors.constraints && <span className="error">{errors.constraints}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="projectType">Project Type</label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        >
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.projectType && <span className="error">{errors.projectType}</span>}
      </div>

      <button type="submit" className="submit-btn">Generate Tasks</button>
    </form>
  );
}

export default FeatureForm;
