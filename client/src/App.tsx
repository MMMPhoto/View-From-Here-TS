import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { loggedIn, getToken, } from "./utils/auth";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import SignUp from "./pages//signup/signup";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/profile";
import SingleView from "./pages/singleView/SingleView";

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
    <div className="wrapper">
      <Router>
        <Header loggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login setLogin={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/single-view/:pictureId" element={<SingleView />} />
        </Routes>  
        <Footer />
      </Router>
    </div>
  );
};

export default App;
