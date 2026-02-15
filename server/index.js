const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate', (req, res) => {
  const { goal, users, constraints, projectType } = req.body;

  const userStories = generateUserStories(goal, users, projectType);
  const engineeringTasks = generateEngineeringTasks(goal, constraints, projectType);

  res.json({ userStories, engineeringTasks });
});

function generateUserStories(goal, users, projectType) {
  const stories = [
    {
      id: crypto.randomUUID(),
      text: `As a ${users}, I want to ${goal.toLowerCase()} so that I can accomplish my goals efficiently`,
      category: 'Frontend'
    },
    {
      id: crypto.randomUUID(),
      text: `As a ${users}, I want to see clear feedback when actions complete so that I know the system is working`,
      category: 'Frontend'
    },
    {
      id: crypto.randomUUID(),
      text: `As a ${users}, I want my data to be saved reliably so that I don't lose my work`,
      category: 'Backend'
    }
  ];

  if (projectType === 'Web App') {
    stories.push({
      id: crypto.randomUUID(),
      text: `As a ${users}, I want the app to work on mobile and desktop so that I can access it anywhere`,
      category: 'Frontend'
    });
  }

  if (projectType === 'Internal Tool') {
    stories.push({
      id: crypto.randomUUID(),
      text: `As a ${users}, I want to export data in common formats so that I can share reports`,
      category: 'Backend'
    });
  }

  return stories;
}

function generateEngineeringTasks(goal, constraints, projectType) {
  const tasks = [
    { id: crypto.randomUUID(), text: 'Set up project structure and dependencies', category: 'Infrastructure' },
    { id: crypto.randomUUID(), text: 'Design and implement database schema', category: 'Backend' },
    { id: crypto.randomUUID(), text: 'Create REST API endpoints', category: 'Backend' },
    { id: crypto.randomUUID(), text: 'Implement input validation and error handling', category: 'Backend' },
    { id: crypto.randomUUID(), text: 'Build main UI components', category: 'Frontend' },
    { id: crypto.randomUUID(), text: 'Implement form handling and state management', category: 'Frontend' },
    { id: crypto.randomUUID(), text: 'Add loading states and error messages', category: 'Frontend' },
    { id: crypto.randomUUID(), text: 'Write unit tests for core functionality', category: 'Infrastructure' }
  ];

  if (projectType === 'Web App') {
    tasks.push({ id: crypto.randomUUID(), text: 'Implement responsive design', category: 'Frontend' });
    tasks.push({ id: crypto.randomUUID(), text: 'Set up deployment pipeline', category: 'Infrastructure' });
  }

  if (projectType === 'Mobile App') {
    tasks.push({ id: crypto.randomUUID(), text: 'Configure mobile build settings', category: 'Infrastructure' });
    tasks.push({ id: crypto.randomUUID(), text: 'Implement offline support', category: 'Frontend' });
  }

  if (constraints && constraints.toLowerCase().includes('security')) {
    tasks.push({ id: crypto.randomUUID(), text: 'Implement authentication and authorization', category: 'Backend' });
  }

  return tasks;
}

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
