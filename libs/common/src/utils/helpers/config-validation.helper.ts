import * as Joi from 'joi';
import { validationSchema } from '@app/common/utils/validation';

export function configValidation(validation: any = validationSchema) {
  return Joi.object(validation);
}
