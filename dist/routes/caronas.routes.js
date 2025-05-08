"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _caronasController = require("../controllers/caronas.controller.js");
var router = (0, _express.Router)();
router.get("/", _caronasController.getCaronas);
router.post("/", _caronasController.postCaronas);
var _default = exports["default"] = router;