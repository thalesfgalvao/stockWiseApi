//Vai receber o controller
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const usuarioValidator = require('../validators/usuario.validator');
const verifyJWT = require('../middlewares/authorizator');

router.post('/', usuarioValidator.criar(), usuarioController.criar);
router.post('/login', usuarioValidator.login(), usuarioController.login);
router.put(
	'/:id',
	verifyJWT,
	usuarioValidator.atualizar(),
	usuarioController.atualizar
);
router.get('/', verifyJWT, usuarioController.encontrarTodos);
router.get(
	'/:id',
	verifyJWT,
	usuarioValidator.encontrarPorId(),
	usuarioController.encontrarPorId
);

router.delete(
	'/:id',
	verifyJWT,
	usuarioValidator.deletar(),
	usuarioController.deletar
);

module.exports = router;
