import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { loggedIn, getToken, } from "./utils/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import SingleView from "./pages/SingleView/SingleView";

const App: FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status on reload
  useEffect(() => {
    const token: string = loggedIn() ? getToken() : null;
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
 
      <Router>
        <div id="wrapper">
          <Header loggedIn={isLoggedIn} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/login"
                element={<Login setLogin={setIsLoggedIn} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/single-view/:pictureId" element={<SingleView />} />
            </Routes>
          <Footer />
        </div>
      </Router>

  );
};

export default App;
