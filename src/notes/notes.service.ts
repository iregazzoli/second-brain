import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { NoteDto } from './dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>
  ) {}

  async createNote(user: User, noteDto: NoteDto): Promise<Note> {
    const note = new Note();
    note.content = noteDto.content;
    note.tags = noteDto.tags;
    note.user = user;

    return this.noteRepository.save(note);
  }

  async deleteNote(noteId: number): Promise<void>{
    const note = await this.noteRepository.findOne({ where: { id: noteId } });

    if (!note) 
      throw new NotFoundException('Note not found');
  
    await this.noteRepository.remove(note);
  }

  async updateTags(noteId: number, tags: string[]): Promise<Note> {
  const note = await this.noteRepository.findOne({ where: { id: noteId } });

  if (!note) 
    throw new NotFoundException('Note not found');

  note.tags = tags;
  await this.noteRepository.save(note);

  return note;
}

  async updateContent(noteId: number, content: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: noteId } });

    if (!note) 
      throw new NotFoundException('Note not found');

    note.content = content;
    await this.noteRepository.save(note);

    return note;
  }

  async getNote(noteId: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: noteId } });

    if (!note) 
      throw new NotFoundException('Note not found');

    return note;
  }
  
}
