"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuantidadesViagensDia = exports.getCalculo = void 0;
var _client = _interopRequireDefault(require("../db/client.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Rota para calcular o valor proporcional de cada passageiro
var getCalculo = exports.getCalculo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$query, mes, ano, preco_gasolina, carro_km, mediaCarro, precoGasolina, nomeMotorista, inicioMes, ultimoDiaDoMes, fimMes, caronas, viagensAgrupadas, contagemViagensPassageiro, valoresIndividuais, _loop, chaveViagem, _t, _t2, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _req$query = req.query, mes = _req$query.mes, ano = _req$query.ano, preco_gasolina = _req$query.preco_gasolina, carro_km = _req$query.carro_km; // Valores padrão caso não sejam informados na query
          mediaCarro = carro_km ? parseFloat(carro_km) : 9.33;
          precoGasolina = preco_gasolina ? parseFloat(preco_gasolina) : 6.54;
          nomeMotorista = 'Jamil'; // Validações
          if (!(!mes || !ano)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "Mês e ano são obrigatórios."
          }));
        case 1:
          inicioMes = new Date("".concat(ano, "-").concat(mes, "-01T00:00:00.000Z"));
          ultimoDiaDoMes = new Date(parseInt(ano), parseInt(mes), 0).getDate();
          fimMes = new Date("".concat(ano, "-").concat(mes, "-").concat(ultimoDiaDoMes, "T23:59:59.999Z"));
          _context2.p = 2;
          _context2.n = 3;
          return _client["default"].carona.findMany({
            where: {
              CAR_DATA: {
                gte: inicioMes,
                lte: fimMes
              }
            },
            include: {
              passageiro: true,
              destino: true
            },
            orderBy: {
              CAR_DATA: "asc"
            }
          });
        case 3:
          caronas = _context2.v;
          //1. Agrupo passageiros por VIAGEM (não por dia)
          viagensAgrupadas = {};
          contagemViagensPassageiro = {};
          caronas.forEach(function (carona) {
            var chaveViagem = "".concat(carona.CAR_DATA.toISOString(), "-").concat(carona.destino.DES_ID);
            if (!viagensAgrupadas[chaveViagem]) {
              viagensAgrupadas[chaveViagem] = {
                passageiros: [],
                distancia: parseFloat(carona.destino.DES_KM)
              };
            }
            var nomePassageiro = carona.passageiro.PAS_NOME;
            viagensAgrupadas[chaveViagem].passageiros.push(nomePassageiro);
            if (!contagemViagensPassageiro[nomePassageiro]) {
              contagemViagensPassageiro[nomePassageiro] = 0;
            }
            contagemViagensPassageiro[nomePassageiro]++;
          });

          // 2. Calculo o custo para cada viagem e distribuo entre os participantes
          valoresIndividuais = {}; //Itera sobre cada VIAGEM ÚNICA que aconteceu
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var viagem, participantes, numPessoasNaViagem, custoTotalDaViagem, custoPorPessoa;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  viagem = viagensAgrupadas[chaveViagem]; //Adiciono eu na lista de participantes da viagem
                  participantes = [].concat(_toConsumableArray(viagem.passageiros), [nomeMotorista]);
                  numPessoasNaViagem = participantes.length; // Calcula o custo total da viagem
                  custoTotalDaViagem = viagem.distancia / mediaCarro * precoGasolina;
                  custoPorPessoa = custoTotalDaViagem / numPessoasNaViagem; // Adiciona o custo ao valor total de cada participante da viagem
                  participantes.forEach(function (pessoa) {
                    if (!valoresIndividuais[pessoa]) {
                      valoresIndividuais[pessoa] = {
                        valorTotal: 0
                      };
                    }
                    valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
                  });
                case 1:
                  return _context.a(2);
              }
            }, _loop);
          });
          _t = _regeneratorKeys(viagensAgrupadas);
        case 4:
          if ((_t2 = _t()).done) {
            _context2.n = 6;
            break;
          }
          chaveViagem = _t2.value;
          return _context2.d(_regeneratorValues(_loop()), 5);
        case 5:
          _context2.n = 4;
          break;
        case 6:
          //3. Contabilizo as viagens do motorista
          // O número de viagens do motorista é o número de viagens únicas que foram agrupadas
          contagemViagensPassageiro[nomeMotorista] = Object.keys(viagensAgrupadas).length;

          // 4. Formatar o resultado final
          todosOsNomes.forEach(function (pessoa) {
            var _valoresIndividuais$p;
            detalhesPassageiros[pessoa] = {
              viagens: contagemViagensPassageiro[pessoa] || 0,
              valorTotal: parseFloat((((_valoresIndividuais$p = valoresIndividuais[pessoa]) === null || _valoresIndividuais$p === void 0 ? void 0 : _valoresIndividuais$p.valorTotal) || 0).toFixed(2))
            };
          });
          res.status(200).json({
            precoGasolina: precoGasolina,
            mediaCarro: mediaCarro,
            detalhesPassageiros: detalhesPassageiros
          });
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t3 = _context2.v;
          console.error("Erro no cálculo:", _t3);
          res.status(500).json({
            error: "Erro ao calcular valores: ".concat(_t3.message || _t3)
          });
        case 8:
          return _context2.a(2);
      }
    }, _callee, null, [[2, 7]]);
  }));
  return function getCalculo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getQuantidadesViagensDia = exports.getQuantidadesViagensDia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query2, mes, ano, dia, dataCompleta, caronas, quantidadesIndividuais, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$query2 = req.query, mes = _req$query2.mes, ano = _req$query2.ano, dia = _req$query2.dia; // Validações
          if (!(!mes || !ano || !dia)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            error: "Mês, ano e dia são obrigatórios."
          }));
        case 1:
          dataCompleta = new Date("".concat(ano, "-").concat(mes, "-").concat(dia, " 00:00:00"));
          _context3.p = 2;
          _context3.n = 3;
          return _client["default"].carona.findMany({
            where: {
              CAR_DATA: {
                equals: dataCompleta // Início do dia
              }
            },
            include: {
              passageiro: true
            },
            orderBy: {
              CAR_DATA: "asc"
            }
          });
        case 3:
          caronas = _context3.v;
          // Organizo as caronas por passageiro
          quantidadesIndividuais = {};
          caronas.forEach(function (_ref3) {
            var passageiro = _ref3.passageiro;
            var nomePassageiro = passageiro.PAS_NOME;
            if (!quantidadesIndividuais[nomePassageiro]) {
              quantidadesIndividuais[nomePassageiro] = {
                viagens: 0
              };
            }
            quantidadesIndividuais[nomePassageiro].viagens += 1;
          });

          // Resultado
          res.json({
            quantidades: quantidadesIndividuais
          });
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t4 = _context3.v;
          console.error("Erro ao executar requisição:", _t4);
          res.status(500).json({
            error: "Erro ao executar requisi\xE7\xE3o: ".concat(_t4.message)
          });
        case 5:
          return _context3.a(2);
      }
    }, _callee2, null, [[2, 4]]);
  }));
  return function getQuantidadesViagensDia(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();