import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {useState} from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home.js';
import SignUp from './pages/signup.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js';
import SingleView from './pages/SingleView.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='wrapper'>

      <Router>
        <Header loggedIn={isLoggedIn}  /> 
        <Routes>
          <Route exact path='/' element={<Home loggedIn={isLoggedIn}/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login setLogin= {setIsLoggedIn} />} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route path='/single-view/:pictureId' element={<SingleView />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
