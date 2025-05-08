"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _indexRoutes = _interopRequireDefault(require("./routes/index.routes.js"));
var _client = _interopRequireDefault(require("./db/client.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function fValidaConexao() {
  try {
    _client["default"].$connect();
    console.log("Conexão com o banco realizada com sucesso");
  } catch (error) {
    console.error("Erro de conexão com o banco de dados: ", error);
    process.exit(1);
  }
}
fValidaConexao();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: "*",
  methods: ["GET, POST, PUT, DELETE"]
}));
app.use(_indexRoutes["default"]);
var _default = exports["default"] = app;