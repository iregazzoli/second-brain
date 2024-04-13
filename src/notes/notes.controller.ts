import { Body, Controller, Post } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  // @Post()
  // create(@Body('tags') tags: string, @Body('content') content: string) {
  //   return this.notesService.createNote(tags, content);
  // }

}
