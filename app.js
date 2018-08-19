console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

var titleTemplate = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

var bodyTemplate = {
  describe: 'Body of the Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new Note', {
  title: titleTemplate,
  body: bodyTemplate
})
.command('list', 'List all Notes')
.command('read', 'Read a Note', {
  title: titleTemplate
})
.command('remove', 'Remove a Note', {
  title: titleTemplate
})
.help()
.argv;
var command = argv._[0];
console.log('yargs', yargs.argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note Added');
    notes.logNote(note);
  } else {
    console.log('Note already exists');
  }
} else if (command === 'list') {
  notes.getAll()
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed': 'Note not found';
  console.log(message);
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if (note) {
    console.log('Note Found');
    notes.logNote(note);
  } else {
    console.log('note not found');
  }
} else {
  console.log('command not recognized');
}
