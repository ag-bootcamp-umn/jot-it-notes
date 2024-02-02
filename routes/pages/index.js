const path = require('path');
const router = require("express").Router()

// serve up the notes.html page if the user goes to the /notes url
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../public/notes.html'))
);

module.exports = router