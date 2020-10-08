import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";

function In(props) {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([null, null, null, null, null]);
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
  const deleteOneIfExist = (tab, inp) => {
    let res = [inp, ...tab];
    if (res[res.length - 1] === null) {
      res.splice(res.length - 1, 1);
    }
    return res;
  };
  const addOne = (e) => {
    e.preventDefault();
    setTodos(deleteOneIfExist(todos, input));
    setInput("");
  };

  const addTodoList = (e) => {
    e.preventDefault();
  };
  return user !== null ? (
    <Container className="In">
      <Row>
        <Col sm={6}>
          <h3 className="In__name">{user.displayName}</h3>
        </Col>
        <Col sm={{ offset: 4 }}>
          <Button onClick={logout} variant="secondary">
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="In__2row">
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 7, order: 1 }}
          className="In__show"
        >
          {todos.map((todo) => (
            <Todo todo={todo} />
          ))}

          <Button
            onClick={addTodoList}
            disabled={todos.length === 0}
            className="In__setButton"
          >
            Set up as today's todo list
          </Button>
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          md={{ span: 5, order: 2 }}
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
              variant="success"
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
