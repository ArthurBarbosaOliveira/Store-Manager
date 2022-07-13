const { nameRequired, nameLength } = require('./errors');
const { NotFoundError } = require('./errors');

module.exports = (err, _req, res, _next) => {
  const { message } = err;

  switch (message) {
    case NotFoundError:
      res.status(404).json({ message });
      break;
    case nameRequired:
      res.status(400).json({ message });
      break;
    case nameLength:
      res.status(422).json({ message });
      break;
    default: res.status(500).json({ message });
  }
}; 