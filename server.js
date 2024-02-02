const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const path = require('path');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const newData = req.body;
      newData.id = uuid();
      parsedData.push(req.body);
      fs.writeFile('db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info('Success')
      )
      res.json('note added');
    }
  });
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const updatedData = parsedData.filter( entry => entry.id != req.params.id );
      fs.writeFile('db/db.json', JSON.stringify(updatedData, null, 4), (err) =>
    err ? console.error(err) : console.info('Deleted')
      )
      res.json('Deleted');
    }
  });
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.get('*', (req, res) => res.send('Navigate to /send or /routes'));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);