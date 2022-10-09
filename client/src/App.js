import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js'
import './App.css';
import SignUp from './pages/signup.js';
import Login from './pages/login.js'

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login/>} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
