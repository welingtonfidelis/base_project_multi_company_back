export type CreateCompanyData = {
  name: string;
  name_key: string;
  email: string;
  phone: string;
  image_url: string;
  image_key: string;
  is_blocked: boolean;
};

export type UpdateCompanyData = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  image_key?: string;
  is_blocked?: boolean;
};

export type ListAllData = {
  page: number;
  limit: number;
  filter_by_name?: string;
};
