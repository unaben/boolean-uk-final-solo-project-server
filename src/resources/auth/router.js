const { Router } = require("express");

const { SignUp, LogIn } = require("./controller");

const router = Router();

router.post("/signup", SignUp);
router.post("/login", LogIn);

module.exports = router;
