//Vai receber o service
const usuarioService = require('../services/usuario.service');

const criar = async (req, res) => {
	const usuario = await usuarioService.criar(req.body);
	res.send(usuario);
};

const encontrarTodos = async (req, res) => {
	const usuariosEncontrados = await usuarioService.encontrarTodos();
	res.send(usuariosEncontrados);
};

const encontrarPorId = async (req, res) => {
	const usuarioEncontrado = await usuarioService.encontrarPorId(req.params.id); //Passa o parâmetro dentro dessa função
	res.send(usuarioEncontrado);
};

module.exports = {
	criar,
	encontrarTodos,
	encontrarPorId
};
