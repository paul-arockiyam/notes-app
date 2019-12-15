const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/note.route')(app);

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

// Default route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the notes app!.' });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});