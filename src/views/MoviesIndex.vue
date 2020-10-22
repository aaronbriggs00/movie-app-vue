<template>
  <div class="movies-index">
    Search by title: <input v-model="titleFilter" list="titles" />
    <datalist id="titles">
      <option v-for="movie in movies">{{ movie.title }}</option>
    </datalist>
    <div>
      <button
        v-on:click="
          sortAttribute = 'title';
          sortDirection *= -1;
        "
      >
        Sort Alphabetically
      </button>
    </div>
    <div
      v-for="movie in filterBy(
        orderBy(movies, sortAttribute, sortDirection),
        titleFilter,
        'title'
      )"
    >
      <h1>{{ movie.title }}</h1>
      <p>by {{ movie.director }}</p>
      <p>{{ movie.year }}</p>
      <p>{{ movie.plot }}</p>
      <router-link tag="button" :to="`/movies/${movie.id}`"
        >more info</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      movies: [],
      titleFilter: "",
      sortAttribute: null,
      sortDirection: -1,
    };
  },
  created: function() {
    axios.get("/api/movies").then((response) => {
      console.log(response.data);
      this.movies = response.data;
    });
  },
  methods: {},
};
</script>
