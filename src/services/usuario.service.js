//Camada responsável pela regra de negócios, validações, autenticação e etc
//Essa camada recebe o repository
require('dotenv').config();
const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.respository');
const createError = require('http-errors');

const criar = async (usuario) => {
	const existeUsuario = await usuarioRepository.enconcontrarUmPorWhere({
		email: usuario.email
	});

	if (existeUsuario) {
		return createError(409, 'Usuário já existe');
	}
	usuario.senha = await bcrypt.hash(usuario.senha, ~~process.env.SALT);
	const usuarioCriado = await usuarioRepository.criar(usuario);
	return usuarioCriado;
};

const encontrarTodos = async () => {
	const usuariosEncontrados = await usuarioRepository.encontrarTodos();
	return usuariosEncontrados;
};

const atualizar = async (usuario, id) => {
	const existeUsuario = await usuarioRepository.encontrarPorId(id);

	if (!existeUsuario) {
		return createError(404, 'Usuário não existe');
	}
	await usuarioRepository.atualizar(usuario, id);
	return await usuarioRepository.encontrarPorId(id);
};

const encontrarPorId = async (id) => {
	const usuarioEncontrado = await usuarioRepository.encontrarPorId(id);
	if (!usuarioEncontrado) {
		return createError(404, 'Usuário não encontrado');
	}
	return usuarioEncontrado;
};

module.exports = {
	criar,
	atualizar,
	encontrarTodos,
	encontrarPorId
};
