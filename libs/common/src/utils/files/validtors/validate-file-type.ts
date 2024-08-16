import { NonEmptyArray } from '@app/common/utils/files/utils/array.util';
import { FileType } from '@app/common/utils/files/types/file.types';
import { BadRequestException } from '@nestjs/common';

export const validateFileType = (
  file: {
    mimetype: string;
    originalname: string;
  },
  allowedTypes: NonEmptyArray<FileType>,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const mimeTypePattern = new RegExp(`\/(${allowedTypes.join('|')})$`, 'i');
  if (mimeTypePattern.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        `Only ${allowedTypes.join(', ').toUpperCase()} files are allowed!`,
      ),
      false,
    );
  }
};
