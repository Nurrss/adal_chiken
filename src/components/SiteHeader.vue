<script setup>
import { useStore } from "../composables/useStore.js";
import { businessInfo } from "../data.js";

const { lang, t, setLang, cartCount } = useStore();

defineProps({
  cartOpen: Boolean,
});
const emit = defineEmits(["open-cart"]);

const business = businessInfo;
</script>

<template>
  <header class="site-header">
    <div class="container">
      <a href="#" class="brand">
        <img :src="business.logoIcon" alt="Adal Chicken logo" />
        <span>{{ business.name }}</span>
      </a>

      <nav class="main-nav">
        <a href="#info">{{ t.nav_about }}</a>
        <a href="#menu">{{ t.nav_menu }}</a>
        <a :href="business.instagram" target="_blank" rel="noopener">Instagram</a>
      </nav>

      <div class="header-right">
        <div class="lang-switch">
          <button :class="{ active: lang.value === 'kz' }" @click="setLang('kz')">KZ</button>
          <button :class="{ active: lang.value === 'ru' }" @click="setLang('ru')">RU</button>
        </div>
        <button class="cart-button" @click="emit('open-cart')" aria-label="Cart">
          <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.07-.13.11-.28.11-.43 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
