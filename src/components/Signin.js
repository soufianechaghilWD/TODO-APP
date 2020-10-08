import React, { useState } from "react";
import { auth } from "../firebase";
import { Button, FormControl, Input } from "@material-ui/core";

function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push("/in");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="home">
      <h2 className="home__title">Sign In</h2>
      <br />
      <FormControl>
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="Type Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          id="password"
          type="password"
          name="pass"
          placeholder="Type Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          disabled={!email || !password}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Connect
        </Button>
      </FormControl>
      <br />
      <br />
      <br />
      <p>
        If You don't have an account
        <span>
          <a href="/" className="home__signin">
            {" "}
            Sign Up
          </a>
        </span>
      </p>
    </div>
  );
}

export default Signin;
