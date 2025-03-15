<template>
  <div class="language">
    <el-select v-model="selectedLanguage" @change="changeLanguage">
    <el-option
      v-for="language in languages"
      :key="language.value"
      :label="language.label"
      :value="language.value"
    />
  </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
];

const changeLanguage = (lang: string) => {
  locale.value = lang; // Update the locale
};
</script>
<style scoped>
.language{
  width: 6rem;
}
</style>