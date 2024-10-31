<template>
    <div>
      <h2>Orders</h2>
  
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Address</th>
            <th>Order Content</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, i) in orders" :key="i">
            <td class="align-middle">{{ o.id }}</td>
            <td class="align-middle">{{ o.name }}</td>
            <td class="align-middle">{{ o.email }}</td>
            <td class="align-middle">{{ o.address }}</td>
            <td class="align-middle">
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="(item, index) in JSON.parse(o.cart)"
                  :key="index"
                >
                  {{ item.product.name }}
                  {{ item.product.price }}
                  {{ "x " + item.quantity }}
                </li>
              </ul>
            </td>
            <td class="align-middle">{{ o.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const orders = computed(() => store.state.orders.orders);
  
      const setOrdersAction = () => {
        store.dispatch('orders/setOrdersAction');
      };
  
      onMounted(() => {
        setOrdersAction();
      });
  
      return {
        orders,
      };
    },
  };
  </script>
  