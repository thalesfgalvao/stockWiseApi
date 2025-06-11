//Vai receber o service
//Controla as respostas, requisições e respostas
const usuarioService = require('../services/usuario.service');

const criar = async (req, res, next) => {
	try {
		const response = await usuarioService.criar(req.body);
		if (response && response.message) {
			throw response;
		}
		res.send(response);
	} catch (error) {
		return next(error); //Next faz com que o proximo middleware seja chamado
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
		const response = await usuarioService.encontrarPorId(req.params.id); //Passa o parâmetro dentro dessa função
		if (response && response.message) {
			throw response; //Throw é como um break, não vai roda abaixo
		}
		res.send(response);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	criar,
	encontrarTodos,
	encontrarPorId
};
