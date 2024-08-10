import * as Joi from 'joi';
import { mongoValidation } from '@app/common/utils/validation/utils/mongo-db.validation';

export const userValidation = {
  ...mongoValidation
}