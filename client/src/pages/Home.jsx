import { useState, useEffect } from 'react';
import FeatureForm from '../components/FeatureForm';
import TaskResults from '../components/TaskResults';
import History from '../components/History';

const STORAGE_KEY = 'tasks-generator-history';
const MAX_HISTORY = 5;

function loadHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(specs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
}

function Home() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setServerStatus('Server connected');
        }
      })
      .catch(() => {
        setServerStatus('Server disconnected');
      });
  }, []);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResults(data);

      const newSpec = {
        id: Date.now(),
        formData,
        results: data
      };
      const updatedHistory = [newSpec, ...history].slice(0, MAX_HISTORY);
      setHistory(updatedHistory);
      setCurrentIndex(0);
      saveHistory(updatedHistory);
    } catch (err) {
      setError('Failed to generate tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (index) => {
    const spec = history[index];
    setResults(spec.results);
    setCurrentIndex(index);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <History
          specs={history}
          onSelect={handleSelectHistory}
          currentIndex={currentIndex}
        />
      </aside>
      <main className="main-content">
        <div className="home">
          <h1>Tasks Generator</h1>
          <p className="status">{serverStatus}</p>
          <FeatureForm onGenerate={handleGenerate} isLoading={isLoading} />
          {error && <p className="error-message">{error}</p>}
          {results && (
            <TaskResults results={results} onResultsChange={setResults} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
