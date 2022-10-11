import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home.js';
import SignUp from './pages/signup.js';
import Login from './pages/login.js';
import Profile from './pages/profile.js';
import SingleView from './pages/SingleView.js';

function App() {
  return (
    <div className='wrapper'>

      <Router>

        <Routes>
          <Header />
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route path='/single-view/:pictureId' element={<SingleView/>} />
          <Footer />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
