const express = require('express');
const apiRouter = express.Router();

const ideasRouter = require('./ideas.js')
const meetingsRouter = require('./meetings.js')

// para testar
apiRouter.use('/minions', require('./minions'));
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter);


module.exports = apiRouter;