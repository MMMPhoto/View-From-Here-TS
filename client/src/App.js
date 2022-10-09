import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js'
import './App.css';
import SignUp from './pages/signup.js';

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<SignUp/>} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
