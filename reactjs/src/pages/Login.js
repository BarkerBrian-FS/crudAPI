import '../App.css';
import React, {useState, useEffect} from 'React'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try{
        await AuthService.login(email, password).then(
          response => {
              navigate('/dashboard')
          },
          error => {
              console.error(error)
          }
        )
      } catch(error){
          console.error(error)
      }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Here</h1>
        <Link to='/dashboard'>Dashboard</Link>
        <section>
        <form onSubmit = {handleLogin}/>
        <input 
          type = 'text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type = 'password'
          placeholder='password'
          value={email}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </section>
      </header>
    </div>
  );
}

export default Login;
