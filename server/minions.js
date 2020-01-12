const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./work');
const db = require('./db.js');

minionsRouter.param('minionId', (req, res, next, id) => {
  try {
    const minion = db.getFromDatabaseById('minions', id);
    if (minion) {
      req.minionId = id;
      req.minionObj = minion;
      next();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minionObj);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  // esse try catch é desnecessário, porque eu já chequei isso no middlewere params
  try {
    const isIdFound = db.deleteFromDatabasebyId('minions', req.minionId);
    if (isIdFound) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  } catch (error) {
    console.log(error);
  }
});

minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;