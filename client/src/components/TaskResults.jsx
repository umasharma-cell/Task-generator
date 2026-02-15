import { useState } from 'react';
import TaskList from './TaskList';

function TaskResults({ results, onResultsChange }) {
  const [copyStatus, setCopyStatus] = useState('');

  const handleUserStoriesChange = (newStories) => {
    onResultsChange({ ...results, userStories: newStories });
  };

  const handleTasksChange = (newTasks) => {
    onResultsChange({ ...results, engineeringTasks: newTasks });
  };

  const generateMarkdown = () => {
    let md = '## User Stories\n';
    results.userStories.forEach(story => {
      md += `- ${story.text}\n`;
    });
    md += '\n## Engineering Tasks\n';
    results.engineeringTasks.forEach(task => {
      md += `- ${task.text}\n`;
    });
    return md;
  };

  const handleCopy = async () => {
    const markdown = generateMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch {
      setCopyStatus('Failed to copy');
    }
  };

  const handleDownload = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="task-results">
      <div className="export-actions">
        <button onClick={handleCopy} className="btn-export">
          Copy as Markdown
        </button>
        <button onClick={handleDownload} className="btn-export">
          Download .md
        </button>
        {copyStatus && <span className="copy-status">{copyStatus}</span>}
      </div>
      <TaskList
        tasks={results.userStories}
        onTasksChange={handleUserStoriesChange}
        title="User Stories"
      />
      <TaskList
        tasks={results.engineeringTasks}
        onTasksChange={handleTasksChange}
        title="Engineering Tasks"
      />
    </div>
  );
}

export default TaskResults;
