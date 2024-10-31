<template>
    <div class="float-right text-white">
      <span v-if="itemCount > 0">
        {{ itemCount }} item(s) {{ formatPrice(totalPrice) }}
      </span>
      <span v-else>
        Your cart is empty.
      </span>
      <router-link to="/cart" class="btn btn-sm btn-dark text-white" v-if="itemCount > 0">
        <i class="fa fa-shopping-cart"></i>
      </router-link>
    </div>
  </template>
  <script>
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  export default {
    setup() {
      const store = useStore();
      const itemCount = computed(() => store.getters["cart/itemCount"]);
      const totalPrice = computed(() => store.getters["cart/totalPrice"]);
  
      return {
        itemCount,
        totalPrice
      };
    },
  };
  </script>