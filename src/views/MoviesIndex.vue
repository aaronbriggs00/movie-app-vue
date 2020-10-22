<template>
  <div class="movies-index">
    <div v-for="movie in movies">
      <h1>{{movie.title}}</h1>
      <p>by {{movie.director}}</p>
      <p>{{movie.year}}</p>
      <p>{{movie.plot}}</p>
      <router-link tag="button" :to="`/movies/${movie.id}`">more info</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      movies: [],
    };
  },
  created: function() {
    axios.get("/api/movies").then((response) => {
      console.log(response.data);
      this.movies = response.data;
    });
  },
  methods: {

  },
};
</script>