<script setup lang="ts">
import HomeView from "@/views/HomeView.vue";
import { ref, watch } from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isRTL = ref(locale.value === 'ar'); // Check if the current locale is Arabic

// Watch for locale changes and update the RTL state
watch(locale, (newLocale) => {
  isRTL.value = newLocale === 'ar';
  document.documentElement.dir = isRTL.value ? 'rtl' : 'ltr'; // Update the HTML direction
});
</script>

<template>
    <div :dir="isRTL ? 'rtl' : 'ltr'">

  <HomeView />
  </div>
</template>

<style scoped></style>
