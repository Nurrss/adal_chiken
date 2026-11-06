<script setup>
import { watch, onBeforeUnmount } from "vue";
import { useStore, formatPrice } from "../composables/useStore.js";

const { lang, t, cart, openedItem, closeItem, addToCart, increment, decrement, isHit } = useStore();

function onKey(e) {
  if (e.key === "Escape") closeItem();
}

watch(openedItem, (item) => {
  document.body.classList.toggle("no-scroll", !!item);
  if (item) window.addEventListener("keydown", onKey);
  else window.removeEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  document.body.classList.remove("no-scroll");
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <Transition name="sheet">
    <div v-if="openedItem" class="sheet-backdrop" @click.self="closeItem">
      <div class="sheet" role="dialog" aria-modal="true" :aria-label="openedItem.name[lang.value]">
        <button class="sheet-close" type="button" :aria-label="t.cart_close" @click="closeItem">×</button>

        <div class="sheet-photo" :class="{ 'no-photo': !openedItem.image, 'photo-cover': openedItem.imageCover }">
          <img v-if="openedItem.image" :src="openedItem.image" :alt="openedItem.name[lang.value]" />
          <span v-else class="emoji" aria-hidden="true">{{ openedItem.icon }}</span>
          <span v-if="isHit(openedItem.id)" class="hit-badge">🔥 {{ t.hit_badge }}</span>
        </div>

        <div class="sheet-body">
          <h2>{{ openedItem.name[lang.value] }}</h2>
          <p>{{ openedItem.desc[lang.value] }}</p>
        </div>

        <div class="sheet-footer">
          <button
            v-if="!cart[openedItem.id]"
            class="sheet-add"
            type="button"
            @click="addToCart(openedItem.id)"
          >
            <span>{{ t.add_to_cart_price }}</span>
            <span class="sheet-add-price">
              <s v-if="openedItem.oldPrice" class="old-price">{{ formatPrice(openedItem.oldPrice) }}</s>
              {{ formatPrice(openedItem.price) }} {{ t.currency }}
            </span>
          </button>
          <template v-else>
            <div class="qty-control qty-lg">
              <button @click="decrement(openedItem.id)" :aria-label="t.qty_minus">−</button>
              <span>{{ cart[openedItem.id] }}</span>
              <button @click="increment(openedItem.id)" :aria-label="t.qty_plus">+</button>
            </div>
            <button class="sheet-done" type="button" @click="closeItem">
              {{ t.done }} · {{ formatPrice(openedItem.price * cart[openedItem.id]) }} {{ t.currency }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>
