import { NextFunction, Request, Response, Router } from "express";
import { companyRouter } from "./api/routes/companies";

import { userNoAuthRouter, userRouter } from "./api/routes/users";
import { authValidate } from "./shared/middleware/authValidate";
import { healthRouter } from "./api/routes/health";
import { httpMessageRouter } from "./api/routes/httpMessages";
import { permissionRouter } from "./api/routes/permissions";

const router = Router();

// NO AUTHENTICATED ROUTES
router.use(healthRouter);
router.use(userNoAuthRouter);

// AUTHENTICATED ROUTES
router.use(authValidate);
router.use(httpMessageRouter); // no role requested
router.use(userRouter); // ADMIN/MANAGER role requested below
router.use(permissionRouter);
router.use(companyRouter); // only ADMIN role can access below

// ERROR HANDLER
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.code || 500;
  const errorMessage = error?.message || "Internal server error";

  res.status(statusCode).json({ message: errorMessage });
});

export { router };
