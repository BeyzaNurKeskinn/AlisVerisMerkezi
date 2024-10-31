<template>
    <div class="row mt-3">
      <CategoryList />
  
      <div class="col-9">
        <h2 class="display-4">Your cart</h2>
  
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="itemCount === 0">
              <td colspan="5" class="text-center">
                Your cart is empty.
              </td>
            </tr>
            <tr v-else v-for="(c, i) in cart" :key="i">
              <td>{{ c.product.name }}</td>
              <td>{{ c.quantity }}</td>
              <td>
                <button class="btn small btn-primary mx-1" @click="handleAddProduct(c.product)">
                  +
                </button>
                <button class="btn small btn-warning mx-1" @click="handleSubtractProduct(c.product.id)">
                  -
                </button>
                <button class="btn small btn-danger mx-1" @click="handleRemoveProduct(c.product.id)">
                  remove
                </button>
              </td>
              <td>{{ formatPrice(c.product.price) }}</td>
            <td>{{ formatPrice(c.product.price * c.quantity) }}</td>
            </tr>
          </tbody>
          <tfoot v-if="itemCount > 0">
            <tr>
              <td colspan="5" class="text-right">
                <h4>Total: {{ formatPrice(totalPrice) }}</h4>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <button class="btn btn-danger float-left" @click="handleClearCart">
                  Clear Cart
                </button>
                <router-link to="/checkout" class="btn btn-primary float-right">
                  Checkout
                </router-link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </template>
  <script>
  import { computed } from "vue";
import { useStore } from "vuex";

import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },
  setup() {
    const store = useStore();

    const cart = computed(() => store.state.cart.cart);
    const itemCount = computed(() => store.getters["cart/itemCount"]);
    const totalPrice = computed(() => store.getters["cart/totalPrice"]);

    const addProduct = (product) => {
      store.commit("cart/addProduct", product);
    };

    const subtractProduct = (id) => {
      store.commit("cart/subtractProduct", id);
    };

    const removeProduct = (id) => {
      store.commit("cart/removeProduct", id);
    };

    const clearCartData = () => {
      store.dispatch("cart/clearCartData");
    };

    const handleAddProduct = (product) => {
      addProduct(product);
    };

    const handleSubtractProduct = (id) => {
      subtractProduct(id);
    };

    const handleRemoveProduct = (id) => {
      removeProduct(id);
    };

    const handleClearCart = () => {
      clearCartData();
    };

    const formatPrice = (price) => {
      // Implement your logic to format the price here
      // For example, you can use the toLocaleString() method:
      // return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
      return price; // Replace this line with your formatting logic
    };

    return {
      cart,
      itemCount,
      totalPrice,
      handleAddProduct,
      handleSubtractProduct,
      handleRemoveProduct,
      handleClearCart,
      formatPrice,
    };
  },
};
</script>
