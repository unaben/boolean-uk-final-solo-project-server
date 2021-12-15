const { Router } = require("express");
const {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneTrip,
} = require("./controller");

const router = Router();

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", createOne);
router.patch("/:id", updateOneById);
router.delete("/:id", deleteOneTrip);

module.exports = router;
