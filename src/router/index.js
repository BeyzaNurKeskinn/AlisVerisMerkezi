import { createRouter, createWebHistory } from "vue-router";

import Pages from "../components/AppPages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/AppCheckout";
import Thanks from "../components/AppThanks";

import Admin from "../components/admin/AppAdmin";
import Products from "../components/admin/AppProducts";
import ProductEditor from "../components/admin/ProductEditor";
import AdminPages from "../components/admin/AppPages";
import PageEditor from "../components/admin/PageEditor";
import Orders from "../components/admin/AppOrders";
import Login from "../components/admin/AppLogin";

import dataStore from "../store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/categories/:category", component: ProductList },
        { path: "/cart", component: ShoppingCart },
        { path: "/checkout", component: Checkout },
        { path: "/thanks", component: Thanks },
        { path: "/login", component: Login },
        {
            path: "/admin",
            component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "products", component: Products },
                {
                    path: "products/:op(add|edit)/:id(\\d+)?",
                    component: ProductEditor,
                },
                { path: "pages", component: AdminPages },
                {
                    path: "pages/:op(add|edit)/:id(\\d+)?",
                    component: PageEditor,
                },
                { path: "orders", component: Orders },
                { path: "*", redirect: "/admin/products" },
            ],
        },

        { path: "/:slug?", component: Pages },
        { path: "/:catchAll(.*)", redirect: "/" },
    ],
});

export default router;
