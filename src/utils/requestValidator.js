const validateBody = (req) => {
  const airlineCode = req.params.airlineCode;
  const from = req.params.from;
  const to = req.params.to;

  if (!airlineCode || !airlineCode.match(/^[A-z]{2}$/)) {
    throw new Error('Invalid Airline Code: ' + airlineCode);
  }

  if (!from || !from.match(/^[A-z]{3}$/)) {
    throw new Error('Invalid Departure City ');
  }

  if (!to || !to.match(/^[A-z]{3}$/)) {
    throw new Error('Invalid Arrival City ');
  }

  // further validations.....
};

module.exports = {
  validateBody
};
