import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDJkMTAwNTM4MDllNjA2Y2E4NzdmZDA5MjI0MTFhNiIsInN1YiI6IjY0ZGE2MjRlZDEwMGI2MDExYzgzNDEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-ZBwMY9w0sFgQHvBjDwfPDjCweRBwcxoipKgktzX-U",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data.results });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="p-0">
              <div key={movie.id} className="movie-card m-2">
                <Link to={`/detail/${movie.id}`}>
                  <Card style={{ height: "300px" }}>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={`${movie.title} Poster`}
                      className="movie-image"
                      height={`70%`}
                    />
                    <Card.Body className="p-0 m-0">
                      <Col className="d-flex">
                        {" "}
                        <div
                          className="text-truncate"
                          style={{
                            width: `80%`,
                            textAlign: "left",
                            textDecoration: "bold",
                          }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={movie.title}
                        >
                          {movie.title}
                        </div>
                        <div style={{ width: `20%`, textAlign: "right" }}>
                          ({movie.vote_average})
                        </div>
                      </Col>
                      <Card.Text>
                        <p
                          className="movie-description text-truncate"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={movie.overview}
                          style={{ maxHeight: "3em" }}
                        >
                          {movie.overview}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default MovieList;
