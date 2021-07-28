const router = require('express').Router();
const { models: {Curr} } = require('../../db');

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
		console.log(req.body)
		res.status(201).send(await Curr.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes curr
router.delete("/:id", async (req, res, next) => {
	try {
		await Curr.destroy({
			where:{
			id: req.params.id
			}
		})
	} catch (ex) {
		next(ex);
	}
});