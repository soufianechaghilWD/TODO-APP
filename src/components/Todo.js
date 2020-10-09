import React, { useState, useEffect} from "react";
import {  Container, Row, Col, Modal } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { auth, db } from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


 
function Todo(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')
  const [modalInput, setModalInput] = useState('')

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

const deleteFun = (e) => {
  e.preventDefault();
  db.collection(user.uid).doc(props.todo.id).delete()
}
const updateTodo = () => {
  db.collection(user.uid).doc(props.todo.id).set({
      todo : modalInput
  }, {merge : true})
  setModalInput('')
  setOpen(false);
}
const donefun = (e) => {
  e.preventDefault()
  db.collection(user.uid).doc(props.todo.id).set({
    done: true
}, {merge : true})
}
  return (
    <div className="In__todo" id={props.todo.id}>

    <Modal show={open} 
    onHide={e=> setOpen(false)} >
      <div >
          <Modal.Header>I'm a modal</Modal.Header>
          <Modal.Body>
          <input placeholder={props.todo.todo} value={modalInput} onChange={e => setModalInput(e.target.value)}/>
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={updateTodo} variant="outlined" color="primary" disabled={!modalInput}>Update</Button>
          </Modal.Footer>
      </div>
    </Modal>

      
      <Container className="Todo__default" >
        <Row className="justify-content-between">
          
          <Col md={8} ><h6>{props.todo.todo} </h6></Col>
          
          <Col md={3}>
            <Button
            variant="outlined" color="primary" size="small" onClick={deleteFun}
            startIcon={<DeleteIcon />}>
            </Button>
            <Button
            onClick={e=>setOpen(true)}
            variant="outlined" color="primary" size="small"
            startIcon={<EditIcon />}>
            </Button>
            {props.todo.done === true ? (<Button 
            className="todo__done"
              size="small"
            startIcon={<DoneIcon />}>
            </Button>) : (<Button onClick={donefun} 
            variant="outlined" color="primary" size="small"
            startIcon={<DoneIcon />}>
            </Button>)}
            
          </Col>
        </Row>
      </Container>
      
     
    </div>
  );
}

export default Todo;
