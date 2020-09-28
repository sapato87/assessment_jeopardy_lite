import React from "react";

function Display(props) {
  return (
    <div className="Display">
      {/* <h3>Category:</h3> */}
      <strong>User Score: </strong>
      {props.score} <br />
      <strong>Question: </strong>
      {props.data.question} <br />
      <strong>Value: </strong>
      {props.data.value} <br />
      <strong>Category: </strong>
      {props.category} <br />
      <input
        type="text"
        onChange={props.handleChange}
        value={props.userAnswer}
      />
      <button onClick={props.handleSubmit}>Submit Answer</button>
    </div>
  );
}

export default Display;
