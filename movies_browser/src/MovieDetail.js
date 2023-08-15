import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import withRouter from "./withRouter";
// import { Container, Row, Col, Button, Card } from "reac÷t-bootstrap";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    const itemId = this.props.params.id;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDJkMTAwNTM4MDllNjA2Y2E4NzdmZDA5MjI0MTFhNiIsInN1YiI6IjY0ZGE2MjRlZDEwMGI2MDExYzgzNDEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-ZBwMY9w0sFgQHvBjDwfPDjCweRBwcxoipKgktzX-U",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${itemId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movie: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { movie } = this.state;
    const itemId = this.props.params.id;

    return (
      <div>
        <h1>Movie Detail</h1>
        <div className="movie-list w-100">
          <div key={movie.id} className="movie-card col-md- col-sm-6">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className="movie-image"
            />
            <div className="movie-details">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
              <p className="movie-description">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetail);
