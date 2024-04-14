import { Body, Controller, Post, UnauthorizedException, UseGuards, Headers, Delete, Param, Patch } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { NoteDto, UpdateNoteDto } from './dto';
import { UsersService } from '../users/users.service';


@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private readonly usersService: UsersService,
  ) {}

  private extractTokenFromHeader(authHeader: string): string {
    return authHeader && authHeader.split(' ')[1]; // Bearer <token>
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Headers('authorization') authHeader: string, @Body() createNoteDto: NoteDto) {
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);
  
    if (!user) 
      throw new UnauthorizedException();
    
  
    const note = await this.notesService.createNote(user, createNoteDto);
    return note;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Headers('authorization') authHeader: string, @Param('id') noteId: number) {
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);

    if (!user) 
      throw new UnauthorizedException();
    

    await this.notesService.deleteNote(noteId);
    return { message: 'Note deleted successfully' };
}

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTags(@Headers('authorization') authHeader: string, @Param('id') noteId: number,
  @Body() updateNoteDto: UpdateNoteDto) {
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);

    if (!user) 
      throw new UnauthorizedException();

    const updatedNote = await this.notesService.updateTags(noteId, updateNoteDto.tags);
    return updatedNote;
  }


}
