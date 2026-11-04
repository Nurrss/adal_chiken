<script setup>
import { useStore, formatPrice } from "../composables/useStore.js";

const emit = defineEmits(["close", "checkout"]);

const { lang, t, cartItems, cartTotal, increment, decrement, clearCart } = useStore();
</script>

<template>
  <div class="overlay" @click="emit('close')"></div>
  <aside class="cart-panel">
    <div class="cart-header">
      <h2>{{ t.cart_title }}</h2>
      <button class="close-btn" @click="emit('close')" :aria-label="t.cart_close">×</button>
    </div>
    <div class="cart-body">
      <p class="cart-empty" v-if="cartItems.length === 0">{{ t.cart_empty }}</p>
      <div class="cart-item" v-for="line in cartItems" :key="line.item.id">
        <div class="icon">
          <img v-if="line.item.image" :src="line.item.image" :alt="line.item.name[lang.value]" />
          <span v-else>{{ line.item.icon }}</span>
        </div>
        <div class="info">
          <h4>{{ line.item.name[lang.value] }}</h4>
          <div class="line-price">{{ formatPrice(line.item.price * line.qty) }} {{ t.currency }}</div>
        </div>
        <div class="qty-control">
          <button @click="decrement(line.item.id)" :aria-label="t.qty_minus">−</button>
          <span>{{ line.qty }}</span>
          <button @click="increment(line.item.id)" :aria-label="t.qty_plus">+</button>
        </div>
      </div>
    </div>
    <div class="cart-footer" v-if="cartItems.length > 0">
      <div class="cart-total-row">
        <span>{{ t.cart_total }}</span>
        <span>{{ formatPrice(cartTotal) }} {{ t.currency }}</span>
      </div>
      <div class="cart-actions">
        <button class="btn btn-whatsapp btn-block" @click="emit('checkout')">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-1.7-.85-2.81-1.51-3.93-3.43-.3-.51.3-.47.85-1.58.09-.19.05-.36-.04-.51-.1-.15-.6-1.45-.82-1.99-.22-.53-.44-.46-.61-.46-.16 0-.35-.02-.54-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.15.19 2.01 3.08 4.96 4.2 2.95 1.12 2.95.75 3.48.7.53-.05 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.19-.56-.34zM12.02 2C6.5 2 2 6.49 2 12c0 1.94.56 3.76 1.53 5.31L2 22l4.83-1.46A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.51 22 12S17.53 2 12.02 2zm0 18.18c-1.74 0-3.4-.5-4.83-1.43l-.35-.22-3.18.96.97-3.1-.23-.36A8.18 8.18 0 0 1 3.8 12c0-4.53 3.69-8.18 8.22-8.18 4.53 0 8.18 3.65 8.18 8.18 0 4.53-3.65 8.18-8.18 8.18z"/>
          </svg>
          {{ t.cart_checkout }}
        </button>
        <button class="btn btn-secondary btn-block" @click="clearCart">{{ t.cart_clear }}</button>
      </div>
    </div>
  </aside>
</template>
