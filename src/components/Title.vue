<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="card-header">
    <el-descriptions :title="title">
      <el-descriptions-item>{{ description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>
