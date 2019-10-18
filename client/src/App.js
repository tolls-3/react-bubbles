import React, { useState } from "react";
import { Route, withRouter, Redirect, NavLink } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App(props) {
  //console.log(props)
  const onLogout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };
  return (
    <div>
      <nav className="navbar">
        <span>
          <NavLink exact to="/">
            Login
          </NavLink>
          <NavLink to="/bubblepage">Bubble Page</NavLink>
        </span>
        <button onClick={onLogout}>Logout</button>
      </nav>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Route
          path="/bubblepage"
          render={props => withAuthCheck(BubblePage, props)}
        />
      </div>
    </div>
  );
}

function withAuthCheck(Component, props) {
  //console.log(props);
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  }
  return <Redirect to="/" />;
}

export default withRouter(App);
