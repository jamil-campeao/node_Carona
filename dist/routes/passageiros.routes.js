"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _passageirosController = require("../controllers/passageiros.controller.js");
var router = (0, _express.Router)();
router.get("/", _passageirosController.getPassageiros);
router.post("/", _passageirosController.postPassageiro);
router.put("/:id", _passageirosController.putPassageiro);
router["delete"]("/:id", _passageirosController.deletePassageiro);
var _default = exports["default"] = router;