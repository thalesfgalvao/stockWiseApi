//Vai receber o controller
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const usuarioValidator = require('../validators/usuario.validator');

router.post('/', usuarioValidator.criar(), usuarioController.criar);
router.put('/:id', usuarioValidator.atualizar(), usuarioController.atualizar);
router.get('/', usuarioController.encontrarTodos);
router.get(
	'/:id',
	usuarioValidator.encontrarPorId(),
	usuarioController.encontrarPorId
);

router.delete('/:id', usuarioValidator.deletar(), usuarioController.deletar);

module.exports = router;
