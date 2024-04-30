import { IsOptional } from "class-validator";

export class GroupFilterDto {
 @IsOptional()
  id?: number | number[];
}
