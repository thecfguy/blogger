import { PartialType } from '@nestjs/mapped-types';
import { PhotoDto } from './photo.dto';

export class UpdatePhotoDto extends PartialType(PhotoDto) {}
