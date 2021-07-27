const router = require('express').Router();
const { models: {Fave}  } = require('../../db');

module.exports = router;

//gets all faves
router.get("/", async (req, res, next) => {
	try {
		res.send(await Fave.findAll());
	} catch (ex) {
		next(ex);
	}
});

//creates a fave
router.post("/", async (req, res, next) => {
	try {
		res.status(201).send(await Fave.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a fave
router.delete("/:id", async (req, res, next) => {
	try {
		const fave = await Fave.findByPk(req.params.id);
		await fave.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});