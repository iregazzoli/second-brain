import { Body, Controller, Post, UnauthorizedException, UseGuards, Headers, Delete, Param, Patch, Get } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { NoteDto, UpdateTagsDto, UpdateContentDto } from './dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';


@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private readonly usersService: UsersService,
  ) {}

  private extractTokenFromHeader(authHeader: string): string {
    return authHeader && authHeader.split(' ')[1]; // Bearer <token>
  }

  private async getUserFromToken(authHeader: string): Promise<User> {
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);

    if (!user) 
      throw new UnauthorizedException();

    return user;
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Headers('authorization') authHeader: string, @Body() createNoteDto: NoteDto) {
    const user = await this.getUserFromToken(authHeader);
    
    const note = await this.notesService.createNote(user, createNoteDto);
    return note;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Headers('authorization') authHeader: string, @Param('id') noteId: number) {
    await this.getUserFromToken(authHeader);

    await this.notesService.deleteNote(noteId);
    return { message: 'Note deleted successfully' };
}

  @UseGuards(AuthGuard)
  @Patch(':id/tags')
  async updateTags(@Headers('authorization') authHeader: string, @Param('id') noteId: number,
  @Body() UpdateTagsDto: UpdateTagsDto) {
    await this.getUserFromToken(authHeader);

    const updatedNote = await this.notesService.updateTags(noteId, UpdateTagsDto.tags);
    return updatedNote;
  }
e
  @UseGuards(AuthGuard)
  @Patch(':id/content')
  async updateContent(@Headers('authorization') authHeader: string, @Param('id') noteId: number,
  @Body() updateContentDto: UpdateContentDto) {
    await this.getUserFromToken(authHeader);

    const updatedNote = await this.notesService.updateContent(noteId, updateContentDto.content);
    return updatedNote;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getNote(@Headers('authorization') authHeader: string, @Param('id') noteId: number) {
    await this.getUserFromToken(authHeader);

    const note = await this.notesService.getNote(noteId);
    return note;
  }
}
