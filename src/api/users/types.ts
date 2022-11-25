import { Role, User } from "@prisma/client";

// CONTROLLER
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
  is_blocked?: "true" | "false";
  permissions?: Role[]
  delete_image?: "true" | "false";
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

// SERVICE
export type CreateUserPayload = {
  company_id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  is_blocked: boolean;
  permissions: Role[];
};

export type UpdateUserPayload = {
  company_id: number;
  id: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image_url: string;
  image_key: string;
  is_blocked?: boolean;
  permissions?: Role[]
  delete_image?: boolean;
  file?: Express.Multer.File;
};

export type UpdatePasswordPayload = {
  id: number;
  company_id: number;
  new_password: string;
};

export type ResetPasswordPayload = {
  id: number;
  company_id: number;
  language: string;
  name: string;
  email: string;
};

export type UpdateResetedPasswordPayload = {
  id: number;
  new_password: string;
};

export type ListAllIgnoreIdPayload = {
  company_id: number;
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
};

export type FindUserByIdPayload = {
  id: number;
  company_id: number;
}

export type DeleteUserByIdPayload = {
  id: number;
  company_id: number;
}

// REPOSITORY
export type CreateUserData = {
  company_id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  image_url: string;
  image_key: string;
  is_blocked: boolean;
  permissions: Role[];
};

export type UpdateUserData = {
  company_id: number;
  id: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image_url?: string;
  image_key?: string;
  is_blocked?: boolean;
  permissions?: Role[]
};

export type FindUserByIdData = {
  id: number;
  company_id: number;
}

export type ListAllIgnoreIdData = {
  company_id: number;
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
};

export type DeleteUserByIdData = {
  id: number;
  company_id: number;
}