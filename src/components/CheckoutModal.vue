<script setup>
import { reactive, ref } from "vue";
import { useStore, formatPrice } from "../composables/useStore.js";
import { businessInfo, paymentMethods } from "../data.js";

const emit = defineEmits(["close"]);

const { lang, t, cartItems, cartTotal, clearCart } = useStore();

const form = reactive({
  method: "pickup",
  address: "",
  name: "",
  payment: paymentMethods[0].id,
  phone: "",
  date: "",
  time: "",
  comment: "",
});

const formError = ref(false);

function whatsappLink(text) {
  const phone = businessInfo.whatsapp.replace(/[^\d]/g, "");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${phone}${query}`;
}

function submitOrder() {
  if (!form.name.trim() || !form.method || (form.method === "delivery" && !form.address.trim())) {
    formError.value = true;
    return;
  }
  formError.value = false;

  const tr = t.value;
  const lines = [];

  lines.push(`*${tr.wa_order_title} — ${businessInfo.name}*`);
  lines.push("");
  lines.push(`${tr.wa_items}:`);
  cartItems.value.forEach((line, index) => {
    const lineTotal = formatPrice(line.item.price * line.qty);
    lines.push(`${index + 1}. ${line.item.name[lang.value]} x${line.qty} = ${lineTotal} ${tr.currency}`);
  });
  lines.push("");
  lines.push(`${tr.wa_total}: ${formatPrice(cartTotal.value)} ${tr.currency}`);
  lines.push("");
  lines.push(`${tr.wa_name}: ${form.name}`);
  lines.push(`${tr.wa_method}: ${form.method === "delivery" ? tr.checkout_delivery : tr.checkout_pickup}`);
  if (form.method === "delivery") {
    lines.push(`${tr.wa_address}: ${form.address}`);
  }
  const paymentName = paymentMethods.find((p) => p.id === form.payment);
  lines.push(`${tr.wa_payment}: ${paymentName ? paymentName.name[lang.value] : form.payment}`);
  if (form.phone.trim()) {
    lines.push(`${tr.wa_phone}: ${form.phone.trim()}`);
  }
  if (form.date || form.time) {
    lines.push(`${tr.wa_datetime}: ${form.date} ${form.time}`.trim());
  }
  if (form.comment.trim()) {
    lines.push(`${tr.wa_comment}: ${form.comment.trim()}`);
  }

  const message = lines.join("\n");
  window.open(whatsappLink(message), "_blank");

  clearCart();
  emit("close");
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="modal">
      <div class="checkout-head">
        <h2>{{ t.checkout_title }}</h2>
        <button class="checkout-close" type="button" :aria-label="t.cart_close" @click="emit('close')">×</button>
      </div>

      <div class="form-group">
        <label>{{ t.checkout_delivery_method }} <span class="required-mark">*</span></label>
        <div class="co-segment">
          <button
            type="button"
            class="co-seg-btn"
            :class="{ active: form.method === 'pickup' }"
            @click="form.method = 'pickup'"
          >
            {{ t.checkout_pickup }}
          </button>
          <button
            type="button"
            class="co-seg-btn"
            :class="{ active: form.method === 'delivery' }"
            @click="form.method = 'delivery'"
          >
            {{ t.checkout_delivery }}
          </button>
        </div>
      </div>

      <div class="form-group co-delivery-only" v-if="form.method === 'delivery'">
        <label>{{ t.checkout_address }} <span class="required-mark">*</span></label>
        <input type="text" v-model="form.address" :placeholder="t.checkout_address_placeholder" />
      </div>

      <div class="form-group">
        <label>{{ t.checkout_name }} <span class="required-mark">*</span></label>
        <input type="text" v-model="form.name" :placeholder="t.checkout_name_placeholder" />
      </div>

      <div class="form-group">
        <label>{{ t.checkout_payment }}</label>
        <div class="co-banks">
          <button
            v-for="pm in paymentMethods"
            :key="pm.id"
            type="button"
            class="co-bank"
            :class="[pm.id, { active: form.payment === pm.id }]"
            @click="form.payment = pm.id"
          >
            <span class="co-dot"></span>
            {{ pm.name[lang.value] }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>{{ t.checkout_phone }}</label>
        <input type="tel" v-model="form.phone" :placeholder="t.checkout_phone_placeholder" />
      </div>

      <div class="form-group">
        <label>{{ t.checkout_date }}</label>
        <input type="date" v-model="form.date" />
      </div>

      <div class="form-group">
        <label>{{ t.checkout_time }}</label>
        <input type="time" v-model="form.time" />
      </div>

      <div class="form-group">
        <label>{{ t.checkout_comment }}</label>
        <textarea rows="3" v-model="form.comment" :placeholder="t.checkout_comment_placeholder"></textarea>
      </div>

      <p class="error-text" v-if="formError">{{ t.checkout_required }}</p>

      <button class="co-submit" type="button" @click="submitOrder">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-1.7-.85-2.81-1.51-3.93-3.43-.3-.51.3-.47.85-1.58.09-.19.05-.36-.04-.51-.1-.15-.6-1.45-.82-1.99-.22-.53-.44-.46-.61-.46-.16 0-.35-.02-.54-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.15.19 2.01 3.08 4.96 4.2 2.95 1.12 2.95.75 3.48.7.53-.05 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.19-.56-.34zM12.02 2C6.5 2 2 6.49 2 12c0 1.94.56 3.76 1.53 5.31L2 22l4.83-1.46A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.51 22 12S17.53 2 12.02 2zm0 18.18c-1.74 0-3.4-.5-4.83-1.43l-.35-.22-3.18.96.97-3.1-.23-.36A8.18 8.18 0 0 1 3.8 12c0-4.53 3.69-8.18 8.22-8.18 4.53 0 8.18 3.65 8.18 8.18 0 4.53-3.65 8.18-8.18 8.18z"/>
        </svg>
        {{ t.checkout_submit }}
      </button>
    </div>
  </div>
</template>
