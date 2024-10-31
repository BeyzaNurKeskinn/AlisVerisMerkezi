<template>
    <div>
      <h2>Products</h2>
  
      <router-link to="/admin/products/add" class="btn btn-primary mb-4">Add Product</router-link>
  
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in products" :key="i">
            <td class="align-middle">{{ p.name }}</td>
            <td class="align-middle">
              <img :src="productImages + p.image" width="100" />
            </td>
            <td class="align-middle">{{ p.price }}</td>
            <td class="align-middle">{{ p.category.name }}</td>
            <td class="align-middle">
              <button class="btn btn-sm btn-secondary mx-2" @click="handleEdit(p)">Edit</button>
              <button class="btn btn-sm btn-danger mx-2" @click="deleteProduct(p)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <ProductPagination />
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  
  import ProductPagination from "../ProductPagination";
  
  export default {
    components: {
      ProductPagination,
    },
    setup() {
      const router = useRouter();
      const store = useStore();
  
      const products = computed(() => store.state.products);
      const productImages = computed(() => store.state.productImages);
  
      const handleEdit = (product) => {
        router.push(`/admin/products/edit/${product.id}`);
      };
  
      const deleteProduct = (product) => {
        store.dispatch("deleteProduct", product.id);
      };
  
      return {
        products,
        productImages,
        handleEdit,
        deleteProduct,
      };
    },
    created() {
      this.setCurrentCategory("all");
      this.setProductsByCategoryAction("all");
    },
  };
  </script>
  