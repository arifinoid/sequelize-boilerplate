const router = require("express").Router();
const helpers = require("../helpers");
const controller = require("./controller");

//get all data
router.get("/", helpers.isAuthenticated, controller.get);

router.post("/", controller.post);

router.delete("/:id", controller.delete);

router.put("/:id", controller.put);

router.post("/login", controller.login);
module.exports = router;
