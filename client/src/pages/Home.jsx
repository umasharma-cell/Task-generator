import { useState, useEffect } from 'react';
import FeatureForm from '../components/FeatureForm';

function Home() {
  const [serverStatus, setServerStatus] = useState('Checking...');

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

  return (
    <div className="home">
      <h1>Tasks Generator</h1>
      <p className="status">{serverStatus}</p>
      <FeatureForm />
    </div>
  );
}

export default Home;
