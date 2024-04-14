import { IsNotEmpty, IsString } from "class-validator"

export class NoteDto {
  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  content: string;
} 