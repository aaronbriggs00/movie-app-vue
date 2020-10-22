<template>
  <div class="movies-index">
        <h1>{{movie.title}}</h1>
      <p>by {{movie.director}}</p>
      <p>{{movie.year}}</p>
      <p>{{movie.plot}}</p>
      <router-link tag="button" :to="`/movies/${movie.id}/edit`">edit</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      movie: [],
      errors: []
    };
  },
  created: function() {
    axios
      .get(`/api/movies/${this.$route.params.id}`).then(response => {
        console.log(response.data);
        this.movie = response.data;
      });
  },
  methods: {
  
  }
};
</script>