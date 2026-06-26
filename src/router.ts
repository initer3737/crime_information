import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./Home.vue";
import DataView from "./Data.vue";

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/:id/data", component: DataView },
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
