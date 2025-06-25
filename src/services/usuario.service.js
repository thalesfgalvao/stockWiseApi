//Camada responsável pela regra de negócios, validações, autenticação e etc
//Essa camada recebe o repository
require('dotenv').config();
const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.respository');
const createError = require('http-errors');
const { sign } = require('jsonwebtoken');

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

const deletar = async (id) => {
	const encontrarUsuario = usuarioRepository.encontrarPorId(id);

	if (!encontrarUsuario) {
		return createError(404, 'Usuário não encontrado');
	}

	await usuarioRepository.deletar(id);
	return encontrarUsuario;
};

const login = async (usuario) => {
	const usuarioLogin = await usuarioRepository.enconcontrarUmPorWhere({
		email: usuario.email
	});

	if (!usuarioLogin) {
		return createError(401, 'Credenciais inválidas');
	}

	const comparacaoSenha = await bcrypt.compare(
		usuario.senha,
		usuarioLogin.senha
	);

	if (!comparacaoSenha) {
		return createError(401, 'Credenciais inválidas');
	}

	const token = sign(
		{
			id: usuarioLogin.id
		},
		process.env.SECRET,
		{
			expiresIn: '30m'
		}
	);
	delete usuarioLogin.senha;
	return {
		auth: true,
		usuario: usuarioLogin,
		token: token,
		role: 'Sem role por enquanto',
		mensagem: 'Login efetuado com sucesso'
	};
};

module.exports = {
	criar,
	atualizar,
	encontrarTodos,
	deletar,
	encontrarPorId,
	login
};
