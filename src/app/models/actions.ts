import { Note } from "./note";

export interface Action {
  info: ActionInfo;
  newNote: Note;
  oldNote: Note;
}

interface ActionInfo {
  name: string,
  title: string
}