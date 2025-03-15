<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import HomeView from "@/views/HomeView.vue";
import Header from "@/components/Header.vue";

const { locale } = useI18n();
const isRTL = ref(locale.value === "ar"); // Check if the current locale is Arabic

// Watch for locale changes and update the RTL state
watch(locale, (newLocale) => {
  isRTL.value = newLocale === "ar";
  document.documentElement.dir = isRTL.value ? "rtl" : "ltr"; // Update the HTML direction
});

const theme = ref(localStorage.getItem("theme") || "light");

// Initialize theme on app load
document.documentElement.setAttribute("data-theme", theme.value);
</script>

<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'" :class="theme">
    <Header />
    <HomeView />
  </div>
</template>

<style >

</style>
