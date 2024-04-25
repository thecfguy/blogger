import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
 

class postDto{
    @IsNotEmpty()
    @IsNumber()
    id:number
}
export class CommentFilterDto {
    @IsOptional()
    id?: number | number[];

    @IsOptional()
    @ValidateNested()
    @Type(()=>postDto)
    post?: postDto
}