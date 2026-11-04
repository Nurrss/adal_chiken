<script setup>
import { useStore, formatPrice } from "../composables/useStore.js";

const props = defineProps({
  item: { type: Object, required: true },
});

const { lang, t, cart, addToCart, increment, decrement, openItem, isHit } = useStore();
</script>

<template>
  <article
    class="menu-card"
    tabindex="0"
    role="button"
    :aria-label="item.name[lang.value]"
    @click="openItem(item.id)"
    @keydown.enter.self="openItem(item.id)"
  >
    <div class="photo" :class="{ 'no-photo': !item.image, 'photo-cover': item.imageCover }">
      <img v-if="item.image" :src="item.image" :alt="item.name[lang.value]" loading="lazy" decoding="async" />
      <span v-else class="emoji" aria-hidden="true">{{ item.icon }}</span>
      <span v-if="isHit(item.id)" class="hit-badge">🔥 {{ t.hit_badge }}</span>
      <span v-if="cart[item.id]" class="in-cart-badge">{{ cart[item.id] }}</span>
    </div>
    <div class="body">
      <h3>{{ item.name[lang.value] }}</h3>
      <p class="desc">{{ item.desc[lang.value] }}</p>
      <div class="footer-row" @click.stop>
        <span class="price">{{ formatPrice(item.price) }} {{ t.currency }}</span>
        <button v-if="!cart[item.id]" class="add-btn" :aria-label="t.add_to_cart" @click="addToCart(item.id)">
          <span class="plus" aria-hidden="true">+</span>
          <span class="add-label">{{ t.add_short }}</span>
        </button>
        <div v-else class="qty-control">
          <button @click="decrement(item.id)" :aria-label="t.qty_minus">−</button>
          <span>{{ cart[item.id] }}</span>
          <button @click="increment(item.id)" :aria-label="t.qty_plus">+</button>
        </div>
      </div>
    </div>
  </article>
</template>
