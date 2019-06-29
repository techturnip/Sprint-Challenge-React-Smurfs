import React from "react";

const Smurf = props => {
  return (
    <div className="Smurf card">
      <div className="card-content">
        <span className="card-title">{props.name}</span>
        <strong>{props.height} tall</strong>
        <p>{props.age} smurf years old</p>
      </div>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
