import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'

function Game() {
      const [games, setGames] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const [values, setValues] = useState({
        name: '',
        genre: '',
        company: ''
      })

      const {id} = useParams();
      const navigate = useNavigate();


  const API_BASE = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8000/api/v1/games` 
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

    //GET GAME
    const getGames = async () => {
      setLoading(true)
      try{
        await fetch(`${API_BASE}/games/${id}`)
                    .then(res => res.json())
                    .then(data => {
                      setValues({
                        name: data.name, 
                        genre: data.genre, 
                        company: data.company 
                      })
                    })
      } catch{
        setError(error.message || "Unexpected Error")
      } finally{
        setLoading(false)
      }
    }

    //DELETE GAME
    const deleteGame = async () => {
      try{
        await fetch(`${API_BASE}/games/${id}`, {
          method: 'DELETE'
        })
                    .then(res => res.json())
                    .then(data => {
                      setGames(data)
                      navigate('/dashboard', { replace: true })
                    })
      } catch{
        setError(error.message || "Unexpected Error")
      } finally{
        setLoading(false)
      }
    }

    //CREATE GAME
    const updateGame = async () => {
      try{
        await fetch(`${API_BASE}/games/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
                    .then(res => res.json())
                    .then(data => {
                      setGames({data})
                    })
      } catch{
        setError(error.message || "Unexpected Error")
      } finally{
        setLoading(false)
      }
    }

    //HANDLE BUTTON
    const handleSubmit = (event) => {
      event.preventDefault();
      updateGame();

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
        <h1>About Game:</h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.genre}</p>
        <p>{values && values.company}</p>
        <button onClick = {() => deleteGame() }>Delete Game</button>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/'>Home</Link>

        <form onSubmit= {(event) => handleSubmit(event)}>
          <label>
              Name:
                <input type= 'text' name= 'Name' value= {values.name} onChange={handleInputChanges} />
          </label>

          <label>
              Genre:
                <input type= 'text' name= 'Genre' value= {values.genre} onChange={handleInputChanges} />
          </label>

          <label>
              Company:
                <input type= 'text' name= 'Company' value= {values.company} onChange={handleInputChanges} />
          </label>

          <input type= 'submit' value= 'Submit' />
        </form>
      </header>
    </div>
  );
}

export default Game;
