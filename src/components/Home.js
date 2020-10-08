import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

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
    <div>
      <h1>This is the index Page of my web site</h1>
      <h2>Sign up</h2>
      <form>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Type Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Type Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          id="password"
          type="password"
          name="pass"
          placeholder="Type Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <button onClick={() => props.history.push("/signin")}>Sign In</button>
    </div>
  );
}

export default Home;
