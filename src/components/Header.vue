<template>
  <div class="flex flex-wrap gap-4">
    <header>
      <div class="header-content">
        <h1 class="header-content__item">My App</h1>
        <div class="switchers header-content__item">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
</script>

<style lang="scss">
header {
  background-color: var(--background-color);
  color: var(--text-color);
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}
.header-content {
  padding: 0 1rem;
  display: flex;
  justify-items: center;
  &__item {
    flex: 1;
  }
  .switchers {
    display: flex;
    justify-items: center;
    align-self: center;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  .el-card__body {
    padding: 0;
  }
}
</style>
