<template>
  <div class="row mt-3">
    <CategoryList />

    <div class="col-9">
      <div v-html="pageContent" :key="pageContent"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },
  computed: {
    ...mapState(["pages"]), // State'ı doğru şekilde eşleme
    pageContent() {
      const slug = this.$route.params.slug || "home";
      const page = this.pages.find((page) => page.slug === slug);

      if (page) {
        return page.content;
      }

      return "";
    },
  },
};
</script>
