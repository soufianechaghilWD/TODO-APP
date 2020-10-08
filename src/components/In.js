import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

function In(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser);
      } else {
        //user has loggedout
        props.history.push("/");
      }
    });
    return () => {
      //preform some clean up actions
      unsubscribe();
    };
  }, [user]);

  const logout = (e) => {
    e.preventDefault();

    auth.signOut();
    props.history.push("/");
  };

  return user !== null ? (
    <div>
      <h3>You are In</h3>
      <button onClick={logout}>Log out</button>
    </div>
  ) : (
    <div>
      <h4>Loading</h4>
    </div>
  );
}

export default In;
