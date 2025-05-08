"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _caronasRoutes = _interopRequireDefault(require("./caronas.routes.js"));
var _passageirosRoutes = _interopRequireDefault(require("./passageiros.routes.js"));
var _destinosRoutes = _interopRequireDefault(require("./destinos.routes.js"));
var _calculosRoutes = _interopRequireDefault(require("./calculos.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.use("/caronas", _caronasRoutes["default"]);
router.use("/passageiros", _passageirosRoutes["default"]);
router.use("/destinos", _destinosRoutes["default"]);
router.use("/calculo", _calculosRoutes["default"]);
var _default = exports["default"] = router;