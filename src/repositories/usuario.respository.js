//Faz a comunicação com o banco de dados usando sequelize.
//Toda e qualquer comunicação com o banco de dados vai passar pelo repository.
//Apenas no repository usamos o findAll, findOne, findByPk e etc. É a camada PAI
const db = require('../database/models/index');
const { Usuario } = require('../database/models/index');

const criar = async (usuario) => {
	const usuarioCriado = await Usuario.create(usuario);
	return usuarioCriado;
};

const atualizar = async (usuario, id) => {
	await Usuario.update(usuario, {
		where: { id: id }
	});
};

const encontrarTodos = async () => {
	const usuariosEncontrados =
		await Usuario.findAll(/*{paranoid: false // Isso trará também os deletados}*/);
	return usuariosEncontrados;
};

const encontrarPorId = async (id) => {
	const usuarioEncontrado = await Usuario.findByPk(id);
	return usuarioEncontrado;
};

const enconcontrarUmPorWhere = async (where) => {
	const usuarioEncontrado = Usuario.findOne({
		where: where
	});
	return usuarioEncontrado;
};

const deletar = async (id) => {
	return await Usuario.destroy({
		where: { id: id }
	});
};

module.exports = {
	criar,
	encontrarTodos,
	atualizar,
	encontrarPorId,
	enconcontrarUmPorWhere,
	deletar
};
