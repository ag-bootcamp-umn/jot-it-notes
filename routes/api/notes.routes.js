const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// Copied from teaching material
const uuid = require('../../helpers/uuid');
const notesDB = path.join(__dirname, '../../db/db.json');

// Send the JSON data to the browser to populate the notes list
router.get('/', (req, res) =>
  res.sendFile(notesDB)
);

// Adding a new note: get the data from the db file; take the incoming data, add a unique id and push it to the db array; write that new array to the db
router.post('/', (req, res) => {
  fs.readFile(notesDB, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const newData = req.body;
      newData.id = uuid();
      parsedData.push(req.body);
      fs.writeFile(notesDB, JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info('Success')
      )
      res.json('note added');
    }
  });
});

// Deleting the selected item: We get the id of the item, then we read the data from the db; next, we filter the db array and keep only those items whose id does NOT match the id of the item to delete; write this new array back to the db
router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  fs.readFile(notesDB, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const updatedData = parsedData.filter( entry => entry.id != req.params.id );
      fs.writeFile(notesDB, JSON.stringify(updatedData, null, 4), (err) =>
    err ? console.error(err) : console.info('Deleted')
      )
      res.json('Deleted');
    }
  });
});

module.exports = router;