const checkMillionDollarIdea = (req, res, next) => {
  const {weeklyRevenue, numWeeks} = req.body;
  const totalYield = Number(weeklyRevenue) * Number(numWeeks);
  if (!numWeeks || !weeklyRevenue || isNaN(totalYield) || totalYield < (10 ** 6)) {
    res.status(400).send();
  } else {
    next()
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;