<template>
  <div class="container">
    <AppHeader />

    <router-view/>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import AppHeader from "./components/AppHeader";

export default {
  components: {
    AppHeader,
  },
  methods: {
    ...mapActions(["setPagesAction", "setCategoriesAction"]),
    ...mapActions("cart", ["initializeCart"]),
  },
  async created() {
    await this.setPagesAction();
    await this.setCategoriesAction();
    await this.initializeCart();
  },
};
</script>
