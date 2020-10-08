import React from "react";

function Todo(props) {
  return (
    <div className="In__todo">
      {props.todo !== null ? <h3>{props.todo}</h3> : <h3>SOrry</h3>}
    </div>
  );
}

export default Todo;
