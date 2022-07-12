require('express-async-errors');

const express = require('express');
const ProductsRoute = require('./routers/ProductsRoute');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRoute);

app.use((err, _req, res, _next) => {
  const { message } = err;

  switch (message) {
    case 'Product not found':
      res.status(404).json({ message });
      break;
    default: res.status(500).json({ message });
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;