//Vai receber o service
//Controla as respostas e requisições
const createError = require('http-errors');
const usuarioService = require('../services/usuario.service');
const { validationResult } = require('express-validator');

const criar = async (req, res, next) => {
	try {
		const errors = validationResult(req); //Pega o resultado da requisição e joga no if
		if (!errors.isEmpty()) {
			// Se errors NÃO for vazio, retorna abaixo
			throw createError(422, { errors: errors.array() });
		}
		const response = await usuarioService.criar(req.body);
		if (response && response.message) {
			throw response;
		}
		res.send(response);
	} catch (error) {
		return next(error); //Next faz com que o proximo middleware seja chamado
	}
};

const atualizar = async (req, res, next) => {
	try {
		const errors = validationResult(req); //Pega o resultado da requisição e joga no if
		if (!errors.isEmpty()) {
			// Se errors NÃO for vazio, retorna abaixo
			throw createError(422, { errors: errors.array() });
		}
		const response = await usuarioService.atualizar(
			{
				nome: req.body.nome
			},
			req.params.id
		);

		if (response && response.message) {
			throw response;
		}
		res.send(response);
	} catch (error) {
		return next(error);
	}
};
const encontrarTodos = async (req, res) => {
	try {
		const response = await usuarioService.encontrarTodos();
		res.send(response);
	} catch (error) {
		throw response;
	}
};

const encontrarPorId = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw createError(422, { errors: errors.array() });
		}
		const response = await usuarioService.encontrarPorId(req.params.id); //Passa o parâmetro dentro dessa função
		if (response && response.message) {
			throw response; //Throw é como um break, não vai roda abaixo
		}
		res.send(response);
	} catch (error) {
		return next(error);
	}
};

const deletar = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw createError(422, { errors: errors.array() });
		}

		const response = await usuarioService.deletar(req.params.id); //Passa o parâmetro dentro dessa função

		if (response && response.message) {
			throw response; //Throw é como um break, não vai roda abaixo
		}
		res.send(response);
	} catch (error) {
		return next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const errors = validationResult(req); //Pega o resultado da requisição e joga no if
		if (!errors.isEmpty()) {
			// Se errors NÃO for vazio, retorna abaixo
			throw createError(422, { errors: errors.array() });
		}
		const response = await usuarioService.login(req.body);
		if (response && response.message) {
			throw response;
		}
		res.send(response);
	} catch (error) {
		return next(error); //Next faz com que o proximo middleware seja chamado
	}
};

module.exports = {
	criar,
	atualizar,
	encontrarTodos,
	encontrarPorId,
	login,
	deletar
};
