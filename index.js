require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const itemRoute = require('./src/routes/item.route');
const usuarioRoute = require('./src/routes/usuario.route');
const handle404Error = require('./src/middlewares/handle404Error');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoute);
app.use('/api/itens', itemRoute);
app.use(handle404Error);

app.listen(process.env.PORTA, () => {
	console.log('Rodando');
});
