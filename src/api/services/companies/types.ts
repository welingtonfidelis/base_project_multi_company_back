export type CreateCompanyPayload = {
  name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
  file?: Express.Multer.File;
};

export type UpdateCompanyPayload = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  image_key?: string;
  name_key?: string;
  delete_image?: boolean;
  is_blocked?: boolean;
  file?: Express.Multer.File;
};

export type ListAllPayload = {
  page: number;
  limit: number;
  filter_by_name?: string;
};
