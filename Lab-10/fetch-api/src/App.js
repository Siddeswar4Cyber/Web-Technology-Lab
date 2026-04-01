import './App.css';

import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', width: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', width: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', width: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>API Fetch Posts Data</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id} style={{ marginBottom:'20px' }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;