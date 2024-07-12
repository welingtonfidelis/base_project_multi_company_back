import { Role } from "@prisma/client";

export type CreateUserBody = {
  name: string;
  email: string;
  username: string;
  password: string;
  is_blocked: boolean;
  permissions: Role[];
};

export type UpdateUserBody = {
  id: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image_url?: string;
  image_key?: string;
  is_blocked?: "true" | "false" | boolean;
  permissions?: Role[];
  delete_image?: "true" | "false" | boolean;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type UpdatePasswordBody = {
  old_password: string;
  new_password: string;
};

export type ResetPasswordBody = {
  username: string;
  language: string;
};

export type UpdateResetedPasswordBody = {
  new_password: string;
  token: string;
};
