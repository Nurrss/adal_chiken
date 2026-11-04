<script setup>
import { ref, computed } from "vue";
import { useStore } from "../composables/useStore.js";
import { categories } from "../data.js";
import MenuCard from "./MenuCard.vue";
import HitsStrip from "./HitsStrip.vue";

const { lang, t, menuItems } = useStore();

const activeCategory = ref("all");

const groupedItems = computed(() => {
  const cats = activeCategory.value === "all" ? categories : categories.filter((cat) => cat.id === activeCategory.value);
  return cats
    .map((cat) => ({ ...cat, items: menuItems.filter((item) => item.category === cat.id) }))
    .filter((group) => group.items.length);
});
</script>

<template>
  <section class="menu-section" id="menu">
    <div class="container">
    <h2>{{ t.menu_title }}</h2>

    <HitsStrip />

    <div class="filters">
      <button
        class="filter-btn"
        :class="{ active: activeCategory === 'all' }"
        @click="activeCategory = 'all'"
      >{{ t.filter_all }}</button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-btn"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >{{ cat.name[lang.value] }}</button>
    </div>

    <div v-for="group in groupedItems" :key="group.id">
      <h3 class="category-title">{{ group.name[lang.value] }}</h3>
      <div class="menu-grid">
        <MenuCard v-for="item in group.items" :key="item.id" :item="item" />
      </div>
    </div>
    </div>
  </section>
</template>
