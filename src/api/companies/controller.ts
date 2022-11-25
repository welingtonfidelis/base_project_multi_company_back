import { Request, Response } from "express";

import { companyService } from "./service";
import { CreateCompanyBody, UpdateCompanyBody, UpdateCompanyPayload } from "./types";
import { HttpMessageEnum } from "../../shared/enum/httpMessage";

const {
  createCompanyService,
  listCompaniesService,
  getCompanyByIdService,
  getCompanyByNameKeyService,
  getCompanyByEmailService,
  updateCompanyService,
} = companyService;

const {
  CAN_NOT_BLOCK_YOURSELF_COMPANY,
  NAME_ALREADY_USED,
  EMAIL_ALREADY_USED,
} = HttpMessageEnum;

const companyController = {
  async create(req: Request, res: Response) {
    const body = req.body as CreateCompanyBody;
    const { file } = req;

    let selectedCompany = await getCompanyByNameKeyService(body.name);

    if (selectedCompany) {
      return res
        .status(NAME_ALREADY_USED.code)
        .json({ message: NAME_ALREADY_USED.message });
    }

    selectedCompany = await getCompanyByEmailService(body.email);

    if (selectedCompany) {
      return res
        .status(EMAIL_ALREADY_USED.code)
        .json({ message: EMAIL_ALREADY_USED.message });
    }

    const newCompany = await createCompanyService({ ...body, is_blocked: body.is_blocked === 'true', file });

    const { company, user } = newCompany;
    const { id: company_id } = company;
    const { id: user_id, username, email, password } = user;

    return res.json({ company_id, user_id, username, email, password });
  },

  async list(req: Request, res: Response) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const filter_by_name = req.query.filter_by_name
      ? (req.query.filter_by_name as string)
      : undefined;

    const companies = await listCompaniesService({
      page,
      limit,
      filter_by_name,
    });
    const response = {
      ...companies,
      companies: companies.companies.map((item) => {
        const { updated_at, ...rest } = item;
        return rest;
      }),
    };

    return res.json(response);
  },

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const selectedUser = await getCompanyByIdService(id);

    if (!selectedUser) return res.status(404).json({});

    const { updated_at, ...rest } = selectedUser;

    return res.json(rest);
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { company_id: loggedUserCompanyId } = req.authenticated_user;
    const body = req.body as UpdateCompanyBody;
    const { file } = req;
    const { is_blocked, name, email } = body;

    if (is_blocked && id === loggedUserCompanyId) {
      return res
        .status(CAN_NOT_BLOCK_YOURSELF_COMPANY.code)
        .json({ message: CAN_NOT_BLOCK_YOURSELF_COMPANY.message });
    }

    if (name) {
      const selectedCompany = await getCompanyByNameKeyService(name);

      if (selectedCompany && selectedCompany.id !== id) {
        return res
          .status(NAME_ALREADY_USED.code)
          .json({ message: NAME_ALREADY_USED.message });
      }
    }

    if (email) {
      const selectedCompany = await getCompanyByEmailService(email);

      if (selectedCompany && selectedCompany.id !== id) {
        return res
          .status(EMAIL_ALREADY_USED.code)
          .json({ message: EMAIL_ALREADY_USED.message });
      }
    }

    const payload = { ...body, id } as UpdateCompanyPayload;

    if (body.is_blocked) payload.is_blocked = body.is_blocked === 'true';

    await updateCompanyService({ ...payload, file });

    return res.status(204).json({});
  },
};

export { companyController };
