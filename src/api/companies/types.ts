import { Company } from "@prisma/client";

// CONTROLLER
export type CreateCompanyBody = {
  name: string;
  email: string;
  phone: string;
  is_blocked: "true" | "false";
};

export type UpdateCompanyBody = Partial<Company> & {
  delete_image?: "true" | "false";
  is_blocked?: "true" | "false";
};

// SERVICE
export type CreateCompanyPayload = {
  name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
  file?: Express.Multer.File;
};

export type UpdateCompanyPayload = Partial<Company> & {
  id: number;
  delete_image?: boolean;
  is_blocked?: boolean;
  file?: Express.Multer.File;
};

export type ListAllPayload = {
  page: number;
  limit: number;
  filter_by_name?: string;
};

// REPOSITORY
export type CreateCompanyData = {
  name: string;
  name_key: string;
  email: string;
  phone: string;
  image_url: string;
  image_key: string;
  is_blocked: boolean;
};

export type UpdateCompanyData = Partial<Company> & {
  id: number;
};

export type ListAllData = {
  page: number;
  limit: number;
  filter_by_name?: string;
};
