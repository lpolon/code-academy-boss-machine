const express = require('express');
const workRouter = express.Router({ mergeParams: true });

const db = require('./db');

// api/minions/:minionId/work
workRouter.get('/', (req, res, next) => {
  const work = db.getAllFromDatabase('work').filter((w) => {
    return w.minionId === req.minionId;
  });
  res.send(work);
});

workRouter.post('/', (req, res, next) => {
  const { minionId } = req.minionId;
  const newWork = { minionId, ...req.body };
  db.addToDatabase('work', newWork);
  res.status(201).send(newWork);
});

workRouter.param('workId', (req, res, next, id) => {
  try {
    const work = db.getFromDatabaseById('work', id);
    if (work) {
      req.workId = id;
      req.workObj = work;
      next()
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

workRouter.put('/:workId', (req, res, next) => {
  if (req.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updateWork = db.updateInstanceInDatabase('work', req.body);
    res.send(updateWork)
  }
});

workRouter.delete('/:workId', (req, res, next) => {
  const deleted = db.deleteFromDatabasebyId('work', req.workId)
  if(deleted) {
    res.status(204).send()
  } else {
    res.status(500);
  }
})

module.exports = workRouter;