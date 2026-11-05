<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useStore } from "../composables/useStore.js";
import { categories } from "../data.js";
import MenuCard from "./MenuCard.vue";
import HitsStrip from "./HitsStrip.vue";

const { lang, t, menuItems } = useStore();

// Все категории идут друг под другом, каждая — горизонтальная лента
const groups = computed(() =>
  categories
    .map((cat) => ({ ...cat, items: menuItems.filter((item) => item.category === cat.id) }))
    .filter((group) => group.items.length)
);

const activeCategory = ref(groups.value[0]?.id);
const filtersEl = ref(null);
const tracks = {};
let observer = null;
let clickLock = false;

// Нажатие на категорию — плавно прокрутить страницу к её ленте
function goTo(id) {
  const el = document.getElementById(`cat-${id}`);
  if (!el) return;
  activeCategory.value = id;
  centerChip(id);
  clickLock = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => (clickLock = false), 700);
}

// Активная кнопка категории всегда видна в полосе фильтров
function centerChip(id) {
  const bar = filtersEl.value;
  const chip = bar?.querySelector(`[data-cat="${id}"]`);
  if (!bar || !chip) return;
  const left = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
  bar.scrollTo({ left, behavior: "smooth" });
}

// Стрелки для мыши (ноутбук)
function scrollRow(id, dir) {
  const track = tracks[id];
  if (!track) return;
  track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
}

onMounted(async () => {
  await nextTick();
  // Подсветка категории, которую сейчас видно на экране
  observer = new IntersectionObserver(
    (entries) => {
      if (clickLock) return;
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const id = visible[0].target.dataset.cat;
      if (id && id !== activeCategory.value) {
        activeCategory.value = id;
        centerChip(id);
      }
    },
    { rootMargin: "-130px 0px -55% 0px" }
  );
  document.querySelectorAll(".category-row").forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section class="menu-section" id="menu">
    <div class="container">
      <h2>{{ t.menu_title }}</h2>

      <HitsStrip />

      <nav class="filters" ref="filtersEl">
        <button
          v-for="group in groups"
          :key="group.id"
          :data-cat="group.id"
          class="filter-btn"
          :class="{ active: activeCategory === group.id }"
          @click="goTo(group.id)"
        >{{ group.name[lang.value] }}</button>
      </nav>

      <div
        v-for="group in groups"
        :key="group.id"
        :id="`cat-${group.id}`"
        :data-cat="group.id"
        class="category-row"
      >
        <div class="row-head">
          <h3 class="row-title">
            {{ group.name[lang.value] }}
            <span class="row-count">{{ group.items.length }}</span>
          </h3>
          <div class="row-arrows">
            <button type="button" class="row-arrow" aria-label="←" @click="scrollRow(group.id, -1)">‹</button>
            <button type="button" class="row-arrow" aria-label="→" @click="scrollRow(group.id, 1)">›</button>
          </div>
        </div>
        <div class="row-track" :ref="(el) => (tracks[group.id] = el)">
          <MenuCard v-for="item in group.items" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>
