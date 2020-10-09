import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { FormControl, Button, Input } from "@material-ui/core";

function Home(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser);
        props.history.push("/in");
      } else {
        //user has loggedout
        setUser(null);
      }
    });

    return () => {
      //preform some clean up actions
      unsubscribe();
    };
  }, [user, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="home">
      <h2 className="home__title">Sign Up</h2>
      <br />
      <FormControl>
        <Input
          id="name"
          type="text"
          name="username"
          placeholder="Type Your complete name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
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
          disabled={!username || !email || !password}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          submit
        </Button>
      </FormControl>

      <br />
      <br />
      <br />

      <p>
        If You already have an account
        <span>
          <a type="button" onClick={() => props.history.push('/signin')} className="home__signin">
            {" "}
            Sign In
          </a>
        </span>
      </p>
    </div>
  );
}

export default Home;
