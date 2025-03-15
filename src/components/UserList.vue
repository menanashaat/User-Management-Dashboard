<template>
  <div class="user-list">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <Title 
                :title="t('teamMembersTitle')"
                :description="t('teamMembersDescription')"
              />
              <LanguageSwitcher />
            </div>
          </template>

          <div class="user-list__filters">
            <el-input
              v-model="filters.name"
              :placeholder="t('searchByName')"
              clearable
            />
            <el-select
              v-model="filters.role"
              :placeholder="t('selectRole')"
              clearable
            >
              <el-option :label="t('allRoles')" value="" />
              <el-option
                v-for="role in roles"
                :key="role.id"
                :label="role.name"
                :value="role.name"
              />
            </el-select>
            <el-select
              v-model="filters.status"
              :placeholder="t('selectStatus')"
              clearable
            >
              <el-option :label="t('allStatuses')" value="" />
              <el-option :label="t('active')" value="Active" />
              <el-option :label="t('inactive')" value="Inactive" />
            </el-select>
            <el-button type="primary" @click="fetchUsers">
              {{ t('applyFilters') }}
            </el-button>
          </div>
          <div class="user-list__table">
            <el-table :data="users" style="width: 100%">
              <el-table-column :label="t('name')" prop="name" sortable />
              <el-table-column :label="t('email')" prop="email" />
              <el-table-column :label="t('role')" prop="role" />
              <el-table-column :label="t('status')" prop="status" />
              <el-table-column :label="t('dateJoined')" prop="dateJoined" sortable />
              <el-table-column :label="t('actions')">
                <template #default="{ row }">
                  <el-button type="primary" @click="openEditModal(row)">
                    {{ t('editUser') }}
                  </el-button>
                  <el-button type="danger" @click="confirmDeleteHandler(row.id)">
                    {{ t('delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- Edit User Modal -->
          <el-dialog v-model="isEditModalVisible" :title="t('editUserModalTitle')" width="30%">
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
import { useI18n } from 'vue-i18n'; // Import useI18n
import { useUserStore } from "@/stores/userStore";
import UserForm from "@/components/UserForm.vue"; // Import the UserForm component
import Title from "@/components/Title.vue"; // Import the UserForm component
import { useConfirmDelete } from "@/composables/useConfirmDelete"; // Import the composable
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { ElMessageBox, ElMessage } from "element-plus";

const { t } = useI18n(); // Use the Composition API

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
