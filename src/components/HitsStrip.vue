<script setup>
import { useStore, formatPrice } from "../composables/useStore.js";

const { lang, t, cart, hitItems, addToCart, openItem } = useStore();
</script>

<template>
  <div class="hits" v-if="hitItems.length">
    <h3 class="hits-title">🔥 {{ t.hits_title }}</h3>
    <div class="hits-track">
      <article
        v-for="item in hitItems"
        :key="item.id"
        class="hit-card"
        tabindex="0"
        role="button"
        :aria-label="item.name[lang.value]"
        @click="openItem(item.id)"
        @keydown.enter.self="openItem(item.id)"
      >
        <div class="photo" :class="{ 'no-photo': !item.image, 'photo-cover': item.imageCover }">
          <img v-if="item.image" :src="item.image" :alt="item.name[lang.value]" loading="lazy" decoding="async" />
          <span v-else class="emoji" aria-hidden="true">{{ item.icon }}</span>
          <span v-if="cart[item.id]" class="in-cart-badge">{{ cart[item.id] }}</span>
        </div>
        <div class="hit-body">
          <h4>{{ item.name[lang.value] }}</h4>
          <div class="hit-row">
            <span class="hit-price">{{ formatPrice(item.price) }} {{ t.currency }}</span>
            <button class="hit-add" :aria-label="t.add_to_cart" @click.stop="addToCart(item.id)">+</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
