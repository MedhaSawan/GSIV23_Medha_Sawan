import "./App.css";
import React, { Component } from "react";
import MovieList from "./list";
import MovieDetail from "./MovieDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="App mx-3">
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
