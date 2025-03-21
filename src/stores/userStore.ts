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
    async updateUser(user: User) {
      this.loading = true;
      try {
        await mockApi.updateUser(user); // Call the mock API to update the user
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user; // Update the user in the store
        }
      } catch (error) {
        this.error = 'Failed to update user';
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(userId: number) {
      this.loading = true;
      try {
        await mockApi.deleteUser(userId); // Call the mock API to delete the user
        this.users = this.users.filter((u) => u.id !== userId); // Remove the user from the local state
        this.total -= 1; // Update the total count
      } catch (error) {
        this.error = 'Failed to delete user';
      } finally {
        this.loading = false;
      }
    },
  },
});