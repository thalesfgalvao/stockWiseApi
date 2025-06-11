//Faz a comunicação com o banco de dados usando sequelize.
//Toda e qualquer comunicação com o banco de dados vai passar pelo repository.
//Apenas no repository usamos o findAll, findOne, findByPk e etc. É a camada PAI 
const db = require('../database/models/index');
const { Usuario } = require('../database/models/index');

const criar = async (usuario) => {
	const usuarioCriado = await Usuario.create(usuario);
	return usuarioCriado;
};

const encontrarTodos = async () => {
	const usuariosEncontrados = await Usuario.findAll();
	return usuariosEncontrados;
};

const encontrarPorId = async (id) => {
	const usuarioEncontrado = await Usuario.findByPk(id);
	return usuarioEncontrado;
};

module.exports = {
	criar,
	encontrarTodos,
	encontrarPorId
};
