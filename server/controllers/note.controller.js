const NoteModel = require('../models/note.model');

// Create new note
exports.create = (req, res) => {
    // validation
    if (!req.body.content) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }

    const noteModelInstance = new NoteModel({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    });

    noteModelInstance.save({}, (err, newNote) => {
        if (err)
            return res.status(500).json({ message: 'Error in creating note', error: err.message });

        return res.status(201).json({ status: 'success', message: 'Note is created successfully.', note: newNote });
    });

};

// Retrieve all the notes
exports.findAll = (req, res) => {

    NoteModel.find({}, {}, {}, (err, allNotes) => {
        if (err)
            return res.status(500).json({ message: 'Error occurred while retrieving the notes' });

        return res.status(200).json({ status: 'success', notes: allNotes });
    });
};

// Find a single note
exports.findOne = (req, res) => {
    let noteId = req.params.noteId;

    NoteModel.findById(noteId, {}, (err, note) => {
        if (err)
            return res.status(500).json({ message: 'Error in finding the note' });

        return res.status(200).json({ status: 'Success', note: note });
    });
};

// Update note
exports.update = (req, res) => {
    let noteId = req.params.noteId;
    let notesToUpdate = req.body.note;

    NoteModel.findByIdAndUpdate(noteId, notesToUpdate, { new: true }, (err, updatedNote) => {
        if (err)
            return res.status(500).json({ message: 'Error in updating note' });

        return res.status(200).json({ message: 'Note is updated successfully', note: updatedNote });
    });
};

// Delete note
exports.delete = (req, res) => {
    let noteId = req.params.noteId;

    NoteModel.findByIdAndDelete(noteId, (err, deletedNote) => {
        if (err)
            return res.status(500).json({ message: 'Error in deleting note' });

        return res.status(200).json({ message: 'Note is deleted successfully', note: deletedNote });        
    });
}
