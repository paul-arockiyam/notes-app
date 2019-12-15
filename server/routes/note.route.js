const noteCtrl = require('../controllers/note.controller');

module.exports = (app) => {
    // Create note
    app.post('/notes', noteCtrl.create);
    
    // Get all notes
    app.get('/notes', noteCtrl.findAll);
    
    // Find a single note
    app.get('/notes/:noteId', noteCtrl.findOne);
    
    // Update single note
    app.put('/notes/:noteId', noteCtrl.update);
    
    // Delete note
    app.delete('/notes/:noteId', noteCtrl.delete);
}