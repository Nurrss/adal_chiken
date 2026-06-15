import { reactive, computed, watch } from "vue";
import { ui, menuItems, paymentMethods } from "../data.js";

const lang = reactive({ value: localStorage.getItem("adalchicken_lang") || "ru" });
const cart = reactive(JSON.parse(localStorage.getItem("adalchicken_cart") || "{}"));

watch(
  cart,
  () => localStorage.setItem("adalchicken_cart", JSON.stringify(cart)),
  { deep: true }
);

function setLang(value) {
  lang.value = value;
  localStorage.setItem("adalchicken_lang", value);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
}

function increment(id) {
  cart[id] = (cart[id] || 0) + 1;
}

function decrement(id) {
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
}

function clearCart() {
  Object.keys(cart).forEach((key) => delete cart[key]);
}

const t = computed(() => ui[lang.value]);

const cartItems = computed(() =>
  Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ item: menuItems.find((i) => i.id === id), qty }))
    .filter((line) => line.item)
);

const cartCount = computed(() => cartItems.value.reduce((sum, line) => sum + line.qty, 0));

const cartTotal = computed(() =>
  cartItems.value.reduce((sum, line) => sum + line.qty * line.item.price, 0)
);

export function useStore() {
  return {
    lang,
    cart,
    ui,
    t,
    setLang,
    addToCart,
    increment,
    decrement,
    clearCart,
    cartItems,
    cartCount,
    cartTotal,
    menuItems,
    paymentMethods,
  };
}

export function formatPrice(value) {
  return value.toLocaleString("ru-RU");
}
