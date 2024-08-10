import { mongoValidation } from '@app/common/utils/validation/utils/mongo-db.validation';
import { sqlValidation } from '@app/common/utils/validation/utils/sql-db.validation';
import { paymentValidation } from '@app/common/utils/validation/services/payment.validation';
import { authValidation } from '@app/common/utils/validation/services/auth.validation';
import { userValidation } from '@app/common/utils/validation/services/user.validation';
import * as Joi from 'joi';

export const validationSchema = {
  ...mongoValidation,
  ...sqlValidation,
  ...userValidation,
  ...authValidation,
  ...paymentValidation,

  // Application
  APP_URL: Joi.string().uri().required(),

  // Nest Debug
  NEST_DEBUG: Joi.boolean().optional(),
}