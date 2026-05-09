export type UserRole = "ADMIN" | "EDITOR";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};
