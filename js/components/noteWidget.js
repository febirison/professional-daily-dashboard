export class NoteWidget {
    constructor() {
      this.container = document.getElementById('quickNotes');
      this.notes = localStorage.getItem('notes') || '';
      console.log(`NoteWidget: Initial notes: ${this.notes}`);
    }
  
    init() {
      if (!this.container) {
        console.error("NoteWidget: Container '#quickNotes' not found in DOM.");
        return;
      }
      console.log("NoteWidget: Container found, rendering...");
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      try {
        this.container.innerHTML = `
          <h2>Quick Notes</h2>
          <textarea id="noteInput">${this.notes}</textarea>
          <button id="saveNoteBtn">Save</button>
        `;
        console.log("NoteWidget: Rendered successfully.");
      } catch (error) {
        console.error('NoteWidget: Error during rendering:', error);
        this.container.innerHTML = `<p>Error loading notes.</p>`;
      }
    }
  
    setupEventListeners() {
      try {
        const saveNoteBtn = this.container.querySelector('#saveNoteBtn');
        const noteInput = this.container.querySelector('#noteInput');
  
        if (!saveNoteBtn || !noteInput) {
          throw new Error('NoteWidget: Note input or save button not found in DOM.');
        }
  
        saveNoteBtn.addEventListener('click', () => {
          console.log("NoteWidget: Save button clicked.");
          this.notes = noteInput.value;
          localStorage.setItem('notes', this.notes);
          alert('Notes saved!');
        });
      } catch (error) {
        console.error('NoteWidget: Error setting up event listeners:', error);
      }
    }
  }