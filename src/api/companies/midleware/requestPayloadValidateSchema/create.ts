import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  is_blocked: Joi.string().valid('true', 'false').required(),
});

export { createSchema };
