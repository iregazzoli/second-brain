import { Body, Controller, Post, UnauthorizedException, UseGuards, Headers } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { NoteDto } from './dto';
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
  
    if (!user) {
      throw new UnauthorizedException();
    }
  
    const note = await this.notesService.createNote(user, createNoteDto);
    return note;
  }

}
