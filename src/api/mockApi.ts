
// Define the User type
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  dateJoined: string;
}

// Define the Role type
export interface Role {
  id: number;
  name: string;
}
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Inactive', dateJoined: '2023-02-15' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Editor', status: 'Active', dateJoined: '2023-03-10' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Viewer', status: 'Active', dateJoined: '2023-04-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'Inactive', dateJoined: '2023-05-20' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'Manager', status: 'Active', dateJoined: '2023-06-15' },
  { id: 7, name: 'Ethan Foster', email: 'ethan@example.com', role: 'Editor', status: 'Active', dateJoined: '2023-07-08' },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Viewer', status: 'Inactive', dateJoined: '2023-08-25' },
  { id: 9, name: 'George Harris', email: 'george@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-09-12' },
  { id: 10, name: 'Hannah Irving', email: 'hannah@example.com', role: 'Manager', status: 'Active', dateJoined: '2023-10-30' },
  { id: 11, name: 'Isaac Jackson', email: 'isaac@example.com', role: 'Editor', status: 'Inactive', dateJoined: '2023-11-21' },
  { id: 12, name: 'Julia King', email: 'julia@example.com', role: 'Viewer', status: 'Active', dateJoined: '2023-12-11' },
  { id: 13, name: 'Kevin Lewis', email: 'kevin@example.com', role: 'Admin', status: 'Active', dateJoined: '2024-01-02' },
  { id: 14, name: 'Laura Martinez', email: 'laura@example.com', role: 'Manager', status: 'Inactive', dateJoined: '2024-02-14' },
  { id: 15, name: 'Michael Nelson', email: 'michael@example.com', role: 'Editor', status: 'Active', dateJoined: '2024-03-22' },
  { id: 16, name: 'Nancy Owens', email: 'nancy@example.com', role: 'Viewer', status: 'Active', dateJoined: '2024-04-10' },
  { id: 17, name: 'Oliver Parker', email: 'oliver@example.com', role: 'Admin', status: 'Inactive', dateJoined: '2024-05-05' },
  { id: 18, name: 'Paula Quinn', email: 'paula@example.com', role: 'Manager', status: 'Active', dateJoined: '2024-06-01' },
  { id: 19, name: 'Quentin Roberts', email: 'quentin@example.com', role: 'Editor', status: 'Active', dateJoined: '2024-07-18' },
  { id: 20, name: 'Rachel Scott', email: 'rachel@example.com', role: 'Viewer', status: 'Inactive', dateJoined: '2024-08-28' },
  // Adding 60 more users
  ...Array.from({ length: 60 }, (_, i) => ({
    id: 21 + i,
    name: `User ${21 + i}`,
    email: `user${21 + i}@example.com`,
    role: ['Admin', 'Manager', 'Editor', 'Viewer'][Math.floor(Math.random() * 4)],
    status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)],
    dateJoined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
  }))
];


const roles: Role[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'Viewer' },
];

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300));

export const mockApi = {
  async getUsers(page: number, limit: number, filters?: any): Promise<{ data: User[]; total: number }> {
    await simulateLatency();
    const filteredUsers = users.filter((user) => {
      if (filters?.name && !user.name.includes(filters.name)) return false;
      if (filters?.role && user.role !== filters.role) return false;
      if (filters?.status && user.status !== filters.status) return false;
      return true;
    });
    const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);
    return { data: paginatedUsers, total: filteredUsers.length };
  },
  async updateUser(user: User): Promise<void> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find and update the user
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user; // Update the user in the mock data
    }
  },
  async deleteUser(userId: number): Promise<void> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find and delete the user
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1); // Remove the user from the mock data
    }
  },
};