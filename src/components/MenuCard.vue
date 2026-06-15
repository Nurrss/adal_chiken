<script setup>
import { useStore, formatPrice } from "../composables/useStore.js";

const props = defineProps({
  item: { type: Object, required: true },
});

const { lang, t, cart, addToCart, increment, decrement } = useStore();
</script>

<template>
  <div class="menu-card">
    <div class="photo">{{ item.icon }}</div>
    <div class="body">
      <h3>{{ item.name[lang.value] }}</h3>
      <p>{{ item.desc[lang.value] }}</p>
      <div class="footer-row">
        <span class="price">{{ formatPrice(item.price) }} {{ t.currency }}</span>
        <button v-if="!cart[item.id]" class="add-btn" :aria-label="t.add_to_cart" @click="addToCart(item.id)">+</button>
        <div v-else class="qty-control">
          <button @click="decrement(item.id)" :aria-label="t.qty_minus">−</button>
          <span>{{ cart[item.id] }}</span>
          <button @click="increment(item.id)" :aria-label="t.qty_plus">+</button>
        </div>
      </div>
    </div>
  </div>
</template>
