const mongoose = require('mongoose');

// Define the Note model Schema
const NoteSchema = new mongoose.Schema({
    userID: String,
    note: String
});

module.exports = mongoose.model('Note', NoteSchema);