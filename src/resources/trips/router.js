const { Router } = require("express");
const { protect } = require("../auth/controller");
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
router.post("/", protect, createOne);
router.patch("/:id", updateOneById);
router.delete("/:id", deleteOneTrip);

module.exports = router;
