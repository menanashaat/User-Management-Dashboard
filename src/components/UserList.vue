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
              <div class="card-header__export">
                <el-button type="primary" @click="exportToPDF">
                  {{ t("ExportPDF") }}
                </el-button>
              </div>
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
          </div>
          <div class="user-list__table">
            <el-table :data="filteredUsers" style="width: 100%">
              <el-table-column :label="t('name')" prop="name" sortable />
              <el-table-column :label="t('email')" prop="email" />
              <el-table-column :label="t('role')" prop="role" />
              <el-table-column :label="t('status')" prop="status" />
              <el-table-column
                :label="t('dateJoined')"
                prop="dateJoined"
                sortable
              />
              <el-table-column :label="t('actions')">
                <template #default="{ row }">
                  <el-button type="primary" @click="openEditModal(row)">
                    {{ t("editUser") }}
                  </el-button>
                  <el-button type="danger" @click="confirmDeleteHandler(row.id)">
                    {{ t("delete") }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- Edit User Modal -->
          <el-dialog
            v-model="isEditModalVisible"
            :title="t('editUserModalTitle')"
            width="30%"
          >
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
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/userStore";
import UserForm from "@/components/UserForm.vue";
import Title from "@/components/Title.vue";
import { useConfirmDelete } from "@/composables/useConfirmDelete";
import { ElMessageBox, ElMessage } from "element-plus";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const { t } = useI18n();

const userStore = useUserStore();
const users = ref([]);
const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'Editor' },
  { id: 4, name: 'Viewer' },
  { id: 5, name: 'Guest' },
]);
const filters = ref({
  name: "",
  role: "",
  status: "",
});
const currentPage = ref(1);
const total = ref(0);
const limit = 10;

const isEditModalVisible = ref(false);
const selectedUser = ref(null);

const { confirmDelete } = useConfirmDelete();

onMounted(async () => {
  await userStore.fetchRoles();
  roles.value = userStore.roles; // If roles are fetched from the backend
  await fetchUsers();
});

const fetchUsers = async () => {
  await userStore.fetchUsers(currentPage.value, limit, filters.value);
  users.value = userStore.users;
  total.value = userStore.total;
};

// Computed property for filtered users
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(filters.value.name.toLowerCase());
    const matchesRole = filters.value.role
      ? user.role === filters.value.role
      : true;
    const matchesStatus = filters.value.status
      ? user.status === filters.value.status
      : true;

    return matchesName && matchesRole && matchesStatus;
  });
});

const openEditModal = (user: any) => {
  selectedUser.value = user;
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedUser.value = null;
};

const handleEditSubmit = async (updatedUser: any) => {
  await userStore.updateUser(updatedUser);
  closeEditModal();
  ElMessage.success("User updated successfully");
  await fetchUsers();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchUsers();
};

const deleteUser = async (userId: number) => {
  await userStore.deleteUser(userId);
  await fetchUsers();
};

const confirmDeleteHandler = (userId: number) => {
  confirmDelete(async () => {
    await deleteUser(userId);
  });
};

const exportToPDF = () => {
  const doc = new jsPDF();

  // Define the columns and rows for the table
  const columns = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "role" },
    { title: "Status", dataKey: "status" },
    { title: "Date Joined", dataKey: "dateJoined" },
  ];

  const rows = filteredUsers.value.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    dateJoined: user.dateJoined,
  }));

  // Add the table to the PDF
  autoTable(doc, {
    head: [columns.map((col) => col.title)],
    body: rows.map((row) => columns.map((col) => row[col.dataKey])),
  });

  // Save the PDF
  doc.save("users.pdf");
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
  .card-header {
    display: flex;
    justify-items: center;
    align-items: center;
    &__export {
      margin-left: auto;
    }
  }
}
</style>