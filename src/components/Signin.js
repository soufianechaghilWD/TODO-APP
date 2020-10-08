import React, { useState } from "react";
import { auth } from "../firebase";

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
    <div>
      <form>
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
    </div>
  );
}

export default Signin;
