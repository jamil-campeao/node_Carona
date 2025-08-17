"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putDestino = exports.postDestino = exports.getDestino = exports.deleteDestino = void 0;
var _client = _interopRequireDefault(require("../db/client.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//Rota para adicionar um destino
var postDestino = exports.postDestino = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, DES_NOME, DES_KM, destinoExistente, destino, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$body = req.body, DES_NOME = _req$body.DES_NOME, DES_KM = _req$body.DES_KM;
          _context.p = 1;
          _context.n = 2;
          return _client["default"].destino.findFirst({
            where: {
              DES_NOME: {
                equals: DES_NOME,
                mode: 'insensitive'
              }
            }
          });
        case 2:
          destinoExistente = _context.v;
          if (!destinoExistente) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Já existe um destino cadastro com este nome!"
          }));
        case 3:
          _context.n = 4;
          return _client["default"].destino.create({
            data: {
              DES_NOME: DES_NOME,
              DES_KM: DES_KM
            }
          });
        case 4:
          destino = _context.v;
          if (destino) {
            res.status(201).json(destino);
          }
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          res.status(500).json({
            message: "Erro ao cadastrar novo destino: ".concat(_t)
          });
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function postDestino(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//Rota para retornar os destinos
var getDestino = exports.getDestino = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var destinos, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return _client["default"].destino.findMany({
            where: {
              DES_ATIVO: true
            },
            orderBy: {
              DES_ID: 'asc'
            }
          });
        case 1:
          destinos = _context2.v;
          if (destinos) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(500).json({
            error: "Erro ao retornar destinos"
          }));
        case 2:
          return _context2.a(2, res.status(200).json(destinos));
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          return _context2.a(2, res.status(500).json({
            error: "Erro ao retornar destinos"
          }));
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function getDestino(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var putDestino = exports.putDestino = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var id, _req$body2, DES_NOME, DES_KM, parsedId, destino, updateDestino, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, DES_NOME = _req$body2.DES_NOME, DES_KM = _req$body2.DES_KM;
          _context3.p = 1;
          parsedId = parseInt(id); //1. Valido se o destino existe e se esta ativo
          _context3.n = 2;
          return _client["default"].destino.findUnique({
            where: {
              DES_ID: parsedId,
              DES_ATIVO: true
            }
          });
        case 2:
          destino = _context3.v;
          if (!destino) {
            _context3.n = 5;
            break;
          }
          _context3.n = 3;
          return _client["default"].destino.update({
            data: {
              DES_NOME: DES_NOME,
              DES_KM: DES_KM
            },
            where: {
              DES_ID: parsedId
            }
          });
        case 3:
          updateDestino = _context3.v;
          if (!updateDestino) {
            _context3.n = 4;
            break;
          }
          return _context3.a(2, res.status(200).json(updateDestino));
        case 4:
          _context3.n = 6;
          break;
        case 5:
          return _context3.a(2, res.status(400).json({
            message: "Destino n\xE3o existe ou esta inativo"
          }));
        case 6:
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t3 = _context3.v;
          return _context3.a(2, res.status(500).json({
            error: "Erro ao alterar dados do destino: ".concat(_t3)
          }));
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return function putDestino(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteDestino = exports.deleteDestino = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var id, parsedId, destino, _deleteDestino, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          id = req.params.id;
          _context4.p = 1;
          parsedId = parseInt(id); //1. Valido se o destino existe e se esta ativo
          _context4.n = 2;
          return _client["default"].destino.findUnique({
            where: {
              DES_ID: parsedId,
              DES_ATIVO: true
            }
          });
        case 2:
          destino = _context4.v;
          if (!destino) {
            _context4.n = 5;
            break;
          }
          _context4.n = 3;
          return _client["default"].destino.update({
            data: {
              DES_ATIVO: false
            },
            where: {
              DES_ID: parsedId
            }
          });
        case 3:
          _deleteDestino = _context4.v;
          if (!_deleteDestino) {
            _context4.n = 4;
            break;
          }
          return _context4.a(2, res.status(200).json(_deleteDestino));
        case 4:
          _context4.n = 6;
          break;
        case 5:
          return _context4.a(2, res.status(400).json({
            message: "Destino n\xE3o existe ou esta inativo"
          }));
        case 6:
          _context4.n = 8;
          break;
        case 7:
          _context4.p = 7;
          _t4 = _context4.v;
          return _context4.a(2, res.status(500).json({
            error: "Erro ao inativar destino: ".concat(_t4)
          }));
        case 8:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return function deleteDestino(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();