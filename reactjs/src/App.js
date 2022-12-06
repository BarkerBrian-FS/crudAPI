import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';

function App() {
  return (
   <Router>
    <Routes>
      <Route path = '/' exact element = {<Home/>} />
      <Route path = '/dashboard' exact element = {<Dashboard/>} />
      <Route path = '/game/:id' exact element = {<Game/>} />
    </Routes>
   </Router>
  );
}

export default App;
