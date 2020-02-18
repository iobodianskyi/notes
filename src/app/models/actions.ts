import { Note } from './note';

export interface Action {
  info: ActionInfo;
  newNote: Note;
  oldNote: Note;
}

export interface ActionInfo {
  name: string;
  title: string;
}
