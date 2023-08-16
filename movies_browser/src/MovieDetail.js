import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import withRouter from "./withRouter";
import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      credits: {},
      director: "",
      cast: "",
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

    fetch(
      `https://api.themoviedb.org/3/movie/${itemId}/credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        data.cast.forEach((c) =>
          this.setState((prevState) => ({
            cast: prevState.cast + c.name + ", ",
          }))
        );
        data.crew.forEach((c) => {
          if (c.job === "Director") {
            this.setState((prevState) => ({
              director: prevState.director + c.name + ", ",
            }));
          }
        });
      })

      .catch((err) => console.error(err));
  }

  render() {
    const { movie } = this.state;

    return (
      <div>
        <Row>
          <Col
            xs={7}
            sm={7}
            md={7}
            lg={7}
            style={{
              position: "relative",
              float: "Left",
            }}
            className="d-flex"
          >
            <Link className="p-0 m-2" to={"/"}>
              <img src="../../back.png" alt="Back" />
            </Link>
            <h3>Movie Detail</h3>
          </Col>
          <Col xs={5} sm={5} md={5} lg={5}>
            <Link
              className="p-0 m-2"
              style={{
                position: "relative",
                float: "right",
              }}
              to={"/"}
            >
              <img
                src="../../home.png"
                alt="Home"
                className="movie"
                style={{ borderRadius: "5px" }}
              />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col key={movie.id} className="d-flex justify-content-left">
            <Col xs={2} sm={2} md={2} lg={2}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="movie-image"
                width={"100%"}
                height={"300px"}
              />
            </Col>
            <Col xs={10} sm={10} md={10} lg={10}>
              <div
                className="movie-details p-1"
                style={{ maxWidth: "82%", textAlign: "start", height: "300px" }}
              >
                <p className="d-flex">
                  <strong>{movie.title}</strong>
                  <span style={{ fontSize: "small", marginTop: "2px" }}>
                    ({movie.vote_average})
                  </span>
                </p>
                <p>
                  {movie.release_date?.slice(0, 4)} | {movie.runtime}min |{" "}
                  {this.state.director.slice(0, this.state.director.length - 2)}
                </p>
                <p
                  className="text-truncate"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={this.state.cast}
                >
                  Cast: {this.state.cast.slice(0, this.state.cast.length - 2)}
                </p>
                <p className="movie-description">{movie.overview}</p>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(MovieDetail);
