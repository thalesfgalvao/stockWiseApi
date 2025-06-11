//Camada responsável pela regra de negócios
//Essa camada recebe o repository
require('dotenv').config();
const bcrypt = require('bcrypt')
const usuarioRepository = require('../repositories/usuario.respository');

const criar = async (usuario) => {
	usuario.senha = await bcrypt.hash(usuario.senha, ~~process.env.SALT)
	const usuarioCriado = await usuarioRepository.criar(usuario);
	return usuarioCriado;
};

const encontrarTodos = async () => {
	const usuariosEncontrados = await usuarioRepository.encontrarTodos();
	return usuariosEncontrados;
};

const encontrarPorId = async (id) => {
	const usuarioEncontrado = await usuarioRepository.encontrarPorId(id);
	return usuarioEncontrado;
};

module.exports = {
	criar,
	encontrarTodos,
	encontrarPorId
};
