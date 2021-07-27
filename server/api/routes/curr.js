const router = require('express').Router();
const { models: {User, Game}  } = require('../../db');
const { Op } = require("sequelize");

module.exports = router;

//gets curr
router.get("/", async (req, res, next) => {
	try {
		res.send(await Curr.findAll());
	} catch (ex) {
		next(ex);
	}
});

//creates curr
router.post("/", async (req, res, next) => {
	try {
		res.status(201).send(await Curr.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes curr
router.delete("/:id", async (req, res, next) => {
	try {
		const curr = await Curr.findByPk(req.params.id);
		await curr.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});