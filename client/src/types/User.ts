type UserRole = "admin" | "client";

interface User {
  username: string;
  role: UserRole;
}

export type { User, UserRole };
