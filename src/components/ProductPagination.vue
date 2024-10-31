<template>
  <nav class="mt-5">
    <ul class="pagination">
      <li
        class="page-item"
        v-if="currentPage !== 1"
        @click="getProducts(currentPage - 1)"
      >
        <button class="btn btn-secondary mx-1">Previous</button>
      </li>
      <li
        class="page-item"
        v-for="(p, i) in pageCount"
        :key="i"
        @click="getProducts(p)"
      >
        <button
          class="btn mx-1"
          :class="[
            i + 1 === currentPage ? 'btn-primary' : 'btn-secondary',
          ]"
        >
          {{ p }}
        </button>
      </li>
      <li
        class="page-item"
        v-if="currentPage !== pageCount"
        @click="getProducts(currentPage + 1)"
      >
        <button class="btn btn-secondary mx-1">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, getCurrentInstance } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const store = instance.appContext.config.globalProperties.$store;

    const pageCount = computed(() => store.state.pageCount);
    const currentPage = computed(() => store.state.currentPage);

    const setCurrentPage = (page) => {
      store.commit("setCurrentPage", page);
    };

    const setProductsByCategoryPaginationAction = (page) => {
      store.dispatch("setProductsByCategoryPaginationAction", page);
    };

    const getProducts = (page) => {
      setCurrentPage(page);
      setProductsByCategoryPaginationAction(page);
    };

    return {
      pageCount,
      currentPage,
      getProducts,
    };
  },
};
</script>
