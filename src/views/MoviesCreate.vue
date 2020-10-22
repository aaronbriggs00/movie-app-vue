<template>
  <div class="movies-create">
    <form v-on:submit.prevent="createMovie()">
      <h1>New movie</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label>Year:</label>
        <input type="text" class="form-control" v-model="year" />
      </div>
      <div class="form-group">
        <label>Plot:</label>
        <input type="text" class="form-control" v-model="plot" />
      </div>
      <p>{{ 140 - plot.length }} chars remaining</p>
      <div class="form-group">
        <label>Director:</label>
        <input type="text" class="form-control" v-model="director" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      year: "",
      plot: "",
      director: "",
      errors: [],
    };
  },
  methods: {
    createMovie: function() {
      var params = {
        title: this.title,
        year: this.year,
        plot: this.plot,
        director: this.director,
      };
      axios
        .post("/api/movies", params)
        .then((response) => {
          this.$router.push("/movies");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
