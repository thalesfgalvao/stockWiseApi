const handle404Error = (req, res) => {
	res.status(404);
	res.send(['Não encontrado']);
};

module.exports =
	handle404Error
