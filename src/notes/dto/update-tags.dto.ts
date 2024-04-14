import {  IsNotEmpty, IsString } from 'class-validator';

export class UpdateTagsDto {
  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}