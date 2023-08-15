import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import MovieList from "./list";
import MovieDetail from "./MovieDetail";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="App mx-3">
            {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"        >
                Learn React
              </a>
            </header> */}
            {/* <MovieList /> */}
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/detail/:id" element={<MovieDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
