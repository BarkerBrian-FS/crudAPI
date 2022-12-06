import '../App.css';
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom'

function Dashboard() {
      const [games, setGames] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      const {id} = useParams();
      const [values, setValues] = useState({
        name: '',
        genre: '',
        company: ''
      })

  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8000/api/v1` 
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
        await fetch(`${API_BASE}/game/${id}`)
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

     //CREATE GAME
     const createGame = async () => {
        try{
          await fetch(`${API_BASE}/games`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          }).then(() => getGames());
        } catch{
          setError(error.message || "Unexpected Error")
        } finally{
          setLoading(false)
        }
      }

     //HANDLE BUTTON
     const handleSubmit = (event) => {
        event.preventDefault();
        createGame();
  
      }
  
      const handleInputChanges = (event) => {
        event.persist();
        setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value
        }))
      }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Games:</h1>
        <Link to='/'>Home</Link>
        <ul>
          <li>games</li>
          {
            games && games.map(game => (
                <li key = {game._id}>
                    <Link to={`/game/${game.id}`}>{game.name}</Link>
                </li>
            ))
          }
        </ul>
        <form onSubmit= {(event) => handleSubmit(event)}>
          <label> Name:</label>
                <input type= 'text' name= 'Name' value= {values.name} onChange={handleInputChanges} />

          <label>Genre:</label>
                <input type= 'text' name= 'Genre' value= {values.genre} onChange={handleInputChanges} />
          
          <label>Company:</label>
                <input type= 'text' name= 'Company' value= {values.company} onChange={handleInputChanges} />
          
          <input type= 'submit' value= 'Submit' />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
