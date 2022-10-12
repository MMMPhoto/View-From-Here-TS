import React, { useCallback, useEffect, useRef, useState } from "react";
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

  // Set persisting map state
  const [mapState, setMapState] = useState({
    markers: "",
    mapBounds: "",
    mapZoom: ""
  });

  return (
    <div className='wrapper'>

      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home mapState={mapState} setMapState={setMapState} />} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/profile' element={<Profile mapState={mapState} setMapState={setMapState}/>} />
          <Route path='/single-view/:pictureId' element={<SingleView mapState={mapState} setMapState={setMapState} />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
