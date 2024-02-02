const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('../../helpers/uuid');
const notesDB = path.join(__dirname, '../../db/db.json');

router.get('/', (req, res) =>
  res.sendFile(notesDB)
);

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