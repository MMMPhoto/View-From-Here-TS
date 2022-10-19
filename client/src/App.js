import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Auth from "./utils/auth";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home.js";
import SignUp from "./pages//signup/signup.js";
import Login from "./pages/login/login.js";
import Profile from "./pages/profile/profile.js";
import SingleView from "./pages/singleView/SingleView.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on reload
  useEffect(() => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <Header loggedIn={isLoggedIn} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/login"
            element={<Login setLogin={setIsLoggedIn} />}
          />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/single-view/:pictureId" element={<SingleView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
