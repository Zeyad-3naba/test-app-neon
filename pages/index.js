import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/db')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setData({ error: err.message });
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#fff',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}> Neon DB + Vercel Test App</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : data?.success ? (
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          maxWidth: '500px',
          width: '100%'
        }}>
          <p style={{ color: '#4ade80', fontSize: '1.2rem' }}>✅ {data.message}</p>
          <h3 style={{ marginTop: '20px' }}>Database Messages:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.data.map((msg) => (
              <li key={msg.id} style={{ 
                padding: '10px', 
                background: 'rgba(255,255,255,0.05)', 
                marginBottom: '8px',
                borderRadius: '5px'
              }}>
                <strong>#{msg.id}</strong>: {msg.message}
                <br/>
                <small style={{ color: '#888' }}>{new Date(msg.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ 
          background: 'rgba(255,0,0,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          maxWidth: '500px' 
        }}>
          <p style={{ color: '#f87171' }}>❌ Error: {data?.error}</p>
        </div>
      )}
      
      <p style={{ marginTop: '30px', color: '#666' }}>
        <a href="/api/db" style={{ color: '#4ade80' }}>API Endpoint</a>
      </p>
    </div>
  );
}