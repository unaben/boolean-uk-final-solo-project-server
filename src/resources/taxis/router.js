const { Router } = require("express");

const { getAll, getOneById, createOne } = require("./controller");

const router = Router();

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", createOne);

module.exports = router;
