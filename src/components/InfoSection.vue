<script setup>
import { useStore } from "../composables/useStore.js";
import { businessInfo } from "../data.js";

const { lang, t } = useStore();
const business = businessInfo;

function whatsappLink() {
  const phone = business.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${phone}`;
}
</script>

<template>
  <section class="info-section container" id="info">
    <div class="info-grid">
      <div class="info-card">
        <div class="icon">🕐</div>
        <h3>{{ t.info_hours_title }}</h3>
        <p>{{ business.hours[lang.value] }}</p>
      </div>
      <div class="info-card">
        <div class="icon">📍</div>
        <h3>{{ t.info_address_title }}</h3>
        <p>{{ business.address[lang.value] }}</p>
      </div>
      <div class="info-card">
        <div class="icon">📲</div>
        <h3>{{ t.info_contacts_title }}</h3>
        <div class="contact-row">
          <a :href="whatsappLink()" target="_blank" rel="noopener">WhatsApp</a>
        </div>
        <div class="contact-row">
          <a :href="business.instagram" target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
    </div>
  </section>
</template>
