const express = require('express');
const meetingsRouter = express.Router();

const db = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  const meetings = db.getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = db.addToDatabase('meetings', db.createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
  db.deleteAllFromDatabase('meetings');
  res.status(204).send()
});

module.exports = meetingsRouter;
