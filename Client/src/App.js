import React from "react";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Register from "./Pages/Register";
import Messenger from "./Pages/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useGlobalContext } from "./Context/AuthContext";

const App = () => {
  const { user } = useGlobalContext();
  // console.log("USER in app:", user);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <HomePage /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <ProfilePage />
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
