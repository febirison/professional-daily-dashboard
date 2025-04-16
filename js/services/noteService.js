import { getLocalStorage, setLocalStorage } from '../utils/storage.js';

export class NoteService {
  getNotes() {
    return getLocalStorage('notes') || [];
  }

  addNote(note) {
    const notes = this.getNotes();
    notes.push(note);
    setLocalStorage('notes', notes);
  }

  removeNote(index) {
    const notes = this.getNotes();
    notes.splice(index, 1);
    setLocalStorage('notes', notes);
  }
}