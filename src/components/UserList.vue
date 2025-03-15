<template>
    <div>
      <div class="filters">
        <el-input v-model="filters.name" placeholder="Search by name" clearable />
        <el-select v-model="filters.role" placeholder="Select role" clearable>
          <el-option label="All Roles" value="" />
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.name" />
        </el-select>
        <el-select v-model="filters.status" placeholder="Select status" clearable>
          <el-option label="All Statuses" value="" />
          <el-option label="Active" value="Active" />
          <el-option label="Inactive" value="Inactive" />
        </el-select>
        <el-button type="primary" @click="fetchUsers">Apply Filters</el-button>
      </div>
  
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="Name" sortable />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="dateJoined" label="Date Joined" sortable />
        <el-table-column label="Actions">
          <template #default="{ row }">
            <el-button type="primary" @click="editUser(row.id)">Edit</el-button>
            <el-button type="danger" @click="deleteUser(row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-pagination
        :current-page="currentPage"
        :page-size="limit"
        :total="total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  
  const userStore = useUserStore();
  const users = ref([]);
  const roles = ref([]);
  const filters = ref({
    name: '',
    role: '',
    status: '',
  });
  const currentPage = ref(1);
  const total = ref(0);
  const limit = 10;
  
  onMounted(async () => {
    await userStore.fetchRoles();
    roles.value = userStore.roles;
    await fetchUsers();
  });
  
  const fetchUsers = async () => {
    await userStore.fetchUsers(currentPage.value, limit, filters.value);
    users.value = userStore.users;
    total.value = userStore.total;
  };
  
  const editUser = (id: number) => {
    // Navigate to the user detail view
    console.log(`Editing user with ID: ${id}`);
  };
  
  const deleteUser = (id: number) => {
    // Implement delete logic here
    console.log(`Deleting user with ID: ${id}`);
  };
  
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchUsers();
  };
  </script>
  
  <style scoped>
  .filters {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  </style>