import { IsNotEmpty, IsString } from "class-validator"
import { LegacyOracleNamingStrategy } from "typeorm";

export class NoteDto {
  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  content: string;
} 