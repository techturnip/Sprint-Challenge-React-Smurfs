import React, { Component } from "react";
import axios from "axios";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: ""
    };
  }

  addSmurf = e => {
    e.preventDefault();

    // add code to create the smurf using the api

    const { name, age, height } = this.state;
    const payload = { name, age, height };

    axios
      .post("http://localhost:3333/smurfs", payload)
      .then(res => {
        this.props.updateSmurfs(res.data);
      })
      .catch(err => console.log(err));

    this.setState({
      name: "",
      age: "",
      height: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <h4>Add a Smurf to the Village</h4>
        <form onSubmit={this.addSmurf}>
          <div className="row">
            <label for="input_name">Name</label>
            <input
              id="input_name"
              type="text"
              onChange={this.handleInputChange}
              placeholder="name"
              value={this.state.name}
              name="name"
            />
          </div>
          <div className="row">
            <label for="input_age">Age</label>
            <input
              id="input_age"
              type="number"
              onChange={this.handleInputChange}
              placeholder="age"
              value={this.state.age}
              name="age"
            />
          </div>
          <div className="row">
            <label for="input_height">Height</label>
            <input
              id="input_height"
              type="text"
              onChange={this.handleInputChange}
              placeholder="height"
              value={this.state.height}
              name="height"
            />
          </div>
          <button type="submit" className="btn blue waves-effect waves-light">
            Add to the village
          </button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
