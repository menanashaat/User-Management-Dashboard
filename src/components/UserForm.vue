<template>
    <el-form :model="form" label-width="120px" @submit.prevent="handleSubmit">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role">
          <el-option label="Admin" value="Admin" />
          <el-option label="Manager" value="Manager" />
          <el-option label="Viewer" value="Viewer" />
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="form.status">
          <el-option label="Active" value="Active" />
          <el-option label="Inactive" value="Inactive" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['submit', 'cancel']);
  
  // Initialize the form with the user's data
  const form = ref({
    id: props.user.id,
    name: props.user.name,
    email: props.user.email,
    role: props.user.role,
    status: props.user.status,
  });
  
  // Watch for changes in the user prop (in case it changes)
  watch(
    () => props.user,
    (newUser) => {
      form.value = { ...newUser };
    },
    { immediate: true }
  );
  
  // Handle form submission
  const handleSubmit = () => {
    emit('submit', form.value);
  };
  
  // Handle cancel
  const cancel = () => {
    emit('cancel');
  };
  </script>