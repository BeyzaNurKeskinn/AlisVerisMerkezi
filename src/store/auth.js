
   
import axios from "axios";

const loginUrl = "https://localhost:44304/alisveris/auth";

export default {
  namespaced: true,
  state: {
    authenticated: false
  },
  mutations: {
    setAuthenticated(state) {
      state.authenticated = true;
    }
  },
  actions: {
    async authenticate({ commit }, credentials) {
      try {
        let response = await axios.post(loginUrl, credentials);
        if (response.data.success === true) {
          commit("setAuthenticated");
        }
      } catch (error) {
        // Handle error if the login request fails
        console.error(error);
      }
    }
  }
};
