const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const criar = () => {
	return [
		body('nome', validatorMessage('Nome')).exists().bail().isString(), //Confere se existe, bail não deixa duplicar o erro, isString confere se é uma string.
		body('email', validatorMessage('Email')).exists().bail().isString(),
		body('senha', validatorMessage('Senha')).exists().bail().isString()
	];
};

const atualizar = () => {
	return [
		body('nome', validatorMessage('Nome')).exists().bail().isString(),
		param('id', validatorMessage('Id')).exists().bail().isInt()
	];
};

const encontrarPorId = () => {
	return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

const deletar = () => {
	return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

const login = () => {
	return [
		body('email', validatorMessage('Email')).exists().bail().isString(),
		body('senha', validatorMessage('Senha')).exists().bail().isString()
	];
};

module.exports = {
	criar,
	atualizar,
	encontrarPorId,
	deletar,
	login
};
