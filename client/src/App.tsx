import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { loggedIn, getToken, } from "./utils/auth";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import RequestPasswordReset from "./pages/RequestPasswordReset/RequestPasswordReset";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Profile from "./pages/Profile/Profile";
import SingleView from "./pages/SingleView/SingleView";
import { getCurrentUser } from "./utils/api";
import { User } from "./types/User";

const App: FC<{}> = () => {
  const [user, setUser] = useState<User | undefined>();

  // Check login status on reload
  useEffect(() => {
    const getUser = async () => {
      try {
        const token: string = loggedIn() ? getToken() : null;
        if (token) {
          const response = await getCurrentUser(token);
          if (!response.ok) {
            throw new Error("something went wrong!");
          };
          const user: User = await response.json();
          setUser(user);
        };
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  return (
 
      <Router>
        <div id="wrapper">
          <Header user={user}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route path="/login" element={<Login setUser={setUser}/>} />
              <Route path="/request-reset" element={<RequestPasswordReset />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/single-view/:pictureId" element={<SingleView />} />
git             </Routes>
        </div>
      </Router>

  );
};

export default App;
