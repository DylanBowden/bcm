const validateBody = (req) => {
  const airlineCode = req.body.airlineCode;
  const from = req.body.from;
  const to = req.body.to;

  if (!airlineCode || !airlineCode.match(/^[a-Z]{3}$/))[1] {
    throw new Error('Invalid Airline Code ');
  }

  if (!from || !from.match(/^[a-Z]{3}$/))[1] {
    throw new Error('Invalid Departure City ');
  }

  if (!to || !to.match(/^[a-Z]{3}$/))[1] {
    throw new Error('Invalid Arrival City ');
  }

  // further validations.....
};

module.exports = {
  validateBody
};
