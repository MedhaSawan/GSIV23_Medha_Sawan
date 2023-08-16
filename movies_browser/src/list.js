import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "./index.css";
import { Row, Col, Card, InputGroup, Form } from "react-bootstrap";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: "",
      page: 1,
      isLoading: true,
      mode: "add",
    };
  }

  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    this.setState({ isLoading: true });
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDJkMTAwNTM4MDllNjA2Y2E4NzdmZDA5MjI0MTFhNiIsInN1YiI6IjY0ZGE2MjRlZDEwMGI2MDExYzgzNDEzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q-ZBwMY9w0sFgQHvBjDwfPDjCweRBwcxoipKgktzX-U",
      },
    };
    let apiUrl;
    if (this.state.searchQuery === "") {
      apiUrl = "https://api.themoviedb.org/3/discover/movie";
    } else {
      apiUrl = "https://api.themoviedb.org/3/search/movie";
    }

    fetch(
      `${apiUrl}?include_adult=false&include_video=false&language=en-US&page=${this.state.page}&sort_by=popularity.desc&query=${this.state.searchQuery}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (this.state.mode === "add") {
          this.setState({ movies: data.results });
        } else {
          this.setState((prevState) => ({
            movies: [...prevState.movies, ...data.results],
          }));
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery: searchQuery, page: 1, mode: "add" });

    setTimeout(() => {
      this.getResult();
    }, 1);
  };

  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
      mode: "append",
    });
    setTimeout(() => {
      this.getResult();
    }, 1);
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <Row
          className="py-2"
          style={{
            position: "sticky",
            backgroundColor: "white",
            top: "0px",
            zIndex: 100,
          }}
        >
          <Col xs={7} sm={7} md={7} lg={7}>
            <InputGroup>
              <InputGroup.Text
                id="basic-addon1 p-0"
                style={{ backgroundColor: "white" }}
              >
                <img
                  src="./search.png"
                  alt="Search"
                  className="movie-image"
                  style={{ borderRadius: "5px" }}
                />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </InputGroup>
          </Col>
          <Col xs={5} sm={5} md={5} lg={5}>
            <Link
              className="p-0 m-2"
              style={{
                position: "relative",
                float: "right",
                border: "none",
                backgroundColor: "white",
              }}
              to={"/"}
            >
              <img
                src="./home.png"
                alt="Home"
                className="movie"
                style={{ borderRadius: "5px" }}
              />
            </Link>
          </Col>
        </Row>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="p-0">
              <div className="movie-card m-2">
                <Link to={`/detail/${movie.id}`}>
                  <Card style={{ height: "300px" }}>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={`${movie.title} Poster`}
                      className="movie-image"
                      height={`70%`}
                    />
                    <Card.Body className="p-1 m-0">
                      <Col className="d-flex">
                        {" "}
                        <div
                          className="text-truncate"
                          style={{
                            width: `80%`,
                            textAlign: "left",
                          }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={movie.title}
                        >
                          <strong>{movie.title}</strong>
                        </div>
                        <div style={{ width: `20%`, textAlign: "right" }}>
                          <strong>({movie.vote_average})</strong>
                        </div>
                      </Col>
                      <div
                        className="movie-description text-truncate "
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={movie.overview}
                        style={{ maxHeight: "3em", fontSize: "small" }}
                      >
                        {movie.overview}
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            </Col>
          ))}
          <div>
            {!this.state.isLoading ? (
              <button className="btn btn-primary mb-2" onClick={this.loadMore}>
                Load More
              </button>
            ) : (
              <div className="loader"></div>
            )}
          </div>
        </Row>
      </div>
    );
  }
}

export default MovieList;
