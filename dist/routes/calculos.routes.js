"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _calculosController = require("../controllers/calculos.controller.js");
var router = (0, _express.Router)();
router.get("/", _calculosController.getCalculo);
router.get("/quantidadesdia", _calculosController.getQuantidadesViagensDia);
var _default = exports["default"] = router;