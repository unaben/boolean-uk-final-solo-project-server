const { Router } = require("express");

const {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneTaxi,
} = require("./controller");

const router = Router();

router.get("/", getAll);
router.patch("/:id", updateOneById);
router.get("/:id", getOneById);
router.post("/", createOne);
router.delete("/:id", deleteOneTaxi);
module.exports = router;
