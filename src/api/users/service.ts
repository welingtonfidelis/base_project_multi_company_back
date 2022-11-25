import bcrypt from "bcryptjs";
import fs from "fs";
import handlebars from "handlebars";
import { resolve } from "path";

import { config } from "../../config";
import { deleteFile, uploadImage } from "../../shared/service/file";
import { sendMail } from "../../shared/service/mail";
import { createToken } from "../../shared/service/token";
import { userRepository } from "./repository";
import {
  CreateUserPayload,
  DeleteUserByIdPayload,
  FindUserByIdPayload,
  ListAllIgnoreIdPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateUserData,
  UpdateUserPayload,
} from "./types";

const {
  findByUserName,
  findByEmail,
  findById,
  findByUserNameOrEmail,
  updateById,
  listAllIgnoreId,
  deleteById,
  create,
} = userRepository;

const { ENCRYPT_SALT, SOURCE_EMAIL, URL_FRONT_RESET_PASSWORD, JSON_SECRET } =
  config;

const userService = {
  getUserByIdService(payload: FindUserByIdPayload) {
    return findById(payload);
  },

  getUserByUsernameService(username: string) {
    return findByUserName(username);
  },

  getUserByEmailService(email: string) {
    return findByEmail(email);
  },

  getUserByUsernameOrEmailService(username: string, email: string) {
    return findByUserNameOrEmail(username, email);
  },

  async updateUserService(payload: UpdateUserPayload) {
    const { id, company_id,  file, delete_image } = payload;

    if (file) {
      const { Location, Key } = await uploadImage(
        file,
        "profile",
        `user_${id}`
      );

      payload.image_url = Location;
      payload.image_key = Key;
    } else if (delete_image) {
      const selectedUser = await findById({ id, company_id });

      if (selectedUser && selectedUser.image_key) {
        await deleteFile(selectedUser.image_key);
      }

      payload.image_url = "";
      payload.image_key = "";
    }

    if (payload.password) {
      payload.password = bcrypt.hashSync(payload.password, ENCRYPT_SALT);
    }

    delete payload.delete_image;
    delete payload.file;

    return updateById(payload as UpdateUserData);
  },

  async createUserService(payload: CreateUserPayload) {
    const password = bcrypt.hashSync(payload.password, ENCRYPT_SALT);
    const image_url = "";
    const image_key = "";

    const newUser = await create({
      ...payload,
      password,
      image_url,
      image_key,
    });

    return { ...newUser, password: payload.password };
  },

  async updateUserPasswordService(payload: UpdatePasswordPayload) {
    const { id, company_id, new_password } = payload;

    const password = bcrypt.hashSync(new_password, ENCRYPT_SALT);
    return updateById({ id, company_id, password });
  },

  async resetUserPasswordService(payload: ResetPasswordPayload) {
    const { id, company_id, name, email, language } = payload;

    const htmlTemplatePath = resolve(
      __dirname,
      "..",
      "..",
      "shared",
      "view",
      "html",
      language,
      "resetPassword.hbs"
    );
    const token = createToken({ id, company_id }, JSON_SECRET, 15);
    const htmlTemplate = fs.readFileSync(htmlTemplatePath).toString("utf8");
    const html = handlebars.compile(htmlTemplate)({
      name,
      link: `${URL_FRONT_RESET_PASSWORD}?token=${token}`,
    });

    return sendMail({
      from: SOURCE_EMAIL,
      to: [email],
      subject: "reset password",
      message: html,
    });
  },

  listUsersService(payload: ListAllIgnoreIdPayload) {
    return listAllIgnoreId(payload);
  },

  deleteUserService(payload: DeleteUserByIdPayload) {
    return deleteById(payload);
  },
};

export { userService };
