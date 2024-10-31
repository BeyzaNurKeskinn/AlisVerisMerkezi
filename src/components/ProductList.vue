<template>
  <div class="row mt-3">
    <CategoryList />

    <div class="col-9">
      <div class="row">
        <div class="col-4 mt-3" v-for="(p, i) in products" :key="i">
          <p>
            <img :src="productImages + p.image" class="img-fluid" />
          </p>
          <h3>{{ p.name }}</h3>
          <p>{{ p.description }}</p>
         
          <p>
            <button class="btn btn-primary" @click="handleAddProduct(p)">
              Add to cart
            </button>
          </p>
        </div>
      </div>

      <ProductPagination />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
  components: {
    CategoryList,
    ProductPagination,
  },
  computed: {
    ...mapState({
      products: (state) => state.products,
      productImages: (state) => state.productImages,
    }),
  },
  methods: {
    ...mapMutations('cart', ['addProduct']),
    ...mapActions({
      setProductsByCategoryAction: 'setProductsByCategoryAction',
    }),
    handleAddProduct(product) {
      this.addProduct(product);
    },
    ...mapMutations('pagination', ['setCurrentPage']),
    ...mapMutations('category', ['setCurrentCategory']),
  },
  created() {
    this.setCurrentPage(1);
    const category = this.$route.params.category || 'all';
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurrentPage(1);
    const category = to.params.category || 'all';
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
    next();
  },
};
</script>
