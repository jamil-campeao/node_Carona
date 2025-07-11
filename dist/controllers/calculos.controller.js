"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuantidadesViagensDia = exports.getCalculo = void 0;
var _client = _interopRequireDefault(require("../db/client.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Rota para calcular o valor proporcional de cada passageiro
var getCalculo = exports.getCalculo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$query, mes, ano, preco_gasolina, carro_km, mediaCarro, precoGasolina, inicioMes, ultimoDiaDoMes, fimMes, caronas, caronasPorDia, distanciasPorDia, contagemViagensPassageiro, valoresIndividuais;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, mes = _req$query.mes, ano = _req$query.ano, preco_gasolina = _req$query.preco_gasolina, carro_km = _req$query.carro_km; // Valores padrão caso não sejam informados na query
          mediaCarro = carro_km ? parseFloat(carro_km) : 9.33;
          precoGasolina = preco_gasolina ? parseFloat(preco_gasolina) : 6.29; // Validações
          if (!(!mes || !ano)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Mês e ano são obrigatórios."
          }));
        case 5:
          inicioMes = new Date("".concat(ano, "-").concat(mes, "-01T00:00:00.000Z"));
          ultimoDiaDoMes = new Date(parseInt(ano), parseInt(mes), 0).getDate();
          fimMes = new Date("".concat(ano, "-").concat(mes, "-").concat(ultimoDiaDoMes, "T23:59:59.999Z"));
          _context.prev = 8;
          _context.next = 11;
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
        case 11:
          caronas = _context.sent;
          caronasPorDia = {}; // Para agrupar passageiros únicos por dia (para dividir o custo do carro do dia)
          distanciasPorDia = {}; // Para armazenar a soma dos KM por dia
          contagemViagensPassageiro = {}; // Para contar viagens individuais por passageiro
          // 1. Itero sobre CADA CARONA para agrupar por dia e somar KMs
          caronas.forEach(function (carona) {
            var dataFormatada = carona.CAR_DATA.toISOString().split("T")[0];
            if (!caronasPorDia[dataFormatada]) {
              caronasPorDia[dataFormatada] = new Set();
              distanciasPorDia[dataFormatada] = 0;
            }

            // Adiciono o passageiro ao Set para garantir unicidade no dia (para o custo do carro do dia)
            caronasPorDia[dataFormatada].add(carona.passageiro.PAS_NOME);

            // Somo os KM de TODAS as caronas do dia
            distanciasPorDia[dataFormatada] += parseFloat(carona.destino.DES_KM);

            // CONTADOR DE VIAGENS INDIVIDUAL POR PASSAGEIRO:
            if (!contagemViagensPassageiro[carona.passageiro.PAS_NOME]) {
              contagemViagensPassageiro[carona.passageiro.PAS_NOME] = 0;
            }
            contagemViagensPassageiro[carona.passageiro.PAS_NOME]++;
          });

          // 1. Inicializo a contagem de viagens do motorista (eu) recebebndo o número total de caronas
          contagemViagensPassageiro["Jamil"] = caronas.length;

          // 2. Adiciona (o motorista) aos sets de passageiros por dia.
          Object.keys(caronasPorDia).forEach(function (data) {
            caronasPorDia[data].add("Jamil");
          });

          // 3. Calculo o custo da gasolina para cada dia e divido entre os passageiros da viagem
          valoresIndividuais = {};
          if (!valoresIndividuais["Jamil"]) {
            valoresIndividuais["Jamil"] = {
              viagens: 0,
              valorTotal: 0
            };
          }
          Object.keys(caronasPorDia).forEach(function (data) {
            var passageirosNaViagem = Array.from(caronasPorDia[data]);
            var numPessoasNaViagem = passageirosNaViagem.length;
            var distanciaTotalDoDia = distanciasPorDia[data];
            var consumoPorKm = precoGasolina / mediaCarro;
            var custoViagemDia = consumoPorKm * (distanciaTotalDoDia * 2);
            var custoPorPessoa = custoViagemDia / numPessoasNaViagem;
            passageirosNaViagem.forEach(function (pessoa) {
              if (!valoresIndividuais[pessoa]) {
                valoresIndividuais[pessoa] = {
                  viagens: 0,
                  valorTotal: 0
                };
              }
              valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
            });
          });

          // 4. Resultado final
          res.status(200).json({
            precoGasolina: precoGasolina,
            mediaCarro: mediaCarro,
            detalhesPassageiros: Object.keys(valoresIndividuais).reduce(function (acc, pessoa) {
              // Atribui a contagem de viagens correta para cada passageiro, incluindo eu Jamil.
              acc[pessoa] = {
                viagens: contagemViagensPassageiro[pessoa] || 0,
                // Pega do objeto que conta caronas individuais
                valorTotal: parseFloat(valoresIndividuais[pessoa].valorTotal.toFixed(2))
              };
              return acc;
            }, {})
          });
          _context.next = 28;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](8);
          console.error("Erro no cálculo:", _context.t0);
          res.status(500).json({
            error: "Erro ao calcular valores: ".concat(_context.t0.message || _context.t0)
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 24]]);
  }));
  return function getCalculo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getQuantidadesViagensDia = exports.getQuantidadesViagensDia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query2, mes, ano, dia, dataCompleta, caronas, quantidadesIndividuais;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query2 = req.query, mes = _req$query2.mes, ano = _req$query2.ano, dia = _req$query2.dia; // Validações
          if (!(!mes || !ano || !dia)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "Mês, ano e dia são obrigatórios."
          }));
        case 3:
          dataCompleta = new Date("".concat(ano, "-").concat(mes, "-").concat(dia, " 00:00:00"));
          _context2.prev = 4;
          _context2.next = 7;
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
        case 7:
          caronas = _context2.sent;
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
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](4);
          console.error("Erro ao executar requisição:", _context2.t0);
          res.status(500).json({
            error: "Erro ao executar requisi\xE7\xE3o: ".concat(_context2.t0.message)
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 13]]);
  }));
  return function getQuantidadesViagensDia(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();