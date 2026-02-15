import { useState, useEffect } from 'react';
import FeatureForm from '../components/FeatureForm';
import TaskResults from '../components/TaskResults';

function Home() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError('Failed to generate tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Tasks Generator</h1>
      <p className="status">{serverStatus}</p>
      <FeatureForm onGenerate={handleGenerate} isLoading={isLoading} />
      {error && <p className="error-message">{error}</p>}
      {results && (
        <TaskResults results={results} onResultsChange={setResults} />
      )}
    </div>
  );
}

export default Home;
