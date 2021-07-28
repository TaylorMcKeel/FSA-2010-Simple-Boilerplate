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
router.delete("/:name", async (req, res, next) => {
	try {
		await Fave.destroy({
			where: {
				name: req.params.name
			}
		})
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});