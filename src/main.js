import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import store from "./store";
import router from "./router";

import { Vuelidate } from "vuelidate";
import { QuillEditor } from "vue-quill-editor";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Vuelidate);
app.component("QuillEditor", QuillEditor);

app.config.globalProperties.$filters = {
  currency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  },
};

app.mount("#app");
