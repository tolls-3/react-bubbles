import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  //console.log(props)
  const initialUserState = {
    username: "",
    password: ""
  };
  const [user, setUser] = useState(initialUserState);

  const handleChange = e => {
    return setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(error => {
        //debugger;
        alert(error);
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
