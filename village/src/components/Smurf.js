import React from "react";

const Smurf = props => {
  return (
    <div className="Smurf card hoverable">
      <div className="card-content">
        <div>
          <span className="card-title">{props.name}</span>
          <strong>{props.height} tall</strong>
          <p>{props.age} smurf years old</p>
        </div>
        <div>
          <i className="small blue-text material-icons">edit</i>
          <i className="small red-text text-lighten-1 material-icons">delete</i>
        </div>
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
