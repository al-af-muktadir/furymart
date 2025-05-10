export interface IUSER {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "Admin";
  iat?: number;
  exp?: number;
}
