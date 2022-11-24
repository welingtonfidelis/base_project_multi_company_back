import { Router } from "express";
import multer from "multer";

import { companyController } from "./controller";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import {
  getByIdSchema,
  listSchema,
  updateSchema,
  createSchema,
} from "./midleware/requestPayloadValidateSchema";
import { permissionValidate } from "../../shared/middleware/permissionValidate";
import { Role } from "@prisma/client";

const { ADMIN } = Role;

const companyRouter = Router();
const { list, getById, update, create } = companyController;

// AUTHENTICATED ROUTES
// ROUTES WITH PERMISSION VALIDATE
companyRouter.use(permissionValidate([ADMIN]));

companyRouter.get("/companies", payloadValidate(listSchema), list);
companyRouter.get("/companies/:id", payloadValidate(getByIdSchema), getById);
companyRouter.patch(
  "/companies/:id",
  [multer().single("file"), payloadValidate(updateSchema)],
  update
);
companyRouter.post(
  "/companies",
  [multer().single("file"), payloadValidate(createSchema)],
  create
);

export { companyRouter };
