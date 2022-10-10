import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import './App.css';
import SignUp from './pages/signup.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js';

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/profile' element={<Profile/>} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
