<template>
  <div class="row">
    <div class="col-12">
      <div class="m-2">
        <div class="form-group m-2">
          <label for="">Name</label>
          <input type="text" class="form-control" v-model="order.name" />
          <validation-error :validation="validation.order.name" />
        </div>
        <div class="form-group m-2">
          <label for="">E-mail</label>
          <input type="text" class="form-control" v-model="order.email" />
          <validation-error :validation="validation.order.email" />
        </div>
        <div class="form-group m-2">
          <label for="">Address</label>
          <input type="text" class="form-control" v-model="order.address" />
          <validation-error :validation="validation.order.address" />
        </div>
      </div>
    </div>

    <div class="col-12 text-center">
      <router-link to="/cart" class="btn btn-secondary m-1">Back</router-link>
      <button class="btn btn-primary m-1" @click="submitOrder">Place Order</button>
    </div>
  </div>
</template>

<script>
import ValidationError from "./ValidationError";
import { required, email } from "vuelidate/lib/validators";
import { computed } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { mapActions } from "vuex";

export default {
  components: {
    ValidationError,
  },
  data() {
    return {
      order: {
        name: "John",
        email: "john@gmail.com",
        address: "John Street",
      },
    };
  },
  methods: {
    ...mapActions("cart", ["submitOrder"]),
  },
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart.cart);
    const total = computed(() => store.getters["cart/totalPrice"]);

    const validations = {
      order: {
        name: { required },
        email: { required, email },
        address: { required },
      },
    };

    const validation = useVuelidate(validations);

    const submitOrder = async () => {
      validation.$touch();

      if (!validation.$invalid) {
        const order = new FormData();

        order.append("Name", this.order.name);
        order.append("Email", this.order.email);
        order.append("Address", this.order.address);
        order.append("Cart", JSON.stringify(cart.value));
        order.append("Total", total.value);

        await store.dispatch("cart/submitOrder", order);
        store.dispatch("cart/clearCartData");
        this.$router.push("/thanks");
      }
    };

    return {
      cart,
      total,
      validation,
      submitOrder,
    };
  },
};
</script>
