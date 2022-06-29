const express = require('express');
require('express-async-errors');
const ProductsRoute = require('./routers/ProductsRoute');

const app = express();

app.use('/products', ProductsRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;