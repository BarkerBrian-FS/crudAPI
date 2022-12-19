import '../App.css';
import React, {useState, useEffect} from 'React'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
          await AuthService.signUp(email, password).then(
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
        <h1>Sign up here</h1>
        <Link to='/dashboard'>Dashboard</Link>
        <section>
        <form onSubmit = {handleSignUp}/>
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

export default SignUp;
