export default {
    namespaced: true,
    state() {
      return {
        cart: [],
      };
    },
    getters: {
      itemCount: (state) =>
        state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0),
      totalPrice: (state) =>
        state.cart.reduce(
          (total, cartItem) =>
            total + cartItem.quantity * cartItem.product.price,
          0
        ),
    },
    mutations: {
      addProduct(state, product) {
        let cartItem = state.cart.find(
          (cartItem) => cartItem.product.id === product.id
        );
        if (cartItem) {
          cartItem.quantity++;
        } else {
          state.cart.push({ product: product, quantity: 1 });
        }
      },
      subtractProduct(state, id) {
        let cartItemIndex = state.cart.findIndex(
          (cartItem) => cartItem.product.id === id
        );
        if (cartItemIndex !== -1) {
          let cartItem = state.cart[cartItemIndex];
          if (cartItem.quantity === 1) {
            state.cart.splice(cartItemIndex, 1);
          } else {
            cartItem.quantity--;
          }
        }
      },
      removeProduct(state, id) {
        let cartItemIndex = state.cart.findIndex(
          (cartItem) => cartItem.product.id === id
        );
        if (cartItemIndex !== -1) {
          state.cart.splice(cartItemIndex, 1);
        }
      },
      setCartData(state, data) {
        state.cart = data;
      },
    },
    actions: {
      loadCartData({ commit }) {
        try {
          let data = localStorage.getItem("cart");
          if (data) {
            commit("setCartData", JSON.parse(data));
          }
        } catch (error) {
          console.error("Failed to load cart data:", error);
        }
      },
      storeCartData({ state }) {
        try {
          localStorage.setItem("cart", JSON.stringify(state.cart));
        } catch (error) {
          console.error("Failed to store cart data:", error);
        }
      },
      initializeCart({ dispatch }) {
        dispatch("loadCartData");
      },
      clearCartData({ commit }) {
        commit("setCartData", []);
      },
    },
  };
  