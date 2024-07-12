import { Role } from "@prisma/client";

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
  id: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image_url?: string;
  image_key?: string;
  is_blocked?: boolean;
  permissions?: Role[];
  delete_image?: boolean;
  file?: Express.Multer.File;
  filter_by_company_id?: number;
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

export type ListAllPayload = {
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
  filter_by_company_id?: number;
  filter_by_company_name?: string;
  include_company?: boolean;
};

export type FindUserByIdPayload = {
  id: number;
  filter_by_company_id?: number;
};

export type FindUserByUsernamePayload = {
  username: string;
  filter_by_company_id?: number;
};

export type FindUserByEmailPayload = {
  email: string;
  filter_by_company_id?: number;
};

export type FindUserByUsernameOrEmailPayload = {
  username: string;
  email: string;
  filter_by_company_id?: number;
};

export type DeleteUserByIdPayload = {
  id: number;
  filter_by_company_id?: number;
};
