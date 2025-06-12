const validatorMessage = (atributo) => {
	return `A propriedade ${atributo} é inválida`;
};

const notExists = (atributo) => {
	return `${atributo} não existe`;
};

module.exports = {
	validatorMessage,
	notExists
};
