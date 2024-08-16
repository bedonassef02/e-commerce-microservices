import * as bytes from 'bytes';
import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import { FileSizeType, FileType } from './types/file.types';
import { createFileTypeRegex } from './utils/file.util';
import { NonEmptyArray } from '@app/common/utils/files/utils/array.util';
import { FileSignatureValidator } from '@app/common/utils/files/validtors/file-signature.validator';

const createFileValidators = (
  maxSize: FileSizeType,
  fileTypes: NonEmptyArray<FileType>,
): FileValidator[] => {
  const fileTypeRegex = createFileTypeRegex(fileTypes);
  return [
    new MaxFileSizeValidator({
      maxSize: bytes(maxSize),
      message: (maxSize) =>
        `File is too big. Max file size is ${maxSize} bytes`,
    }),
    new FileTypeValidator({
      fileType: fileTypeRegex,
    }),
    new FileSignatureValidator(),
  ];
};

export const createParseFilePipe = (
  maxSize: FileSizeType,
  fileTypes: NonEmptyArray<FileType>,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidators(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
  });
