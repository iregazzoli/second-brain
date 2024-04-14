import {  IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}