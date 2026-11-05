<script setup>
import { useStore } from "../composables/useStore.js";
import { businessInfo, ui } from "../data.js";

const { lang, t } = useStore();
const business = businessInfo;
</script>

<template>
  <section class="hero">
    <img :src="business.logo" alt="Adal Chicken" class="hero-logo" />
    <h1>{{ business.name }}</h1>
    <p class="slogan">{{ ui.kz.slogan }}</p>
    <p class="slogan second">{{ ui.ru.slogan }}</p>
    <div class="hero-meta">
      <span>🕐 {{ business.hours[lang.value] }}</span>
      <span>📍 {{ business.address[lang.value] }}</span>
    </div>
    <div class="hero-actions">
      <a href="#menu" class="btn btn-primary">{{ t.hero_order }}</a>
      <a :href="business.instagram" target="_blank" rel="noopener" class="btn btn-instagram">{{ t.hero_instagram }}</a>
    </div>
    <div class="scroll-arrow">⌄</div>
  </section>
</template>
