console.log('starting app notes.js');

const fs = require('fs');
const _ = require('lodash');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var logNote = (note) => {
  debugger
  console.log('----');
  console.log(`title: ${note.title}`);
  console.log(`body: ${note.body}`);
}

var addNote = (title, body) => {
  var notes = [];
  var note = {
    title,
    body
  };

  notes = fetchNotes();
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

var getAll = () => {
  console.log('listing all notes');
  var notes = fetchNotes();
  for (var note of notes) {
    logNote(note);
  }
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}

var readNote = (title) => {
  var notes = fetchNotes();
  var readNote = notes.filter((note) => note.title === title);
  return readNote[0];
}

module.exports = {
  addNote, getAll, removeNote, readNote, logNote
}
