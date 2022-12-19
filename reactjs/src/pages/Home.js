import '../App.css';
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Game Shelf Homepage</h1>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </header>
    </div>
  );
}

export default Home;
