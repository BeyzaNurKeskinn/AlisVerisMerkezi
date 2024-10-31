import { createStore } from 'vuex';
import axios from 'axios';

const baseUrl = "https://localhost:44304/alisveris";
const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const productImagesUrl = "https://localhost:44304/media/products/";

export default createStore({

  strict: true,
  state() {
    return {
      pages: [],
      categories: [],
      products: [],
      productImages: productImagesUrl,
      currentPage: 1, // Yeni currentPage özelliği
      pageCount: 0, // Yeni pageCount özelliği
    };
  },
  mutations: {
    setPages(state, pages) {
      state.pages = pages;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setPageCount(state, count) {
      state.pageCount = count;
    },
  },
  actions: {
    async setPagesAction({ commit }) {
      try {
        const response = await axios.get(pagesUrl);
        commit("setPages", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async setCategoriesAction({ commit }) {
      try {
        const response = await axios.get(categoriesUrl);
        commit("setCategories", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    
    async setProductsByCategoryAction({ commit, state }, category) {
      let url;
      let productCountUrl;

      if (category !== "all") {
        url = `${productsUrl}/${category}?p=${state.currentPage}`;
        productCountUrl = `${productsUrl}/count/${category}`;
      } else {
        url = `${productsUrl}`;
        productCountUrl = `${productsUrl}/count/all`;
      }

      try {
        const productCountResponse = await axios.get(productCountUrl);
        const productCount = productCountResponse.data;

        commit("setPageCount", productCount);

        const productsResponse = await axios.get(url);
        const products = productsResponse.data;

        commit("setProducts", products);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
