import { Role } from "@prisma/client";

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
  id: number;
  filter_by_company_id?: number;
  company_id?: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image_url?: string;
  image_key?: string;
  is_blocked?: boolean;
  permissions?: Role[];
};

export type FindUserByIdData = {
  id: number;
  filter_by_company_id?: number;
};

export type FindUserByUsernameData = {
  username: string;
  filter_by_company_id?: number;
};

export type FindUserByEmailData = {
  email: string;
  filter_by_company_id?: number;
};

export type FindUserByUsernameOrEmailData = {
  username: string;
  email: string;
  filter_by_company_id?: number;
};

export type ListAllData = {
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
  filter_by_company_id?: number;
  filter_by_company_name?: string;
  include_company?: boolean;
};

export type DeleteUserByIdData = {
  id: number;
  filter_by_company_id?: number;
};
