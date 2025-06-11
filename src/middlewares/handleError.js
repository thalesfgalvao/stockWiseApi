const montarErro = (error) => {
	if (error.erros) {
		return error.errors.map((err) => err.msg);
	}
	if (error.message) {
		return [error.message];
	}
	return ['Ocorreu um  erro, tente novamente ou contate um administrador.'];
};

const handleError = (error, req, res, next) => {
	const errors = montarErro(error);
	res.status(error.status || 500);
	res.json(errors);
};

module.exports = handleError;
