import { IsOptional } from "class-validator";

export class PostFilterDto {
 @IsOptional()
  id?: number | number[];
}
