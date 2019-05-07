const router = require("express").Router();
const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controller = require("./controller");

router.get("/", controller.get);

router.post("/", controller.post);

router.delete("/:id", controller.delete);

router.put("/:id", controller.put);

router.post("/login", controller.login);
module.exports = router;
