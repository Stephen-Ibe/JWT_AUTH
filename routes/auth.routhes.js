const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

const { register } = authController;

router.post("/register", register);

modue.exports = router;
