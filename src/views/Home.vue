<template>
  <div class="home">
    <h1>movie app</h1>
    Title: <input type="text" v-model="createMovieTitle"><br>
    Year: <input type="text" v-model="createMovieYear"><br>
    Director: <input type="text" v-model="createMovieDirector"><br>
    Plot: <input type="text" v-model="createMoviePlot"><br>
    <button v-on:click="createMovie()">new</button><br>
    <div v-for="movie in movies">
      <h2>{{movie.title}}</h2>
      <h3>{{movie.year}} {{movie.director}}</h3>
      <p>{{movie.plot}}</p>
      <button v-on:click="showMovie(movie)">edit</button>
    </div>

    <dialog id="movie-details">
      <form method="dialog">
        <h2>Movie Info</h2>
        {{ currentMovie }}
        <p>Title: <input type="text" v-model="currentMovie.title"></p>
        <p>Year: <input type="text" v-model="currentMovie.year"></p>
        <p>Director: <input type="text" v-model="currentMovie.director"></p>
        <p><input type="text" v-model="currentMovie.plot"></p>
        <button v-on:click="updateMovie(currentMovie)">Update</button>
        <button v-on:click="destroyMovie(currentMovie)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      movies: [],
      currentMovie: {},
      createMovieTitle: "",
      createMovieYear: 1970,
      createMoviePlot: "",
      createMovieDirector: "",
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios
        .get("/api/movies")
        .then((response) => {
          console.log(response.data);
          this.movies = response.data;
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showMovie: function (movie) {
      this.currentMovie = movie;
      document.querySelector("#movie-details").showModal();
    },
    createMovie: function () {
      var params = {
        title: this.createMovieTitle,
        year: this.createMovieYear,
        plot: this.createMoviePlot,
        director: this.createMovieDirector,
      };
      axios
        .post("/api/movies", params)
        .then((response) => {
          console.log(response.data);
          this.movies.push(response.data);
          this.createMovieTitle = "";
          this.createMovieYear = 1970;
          this.createMoviePlot = "";
          this.createMovieDirector = "";
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    updateMovie: function (movie) {
      var params = {
        title: movie.title,
        plot: movie.plot,
        year: movie.year,
        director: movie.director,
      };
      axios
        .patch(`/api/movies/${movie.id}`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyMovie: function (movie) {
      axios
        .delete(`/api/movies/${movie.id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
