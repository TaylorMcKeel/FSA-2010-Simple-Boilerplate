const app = require('./api');
const {db} = require('./db');

const init = async () => {
	try {
		const PORT = process.env.PORT || 3000;
		await db.sync({force: true})
		app.listen(PORT, () => console.log(`listening on port ${PORT}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();

