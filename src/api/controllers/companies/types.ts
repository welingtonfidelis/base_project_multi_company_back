export type CreateCompanyBody = {
  name: string;
  email: string;
  phone: string;
  is_blocked: "true" | "false" | boolean;
};

export type UpdateCompanyBody = {
  name?: string;
  email?: string;
  phone?: string;
  delete_image?: "true" | "false" | boolean;
  is_blocked?: "true" | "false" | boolean;
};
