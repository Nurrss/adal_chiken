import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

document.documentElement.lang = (localStorage.getItem("adalchicken_lang") || "kz") === "kz" ? "kk" : "ru";

createApp(App).mount("#app");
