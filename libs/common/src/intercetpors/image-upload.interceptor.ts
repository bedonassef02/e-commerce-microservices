import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageConfig } from '@app/common/utils/files/utils/storage-config.util';
import * as bytes from 'bytes';
import {
  FileSizeType,
  FileType,
} from '@app/common/utils/files/types/file.types';
import { NonEmptyArray } from '@app/common/utils/files/utils/array.util';
import { validateFileType } from '@app/common/utils/files/validtors/validate-file-type';

export function imageUploadInterceptor(
  fields: any,
  maxSize: FileSizeType,
  fileTypes: NonEmptyArray<FileType>,
) {
  return FileFieldsInterceptor(fields, {
    storage: storageConfig(),
    limits: {
      fileSize: bytes(maxSize),
    },
    fileFilter: (req, file: any, cb) => validateFileType(file, fileTypes, cb),
  });
}
