import React, { Component } from "react";
import axios from "axios";

class Smurf extends Component {
  state = {
    name: "",
    age: "",
    height: "",
    id: ""
  };

  componentDidMount() {
    // Set State to props passed in or pull data from server to grab individual smurf by id and pass to state for the edit form
    const { name, age, height, id } = this.props;

    // Check if on the Smurf route and set state from the server if so
    if (this.props.match) {
      axios
        .get("http://localhost:3333/smurfs")
        .then(res => {
          const id = this.props.match.params.id;
          const smurf = res.data.find(smurf => smurf.id === Number(id));

          this.setState({
            name: smurf.name,
            age: smurf.age,
            height: smurf.height,
            id: smurf.id
          });
        })
        .catch(err => console.log(err));
    } else {
      // else set state from the props passed in from the Smurfs component
      this.setState({
        name,
        age,
        height,
        id
      });
    }
  }

  editSmurf = e => {
    e.preventDefault();

    const { name, age, height, id } = this.state;
    const payload = { name, age, height };

    axios
      .put(`http://localhost:3333/smurfs/${id}`, payload)
      .then(res => {
        this.props.updateSmurfs(res.data);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  // These methods only accessible from individual Smurf route
  deleteSmurf = e => {
    const id = this.state.id;

    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.props.updateSmurfs(res.data);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // --------------------------------------------->

  render() {
    return (
      <div className="Smurf card hoverable">
        <div className="card-content">
          <div>
            <span className="card-title">{this.state.name}</span>
            <strong>{this.state.height} tall</strong>
            <p>{this.state.age} smurf years old</p>
          </div>
          <div>
            {/* conditionally render delete button */}
            {this.props.match && (
              <i
                onClick={this.deleteSmurf}
                className="small red-text text-lighten-1 material-icons"
              >
                delete
              </i>
            )}
          </div>
        </div>

        {/* conditionally render edit form */}
        {this.props.match && (
          <div className="EditSmurfForm">
            <h5>Edit Smurf</h5>
            <form onSubmit={this.editSmurf}>
              <div className="row">
                <label htmlFor="input_name">Name</label>
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
                <label htmlFor="input_age">Age</label>
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
                <label htmlFor="input_height">Height</label>
                <input
                  id="input_height"
                  type="text"
                  onChange={this.handleInputChange}
                  placeholder="height"
                  value={this.state.height}
                  name="height"
                />
              </div>
              <button
                type="submit"
                className="btn blue waves-effect waves-light"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
