require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const itemRoute = require('./src/routes/item.route');
const usuarioRoute = require('./src/routes/usuario.route');
const handle404Error = require('./src/middlewares/handle404Error');
const handleError = require('.//src/middlewares/handleError');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoute);
app.use('/api/itens', itemRoute);
app.use(handle404Error); // Não captura os ERROS, e sim rota não encontrada
app.use(handleError); // Captura especificamente ERROS

app.listen(process.env.PORTA, () => {
	console.log('Rodando');
});
