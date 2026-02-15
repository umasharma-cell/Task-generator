import TaskList from './TaskList';

function TaskResults({ results, onResultsChange }) {
  const handleUserStoriesChange = (newStories) => {
    onResultsChange({ ...results, userStories: newStories });
  };

  const handleTasksChange = (newTasks) => {
    onResultsChange({ ...results, engineeringTasks: newTasks });
  };

  return (
    <div className="task-results">
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
