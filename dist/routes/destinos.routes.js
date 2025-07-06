"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _destinosController = require("../controllers/destinos.controller.js");
var router = (0, _express.Router)();
router.post("/", _destinosController.postDestino);
router.get("/", _destinosController.getDestino);
router.put("/:id", _destinosController.putDestino);
router["delete"]("/:id", _destinosController.deleteDestino);
var _default = exports["default"] = router;