import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export function uploadCoverImage(
  size: number = 10,
  fileType: string = 'image/jpeg|image/png',
) {
  const maxSize = 1024 * 1024 * size;
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize }),
      new FileTypeValidator({ fileType }),
    ],
  });
}
