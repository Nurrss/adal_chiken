<script setup>
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import InfoSection from './components/InfoSection.vue';
import MenuSection from './components/MenuSection.vue';
import CartPanel from './components/CartPanel.vue';
import CheckoutModal from './components/CheckoutModal.vue';
import SiteFooter from './components/SiteFooter.vue';
import FloatingActions from './components/FloatingActions.vue';

const cartOpen = ref(false);
const checkoutOpen = ref(false);

function openCheckout() {
  cartOpen.value = false;
  checkoutOpen.value = true;
}
</script>

<template>
  <SiteHeader @open-cart="cartOpen = true" />
  <HeroSection />
  <InfoSection />
  <MenuSection />

  <CartPanel
    v-if="cartOpen"
    @close="cartOpen = false"
    @checkout="openCheckout"
  />
  <CheckoutModal v-if="checkoutOpen" @close="checkoutOpen = false" />

  <SiteFooter />
  <FloatingActions @open-cart="cartOpen = true" />
</template>
