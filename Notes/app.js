const addBtn = document.querySelector('.add-notes');
const notesContainer = document.querySelector('.notes');

const color = [
  '#a7bed3',
  '#c6e2e9',
  '#f1ffc4',
  '#ffcaaf',
  '#fcf5c7',
  '#adf7b6',
];

addBtn.addEventListener('click', addNote);

notesContainer.addEventListener('dblclick', removeNote);

getNotesFromLocalStorage();

function addNote() {
  const randomNumber = Math.random();
  const i = Math.floor(randomNumber * color.length);

  const newNote = document.createElement('div');
  newNote.className = 'new-note';

  const newTextArea = document.createElement('textarea');
  newTextArea.placeholder = 'Write something here...';
  newTextArea.style.background = color[i];

  const deleteParagraph = document.createElement('p');
  deleteParagraph.textContent = 'Double-Click to delete note';
  deleteParagraph.className = 'delete-note';

  newNote.appendChild(newTextArea);
  newNote.appendChild(deleteParagraph);

  notesContainer.appendChild(newNote);

  storeNoteInLocalStorage(newNote.innerHTML);
}

function removeNote(event) {
  const note = event.target.closest('.new-note');
  if (note) {
    // remove from localStorage
    removeNoteFromLocalStorage(note.innerHTML);

    // remove from DOM
    note.remove();
  }
}

function storeNoteInLocalStorage(note) {
  let notes = [];

  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  }

  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
  let notes = [];

  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  }

  notes.forEach((note) => {
    const newNote = document.createElement('div');
    newNote.className = 'new-note';
    newNote.innerHTML = note;
    notesContainer.appendChild(newNote);
  });
}

function removeNoteFromLocalStorage(note) {
  let notes = [];

  if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
  }

  const noteIndex = notes.findIndex((storedNote) => storedNote === note);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

const deleteAllBtn = document.querySelector('.delete-all');

deleteAllBtn.addEventListener('click', () => {
  const assureMsg = document.querySelector('.assure');
  const cancelBtn = document.querySelector('.cancel');
  const confirmBtn = document.querySelector('.confirm');

  assureMsg.style.display = 'block';

  cancelBtn.addEventListener('click', () => {
    assureMsg.style.display = 'none';
  });

  confirmBtn.addEventListener('click', () => {
    localStorage.clear();

    const allNotes = document.querySelectorAll('.new-note');

    for (let index = 0; index < allNotes.length; index++) {
      allNotes[index].remove();
    }

    assureMsg.style.display = 'none';
  });
});

const colorButtons = document.querySelectorAll('.color-palette');

colorButtons.forEach((button) => {
  button.style.background = `${button.value}`;

  button.addEventListener('click', () => {
    colorButtons.forEach((btn) => btn.classList.remove('chosen'));

    button.classList.add('chosen');
  });
});

const listNameInput = document.querySelector('#name');
const addNoteListBtn = document.querySelector('.addBtn');
const dialog = document.querySelector('.dialog');
const noteListsWrapper = document.querySelector('.nav-links');
let list = [];

addNoteListBtn.addEventListener('click', addNoteList);

function addNoteList() {
  dialog.style.display = 'block';
}

const createBtn = document.querySelector('.submit');

createBtn.addEventListener('click', () => {
  let listStyleColor = document.querySelector('.chosen').value;

  const newNoteList = document.createElement('li');
  newNoteList.textContent = listNameInput.value || 'New List';
  newNoteList.style.listStyle = 'disc';

  newNoteList.style.setProperty('--marker-color', `${listStyleColor}`);

  noteListsWrapper.appendChild(newNoteList);
  list.push(newNoteList);

  localStorage.setItem('noteLists', JSON.stringify(list));

  dialog.style.display = 'none';

  noteListRadio();
});

noteListRadio();

function noteListRadio() {
  const noteLists = document.querySelectorAll('.nav-links li');

  noteLists.forEach((list) => {
    list.addEventListener('click', () => {
      noteLists.forEach((lst) => lst.classList.remove('active'));
      list.classList.add('active');
    });
  });
}
