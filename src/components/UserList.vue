<template>
  <div class="user-list">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <Title
                title="Team Members"
                description="Manage your team members and their account permissions here"
              />
            </div>
          </template>

          <div class="user-list__filters">
            <el-input
              v-model="filters.name"
              placeholder="Search by name"
              clearable
            />
            <el-select
              v-model="filters.role"
              placeholder="Select role"
              clearable
            >
              <el-option label="All Roles" value="" />
              <el-option
                v-for="role in roles"
                :key="role.id"
                :label="role.name"
                :value="role.name"
              />
            </el-select>
            <el-select
              v-model="filters.status"
              placeholder="Select status"
              clearable
            >
              <el-option label="All Statuses" value="" />
              <el-option label="Active" value="Active" />
              <el-option label="Inactive" value="Inactive" />
            </el-select>
            <el-button type="primary" @click="fetchUsers"
              >Apply Filters</el-button
            >
          </div>
          <div class="user-list__table">
            <el-table :data="users" style="width: 100%">
              <el-table-column prop="name" label="Name" sortable />
              <el-table-column prop="email" label="Email" />
              <el-table-column prop="role" label="Role" />
              <el-table-column prop="status" label="Status" />
              <el-table-column prop="dateJoined" label="Date Joined" sortable />
              <el-table-column label="Actions">
                <template #default="{ row }">
                  <el-button type="primary" @click="openEditModal(row)"
                    >Edit</el-button
                  >
                  <el-button type="danger" @click="confirmDeleteHandler(row.id)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- Edit User Modal -->
          <el-dialog v-model="isEditModalVisible" title="Edit User" width="30%">
            <UserForm
              v-if="selectedUser"
              :user="selectedUser"
              @submit="handleEditSubmit"
              @cancel="closeEditModal"
            />
          </el-dialog>
          <div class="user-list__pagination">
            <el-pagination
              background
              :current-page="currentPage"
              :page-size="limit"
              :total="total"
              layout="prev, pager, next"
              @current-change="handlePageChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserForm from "@/components/UserForm.vue"; // Import the UserForm component
import Title from "@/components/Title.vue"; // Import the UserForm component
import { useConfirmDelete } from "@/composables/useConfirmDelete"; // Import the composable
import { ElMessageBox, ElMessage } from "element-plus";

const userStore = useUserStore();
const users = ref([]);
const roles = ref([]);
const filters = ref({
  name: "",
  role: "",
  status: "",
});
const currentPage = ref(1);
const total = ref(0);
const limit = 10;

const isEditModalVisible = ref(false); // Control modal visibility
const selectedUser = ref(null); // Store the selected user for editing

const { confirmDelete } = useConfirmDelete(); // Use the composable

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

// Open the edit modal and set the selected user
const openEditModal = (user: any) => {
  selectedUser.value = user;
  isEditModalVisible.value = true;
};

// Close the edit modal
const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedUser.value = null;
};

// Handle form submission
const handleEditSubmit = async (updatedUser: any) => {
  await userStore.updateUser(updatedUser); // Update the user in the store
  closeEditModal(); // Close the modal
  ElMessage.success("User updated successfully");
  await fetchUsers(); // Refresh the user list
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchUsers();
};

// Delete Confirmation Dialog
const deleteUser = async (userId: number) => {
  await userStore.deleteUser(userId);
  await fetchUsers(); // Refresh the user list
};
const confirmDeleteHandler = (userId: number) => {
  confirmDelete(async () => {
    await deleteUser(userId);
  });
};
</script>

<style scoped lang="scss">
.user-list {
  &__filters {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  &__pagination {
    margin-top: 1rem;
  }
}
</style>
