import axios from "axios";

const ordersUrl = "https://localhost:44304/alisveris/orders";

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
    };
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
  },
  actions: {
    async storeOrderAction({ commit }, order) {
      try {
        const response = await axios.post(ordersUrl, order);
        return response.data.id;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async setOrdersAction({ commit }) {
      try {
        const response = await axios.get(ordersUrl);
        commit("setOrders", response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
      
    },
  },
};
