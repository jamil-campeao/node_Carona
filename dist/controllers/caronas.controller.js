"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCaronas = exports.getCaronasDoDia = exports.getCaronas = exports.deleteCarona = void 0;
var _client = _interopRequireDefault(require("../db/client.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//Rota para registrar uma carona
var postCaronas = exports.postCaronas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, PAS_ID, DES_ID, CAR_DATA, dataFormatada, caronaExistente, carona, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$body = req.body, PAS_ID = _req$body.PAS_ID, DES_ID = _req$body.DES_ID, CAR_DATA = _req$body.CAR_DATA;
          _context.p = 1;
          // Converto a data para formato padrão "YYYY-MM-DD"
          dataFormatada = new Date(CAR_DATA).toISOString().split("T")[0]; // Verifico se já existe uma carona com os mesmos dados
          _context.n = 2;
          return _client["default"].carona.findFirst({
            where: {
              PAS_ID: parseInt(PAS_ID),
              DES_ID: parseInt(DES_ID),
              CAR_DATA: {
                gte: new Date("".concat(dataFormatada, "T00:00:00.000Z")),
                lte: new Date("".concat(dataFormatada, "T23:59:59.999Z"))
              }
            }
          });
        case 2:
          caronaExistente = _context.v;
          if (!caronaExistente) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Carona já registrada para este passageiro, destino e dia!"
          }));
        case 3:
          _context.n = 4;
          return _client["default"].carona.create({
            data: {
              PAS_ID: parseInt(PAS_ID),
              DES_ID: parseInt(DES_ID),
              CAR_DATA: new Date(CAR_DATA)
            }
          });
        case 4:
          carona = _context.v;
          res.status(201).json(carona);
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error("Erro ao registrar a carona:", _t);
          res.status(500).json({
            message: "Erro ao registrar carona: ".concat(_t)
          });
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function postCaronas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getCaronas = exports.getCaronas = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query, mes, ano, inicioMes, fimMes, caronas, resultado;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _req$query = req.query, mes = _req$query.mes, ano = _req$query.ano;
          inicioMes = new Date("".concat(ano, "-").concat(mes, "-01"));
          fimMes = new Date("".concat(ano, "-").concat(mes + 1, "-01"));
          _context2.n = 1;
          return _client["default"].carona.findMany({
            where: {
              CAR_DATA: {
                gte: inicioMes,
                lt: fimMes
              }
            },
            include: {
              passageiro: true,
              destino: true
            }
          });
        case 1:
          caronas = _context2.v;
          //Agrupo os dados por destino
          resultado = {};
          caronas.forEach(function (_ref3) {
            var passageiro = _ref3.passageiro,
              destino = _ref3.destino;
            if (!resultado[destino.DES_NOME]) resultado[destino.DES_NOME] = {};
            if (!resultado[destino.DES_NOME][passageiro.PAS_NOME]) resultado[destino.DES_NOME][passageiro.PAS_NOME] = 0;
            resultado[destino.DES_NOME][passageiro.PAS_NOME] += 1;
          });
          res.status(200).json(resultado);
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function getCaronas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getCaronasDoDia = exports.getCaronasDoDia = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var data, start, end, caronasDoDia, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          data = req.params.data;
          if (data) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "Data é obrigatória"
          }));
        case 1:
          _context3.p = 1;
          start = new Date(data);
          start.setHours(0, 0, 0, 0);
          end = new Date(data);
          end.setHours(23, 59, 59, 999);
          _context3.n = 2;
          return _client["default"].carona.findMany({
            where: {
              CAR_DATA: {
                gte: start,
                lte: end
              }
            },
            include: {
              destino: true,
              passageiro: true
            }
          });
        case 2:
          caronasDoDia = _context3.v;
          return _context3.a(2, res.status(200).json(caronasDoDia));
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error(_t2);
          return _context3.a(2, res.status(500).json({
            message: "Erro ao buscar caronas"
          }));
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return function getCaronasDoDia(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteCarona = exports.deleteCarona = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var id, caronaExcluida, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          id = req.params.id;
          _context4.p = 1;
          _context4.n = 2;
          return _client["default"].carona["delete"]({
            where: {
              CAR_ID: parseInt(id)
            }
          });
        case 2:
          caronaExcluida = _context4.v;
          return _context4.a(2, res.status(200).json(caronaExcluida));
        case 3:
          _context4.p = 3;
          _t3 = _context4.v;
          return _context4.a(2, res.status(500).json({
            message: "Erro ao excluir a carona"
          }));
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return function deleteCarona(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();