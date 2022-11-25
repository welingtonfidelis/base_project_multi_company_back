import { prisma } from "../../dbCLient";
import {
  CreateUserData,
  DeleteUserByIdData,
  FindUserByIdData,
  ListAllIgnoreIdData,
  UpdateUserData,
} from "./types";

const userRepository = {
  findByUserName(username: string) {
    return prisma.user.findFirst({
      where: { username },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  },

  findByUserNameOrEmail(username: string, email: string) {
    return prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
  },

  findById(data: FindUserByIdData) {
    const { id, company_id } = data;
    return prisma.user.findFirst({ where: { AND: [{ company_id }, { id }] } });
  },

  updateById(payload: UpdateUserData) {
    const { id, company_id, ...data } = payload;
    return prisma.user.updateMany({
      where: { AND: [{ company_id }, { id }] },
      data,
    });
  },

  create(data: CreateUserData) {
    return prisma.user.create({ data });
  },

  async listAllIgnoreId(payload: ListAllIgnoreIdData) {
    const {
      company_id,
      logged_user_id,
      page,
      limit,
      filter_by_id,
      filter_by_name,
    } = payload;
    const offset = (page - 1) * limit;

    const where: any = { AND: [{ company_id }] };

    if (filter_by_id && filter_by_id !== logged_user_id) {
      where.AND.push({ id: filter_by_id });
    } else where.AND.push({ id: { not: logged_user_id } });

    if (filter_by_name) {
      where.AND.push({
        name: { contains: filter_by_name, mode: "insensitive" },
      });
    }

    const total = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        name: "asc",
      },
    });

    return { users, total };
  },

  deleteById(data: DeleteUserByIdData) {
    const { company_id, id } = data;
    return prisma.user.deleteMany({ where: { AND: [{ company_id }, { id }] } });
  },
};

export { userRepository };
