// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { mockApi } from '@/api/mockApi';
// import { User, Role } from '@/types';
interface User {
  id: number;
  name: string;
  email: string;
  role: string; 
  status: string;
  dateJoined: string;
}

// Define the Role type
interface Role {
  id: number;
  name: string;
}
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    roles: [] as Role[],
    total: 0,
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUsers(page: number, limit: number, filters?: any) {
      this.loading = true;
      try {
        const response = await mockApi.getUsers(page, limit, filters);
        this.users = response.data;
        this.total = response.total; // Ensure total is set
      } catch (error) {
        this.error = 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },
    async fetchUserById(id: number) {
      this.loading = true;
      try {
        this.currentUser = await mockApi.getUserById(id);
      } catch (error) {
        this.error = 'Failed to fetch user';
      } finally {
        this.loading = false;
      }
    },
    async fetchRoles() {
      this.loading = true;
      try {
        this.roles = await mockApi.getRoles();
      } catch (error) {
        this.error = 'Failed to fetch roles';
      } finally {
        this.loading = false;
      }
    },
  },
});