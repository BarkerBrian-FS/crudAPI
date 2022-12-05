import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
      const [games, setGames] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8000` 
    : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
      if(!ignore){
        getGames();
      }
      return () => {
        ignore = true;
      }
    })

    const getGames = async () => {
      setLoading(true)
      try{
        await fetch(`${API_BASE}/games`)
                    .then(res => res.json())
                    .then(data => {
                      setGames(data)
                    })
      } catch{
        setError(error.message || "Unexpected Error")
      } finally{
        setLoading(false)
      }
    }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Games:</h1>
        <ul>
          <li>games</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
