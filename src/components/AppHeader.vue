<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">CMS ShoppingCart</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-for="(p, i) in pages" :key="i">
            <router-link v-if="p.slug !== 'home'" class="nav-link" :to="'/' + p.slug">
              {{ p.name }}
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
  <script>
  import { mapState } from "vuex";
  

  export default {
 computed: {


      ...mapState({
        pages: (state) => state.pages,
      }),
    },
  };
  </script>
  