module.exports = (err, _request, response, _next) => {
  switch (err.name) {
    case 'NotFoundError': return response.status(404).json({ message: err.message });
    default: return response.status(500).json({ message: 'Internal server error' });
  }
};