import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {  Container, Row, Col, Form } from "react-bootstrap";
import { Button } from '@material-ui/core'
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";
import firebase from 'firebase'

function In(props) {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]) 

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

  useEffect(() => {
    if(user){
       db.collection(user.uid).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => ({id: doc.id , todo: doc.data().todo, done: doc.data().done}))) 
      })
    }
  }, [user])



  const logout = (e) => {
    e.preventDefault();

    auth.signOut();
    props.history.push("/");
  };
  
  const addOne = (e) => {
    e.preventDefault();
    db.collection(user.uid).add({
      todo: input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      done: false
    })
    setInput("");
  };

  useEffect(() => {
    if(user){
    db.collection("history").doc(user.uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        setHistory(doc.data().list);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        db.collection("history").doc(user.uid).set({
          list:  {TODOS: todos},
          who: user.displayName
        })
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })}
  }, [user])

  function clearCollection(path) {
    const ref = db.collection(path)
    ref.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref.doc(doc.id).delete()
      })
    })
  }
  const addTodoList = (e) => {
    e.preventDefault();
    db.collection("history").doc(user.uid).set({
      list:  [...history, {TODOS: todos}],
      who: user.displayName
    })
    setHistory([])
    setTodos([])
    clearCollection(user.uid);
  };
  return user !== null ? (
    <Container fluid className="In">
      <Row>
        <Col sm={6}>
          <h3 className="In__name">{user.displayName}</h3>
        </Col>
        <Col sm={{ offset: 4 }}>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="In__2row justify-content-between">
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 7, order: 1 }}
          className="In__show"
        >
          { 
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id}/>
          ))}
  <center>
          <Button
          variant="contained" color="primary"
            onClick={addTodoList}
            disabled={todos.length === 0}
            className="In__setButton"
          >
            Clear up the To do list
          </Button>
          </center>
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          md={{ span: 3, order: 2 }}
          className="In__add"
        >
          <Form>
            <Form.Label className="In__label">Add a task</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></Form.Control>
            <br />
            <Button
              type="submit"
              onClick={addOne}
              variant="outlined" color="primary"
              size="large"
              disabled={!input}
            >
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>
      <h4>Loading</h4>
    </div>
  );
}

export default In;
