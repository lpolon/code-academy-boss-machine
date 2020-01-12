const express = require('express');
const ideasRouter = express.Router();

const db = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea')

ideasRouter.param('id', (req, res, next, id) => {
  const idea = db.getFromDatabaseById('ideas', id);
  if (idea) {
    req.ideaId = id;
    req.ideaObj = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.ideaObj);
});

ideasRouter.put('/:id', (req, res, next) => {
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.post('/',checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.delete('/:id', (req, res, next) => {
  const deleted = db.deleteFromDatabasebyId('ideas', req.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
