const app = require('./api')

const init = async () => {
	try {
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => console.log(`listening on port ${PORT}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();

