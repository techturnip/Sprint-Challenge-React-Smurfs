import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "axios";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import Smurf from "./components/Smurf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    // Audo initialize Materialize
    M.AutoInit();

    // Grab Smurfs from the server and set to state
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  // Pass this method down to components to update App state when actions are performed on the data
  updateSmurfs = smurfs => {
    this.setState({ smurfs });
  };

  render() {
    return (
      <div className="App">
        <nav className="container blue">
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              React Smurfs
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/add">Add Smurf</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <Route
            exact
            path="/add"
            render={props => (
              <SmurfForm {...props} updateSmurfs={this.updateSmurfs} />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <Smurfs
                {...props}
                smurfs={this.state.smurfs}
                updateSmurfs={this.updateSmurfs}
              />
            )}
          />
          <Route
            path="/smurfs/:id"
            render={props => (
              <Smurf {...props} updateSmurfs={this.updateSmurfs} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
