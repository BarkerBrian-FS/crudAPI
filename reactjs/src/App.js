import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState, useEffect} from 'React'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, [])

  const logout = () => {
    AuthService.logout()
  }

  return (
   <div>
    <section>
     <Routes>
      <Route path = '/' exact element = {<Home/>} />
      <Route path = '/dashboard' exact element = {<Dashboard/>} />
      <Route path = '/game/:id' exact element = {<Game/>} />
      <Route path = '/login' exact element = {<Login/>} />
      <Route path = '/signup' exact element = {<SignUp/>} />
     </Routes>
    </section>
   </div>
  );
}

export default App;
