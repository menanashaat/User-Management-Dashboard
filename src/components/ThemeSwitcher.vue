<template>
    <div>
      <el-switch
        v-model="isDarkMode"
        active-text="Dark"
        inactive-text="Light"
        @change="toggleTheme"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  
  const theme = ref(localStorage.getItem("theme") || "light");
  const isDarkMode = ref(theme.value === "dark");
  
  const toggleTheme = () => {
    theme.value = isDarkMode.value ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
    document.documentElement.setAttribute("data-theme", theme.value);
  };
  
  // Sync theme state if localStorage changes externally
  watch(theme, (newTheme) => {
    isDarkMode.value = newTheme === "dark";
  });
  </script>
  