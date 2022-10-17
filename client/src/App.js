import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {useEffect, useState} from 'react';
import Auth from './utils/auth';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home.js';
import SignUp from './pages/signup.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js';
import SingleView from './pages/SingleView.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on reload
  useEffect(() => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    } else {
      setIsLoggedIn(true);
    };
  }, []);

  return (
    <div className='wrapper'>

      <Router>
        <Header loggedIn={isLoggedIn}  /> 
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login setLogin= {setIsLoggedIn} />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route path='/single-view/:pictureId' element={<SingleView />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
