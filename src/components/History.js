import React, { useEffect, useState} from 'react';
import { auth, db } from "../firebase";
import {  Container, Row, Col } from "react-bootstrap";
import { Button } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';

function Compo(arg) {
    return arg.data.map(todo => (
            todo.done ? 
            (<h5 className="history__done">- {todo.todo} <span> <CheckIcon /></span></h5>) 
            :
            (<h5 className="history__ndone">- {todo.todo}</h5>)
        ))
}

function History(props) {

    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            //user has logged in
            setUser(authUser);
          } else {
            //user has loggedout
            props.history.push("/signin");
          }
        });
        return () => {
          //preform some clean up actions
          unsubscribe();
        };
      }, [user]);

      useEffect(() => {
          if(user){
            db.collection('history').doc(user.uid).get().then((doc) => {
                if(doc.exists){
                    setHistory(doc.data().list.slice().sort((a, b) => b.timestamp - a.timestamp))
                }
            })
          }
      }, [user])

      const logout = (e) => {
        e.preventDefault();
    
        auth.signOut();
        props.history.push("/signin");
      };

    return  user !== null  ?
         history.length !== 0 ? (
            <Container fluid className="history">
                <Row className="history__header">
                    <Col sm={4}>
                        <h3 className="In__name">{user.displayName}</h3>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={() => props.history.push('/in')} variant="contained">
                            Todo-list
                        </Button>
                    </Col>
                    <Col >
                        <Button onClick={logout} variant="contained">
                            Log out
                        </Button>
                    </Col>
                </Row>
                <Row className="history__show">
                    <Col xs={5}>
                    {
                        history.map(x => (
                            <div key={x['TODOS'][0].id} className="history__each">
                                <a type="submit" onClick={() => setSelected(x['TODOS'])}  key={x.id}>*{JSON.stringify( new Date(x['timestamp']['seconds'] * 1000) )}</a>
                            </div>
                        ))
                    }
                    </Col>

                    <Col xs={{offset : 2}}>
                        <h3 >The Todo list for that day</h3>
                        <br></br>
                       <Compo data={selected} />
                    </Col>
                </Row>
            </Container>
         ) 
         : 
         (<Container>
             <Row>
             <Col sm={4}>
                        <h3 className="In__name">{user.displayName}</h3>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={() => props.history.push('/in')} variant="contained">
                            Todo-list
                        </Button>
                    </Col>
                    <Col sm={{ offset: 2 }}>
                        <Button onClick={logout} variant="contained">
                            Log out
                        </Button>
                    </Col>
             </Row>
             <Row>
                 <Col>
                    <h4>Nothing in the history</h4>
                 </Col>
             </Row>
         </Container>) 
         :
          (<div>
              <h4>Loading</h4>
          </div>)
        
    
}

export default History
