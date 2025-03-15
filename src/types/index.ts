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