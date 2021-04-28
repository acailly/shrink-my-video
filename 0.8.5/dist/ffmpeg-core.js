var createFFmpegCore = (function () {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (createFFmpegCore) {
    createFFmpegCore = createFFmpegCore || {};

    var f;
    f || (f = typeof createFFmpegCore !== "undefined" ? createFFmpegCore : {});
    var ba, ca;
    f.ready = new Promise(function (a, b) {
      ba = a;
      ca = b;
    });
    var da = {},
      ea;
    for (ea in f) f.hasOwnProperty(ea) && (da[ea] = f[ea]);
    var fa = [],
      ha = "./this.program";
    function ja(a, b) {
      throw b;
    }
    var ka = !1,
      la = !1,
      h = !1,
      ma = !1;
    ka = "object" === typeof window;
    la = "function" === typeof importScripts;
    h =
      "object" === typeof process &&
      "object" === typeof process.versions &&
      "string" === typeof process.versions.node;
    ma = !ka && !h && !la;
    var l = f.ENVIRONMENT_IS_PTHREAD || !1;
    l && (oa = f.buffer);
    var pa = "";
    function qa(a) {
      return f.locateFile ? f.locateFile(a, pa) : pa + a;
    }
    var ra, sa, ta, va;
    if (h) {
      pa = la ? require("path").dirname(pa) + "/" : __dirname + "/";
      ra = function (a, b) {
        ta || (ta = require("fs"));
        va || (va = require("path"));
        a = va.normalize(a);
        return ta.readFileSync(a, b ? null : "utf8");
      };
      sa = function (a) {
        a = ra(a, !0);
        a.buffer || (a = new Uint8Array(a));
        assert(a.buffer);
        return a;
      };
      1 < process.argv.length && (ha = process.argv[1].replace(/\\/g, "/"));
      fa = process.argv.slice(2);
      process.on("uncaughtException", function (a) {
        if (!(a instanceof wa)) throw a;
      });
      process.on("unhandledRejection", n);
      ja = function (a) {
        process.exit(a);
      };
      f.inspect = function () {
        return "[Emscripten Module object]";
      };
      var xa;
      try {
        xa = require("worker_threads");
      } catch (a) {
        throw (
          (console.error(
            'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'
          ),
          a)
        );
      }
      global.Worker = xa.Worker;
    } else if (ma)
      "undefined" != typeof read &&
        (ra = function (a) {
          return read(a);
        }),
        (sa = function (a) {
          if ("function" === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
          a = read(a, "binary");
          assert("object" === typeof a);
          return a;
        }),
        "undefined" != typeof scriptArgs
          ? (fa = scriptArgs)
          : "undefined" != typeof arguments && (fa = arguments),
        "function" === typeof quit &&
          (ja = function (a) {
            quit(a);
          }),
        "undefined" !== typeof print &&
          ("undefined" === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            "undefined" !== typeof printErr ? printErr : print));
    else if (ka || la)
      la
        ? (pa = self.location.href)
        : "undefined" !== typeof document &&
          document.currentScript &&
          (pa = document.currentScript.src),
        _scriptDir && (pa = _scriptDir),
        0 !== pa.indexOf("blob:")
          ? (pa = pa.substr(0, pa.lastIndexOf("/") + 1))
          : (pa = ""),
        h
          ? ((ra = function (a, b) {
              ta || (ta = require("fs"));
              va || (va = require("path"));
              a = va.normalize(a);
              return ta.readFileSync(a, b ? null : "utf8");
            }),
            (sa = function (a) {
              a = ra(a, !0);
              a.buffer || (a = new Uint8Array(a));
              assert(a.buffer);
              return a;
            }))
          : ((ra = function (a) {
              var b = new XMLHttpRequest();
              b.open("GET", a, !1);
              b.send(null);
              return b.responseText;
            }),
            la &&
              (sa = function (a) {
                var b = new XMLHttpRequest();
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response);
              }));
    h &&
      "undefined" === typeof performance &&
      (global.performance = require("perf_hooks").performance);
    var ya = f.print || console.log.bind(console),
      u = f.printErr || console.warn.bind(console);
    for (ea in da) da.hasOwnProperty(ea) && (f[ea] = da[ea]);
    da = null;
    f.arguments && (fa = f.arguments);
    f.thisProgram && (ha = f.thisProgram);
    f.quit && (ja = f.quit);
    var za,
      Aa = 0,
      Ba;
    f.wasmBinary && (Ba = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && n("no native wasm support detected");
    var Ca,
      Da,
      threadInfoStruct = 0,
      selfThreadId = 0,
      Ea = !1;
    function assert(a, b) {
      a || n("Assertion failed: " + b);
    }
    function Fa(a) {
      var b = f["_" + a];
      assert(
        b,
        "Cannot call unknown function " + a + ", make sure it is exported"
      );
      return b;
    }
    function Ga(a, b, c, d) {
      var e = {
          string: function (q) {
            var t = 0;
            if (null !== q && void 0 !== q && 0 !== q) {
              var w = (q.length << 2) + 1;
              t = Ha(w);
              Ia(q, v, t, w);
            }
            return t;
          },
          array: function (q) {
            var t = Ha(q.length);
            y.set(q, t);
            return t;
          },
        },
        g = Fa(a),
        k = [];
      a = 0;
      if (d)
        for (var m = 0; m < d.length; m++) {
          var r = e[c[m]];
          r ? (0 === a && (a = A()), (k[m] = r(d[m]))) : (k[m] = d[m]);
        }
      c = g.apply(null, k);
      c = "string" === b ? C(c) : "boolean" === b ? !!c : c;
      0 !== a && D(a);
      return c;
    }
    function Ja(a, b, c) {
      c = b + c;
      for (var d = ""; !(b >= c); ) {
        var e = a[b++];
        if (!e) break;
        if (e & 128) {
          var g = a[b++] & 63;
          if (192 == (e & 224)) d += String.fromCharCode(((e & 31) << 6) | g);
          else {
            var k = a[b++] & 63;
            e =
              224 == (e & 240)
                ? ((e & 15) << 12) | (g << 6) | k
                : ((e & 7) << 18) | (g << 12) | (k << 6) | (a[b++] & 63);
            65536 > e
              ? (d += String.fromCharCode(e))
              : ((e -= 65536),
                (d += String.fromCharCode(
                  55296 | (e >> 10),
                  56320 | (e & 1023)
                )));
          }
        } else d += String.fromCharCode(e);
      }
      return d;
    }
    function C(a, b) {
      return a ? Ja(v, a, b) : "";
    }
    function Ia(a, b, c, d) {
      if (!(0 < d)) return 0;
      var e = c;
      d = c + d - 1;
      for (var g = 0; g < a.length; ++g) {
        var k = a.charCodeAt(g);
        if (55296 <= k && 57343 >= k) {
          var m = a.charCodeAt(++g);
          k = (65536 + ((k & 1023) << 10)) | (m & 1023);
        }
        if (127 >= k) {
          if (c >= d) break;
          b[c++] = k;
        } else {
          if (2047 >= k) {
            if (c + 1 >= d) break;
            b[c++] = 192 | (k >> 6);
          } else {
            if (65535 >= k) {
              if (c + 2 >= d) break;
              b[c++] = 224 | (k >> 12);
            } else {
              if (c + 3 >= d) break;
              b[c++] = 240 | (k >> 18);
              b[c++] = 128 | ((k >> 12) & 63);
            }
            b[c++] = 128 | ((k >> 6) & 63);
          }
          b[c++] = 128 | (k & 63);
        }
      }
      b[c] = 0;
      return c - e;
    }
    function Ka(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    function La(a) {
      var b = Ka(a) + 1,
        c = Ma(b);
      c && Ia(a, y, c, b);
      return c;
    }
    function Na(a) {
      var b = Ka(a) + 1,
        c = Ha(b);
      Ia(a, y, c, b);
      return c;
    }
    function Pa(a, b, c) {
      for (var d = 0; d < a.length; ++d) y[b++ >> 0] = a.charCodeAt(d);
      c || (y[b >> 0] = 0);
    }
    var oa,
      y,
      v,
      Qa,
      Ra,
      E,
      F,
      G,
      Sa,
      Ta = f.INITIAL_MEMORY || 2146435072;
    if (l) (Ca = f.wasmMemory), (oa = f.buffer);
    else if (f.wasmMemory) Ca = f.wasmMemory;
    else if (
      ((Ca = new WebAssembly.Memory({
        initial: Ta / 65536,
        maximum: Ta / 65536,
        shared: !0,
      })),
      !(Ca.buffer instanceof SharedArrayBuffer))
    )
      throw (
        (u(
          "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"
        ),
        h &&
          console.log(
            "(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"
          ),
        Error("bad memory"))
      );
    Ca && (oa = Ca.buffer);
    Ta = oa.byteLength;
    var Ua = oa;
    oa = Ua;
    f.HEAP8 = y = new Int8Array(Ua);
    f.HEAP16 = Qa = new Int16Array(Ua);
    f.HEAP32 = E = new Int32Array(Ua);
    f.HEAPU8 = v = new Uint8Array(Ua);
    f.HEAPU16 = Ra = new Uint16Array(Ua);
    f.HEAPU32 = F = new Uint32Array(Ua);
    f.HEAPF32 = G = new Float32Array(Ua);
    f.HEAPF64 = Sa = new Float64Array(Ua);
    var H,
      Va = [],
      Wa = [],
      Xa = [],
      Ya = [],
      Za = [];
    function $a() {
      var a = f.preRun.shift();
      Va.unshift(a);
    }
    var ab = 0,
      bb = null,
      cb = null;
    function eb() {
      assert(!l, "addRunDependency cannot be used in a pthread worker");
      ab++;
      f.monitorRunDependencies && f.monitorRunDependencies(ab);
    }
    function fb() {
      ab--;
      f.monitorRunDependencies && f.monitorRunDependencies(ab);
      if (0 == ab && (null !== bb && (clearInterval(bb), (bb = null)), cb)) {
        var a = cb;
        cb = null;
        a();
      }
    }
    f.preloadedImages = {};
    f.preloadedAudios = {};
    function n(a) {
      if (f.onAbort) f.onAbort(a);
      l && console.error("Pthread aborting at " + Error().stack);
      u(a);
      Ea = !0;
      a = new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
      ca(a);
      throw a;
    }
    function gb(a) {
      var b = hb;
      return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a);
    }
    function ib() {
      return gb("data:application/octet-stream;base64,");
    }
    var hb = "ffmpeg-core.wasm";
    ib() || (hb = qa(hb));
    function jb() {
      try {
        if (Ba) return new Uint8Array(Ba);
        if (sa) return sa(hb);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        n(a);
      }
    }
    function kb() {
      return Ba || (!ka && !la) || "function" !== typeof fetch || gb("file://")
        ? Promise.resolve().then(jb)
        : fetch(hb, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok)
                throw "failed to load wasm binary file at '" + hb + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return jb();
            });
    }
    var J,
      L,
      mb = {
        5244604: function () {
          throw "Canceled!";
        },
        5244824: function (a, b) {
          setTimeout(function () {
            lb(a, b);
          }, 0);
        },
        5244926: function () {
          return 5242880;
        },
      };
    function nb(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b) b(f);
        else {
          var c = b.uh;
          "number" === typeof c
            ? void 0 === b.Sf
              ? H.get(c)()
              : H.get(c)(b.Sf)
            : c(void 0 === b.Sf ? null : b.Sf);
        }
      }
    }
    function ob(a) {
      return a.replace(/\b_Z[\w\d_]+/g, function (b) {
        return b === b ? b : b + " [" + b + "]";
      });
    }
    f.dynCall = function (a, b, c) {
      var d;
      -1 != a.indexOf("j")
        ? (d =
            c && c.length
              ? f["dynCall_" + a].apply(null, [b].concat(c))
              : f["dynCall_" + a].call(null, b))
        : (d = H.get(b).apply(null, c));
      return d;
    };
    var pb = 0,
      qb = 0,
      rb = 0;
    function sb(a, b, c) {
      pb = a | 0;
      rb = b | 0;
      qb = c | 0;
    }
    f.registerPthreadPtr = sb;
    function tb(a, b) {
      if (0 >= a || a > y.length || a & 1 || 0 > b) return -28;
      if (0 == b) return 0;
      2147483647 <= b && (b = Infinity);
      var c = Atomics.load(E, M.Uf >> 2),
        d = 0;
      if (
        c == a &&
        Atomics.compareExchange(E, M.Uf >> 2, c, 0) == c &&
        (--b, (d = 1), 0 >= b)
      )
        return 1;
      a = Atomics.notify(E, a >> 2, b);
      if (0 <= a) return a + d;
      throw "Atomics.notify returned an unexpected value " + a;
    }
    f._emscripten_futex_wake = tb;
    function ub(a) {
      if (l)
        throw "Internal Error! cancelThread() can only ever be called from main application thread!";
      if (!a) throw "Internal Error! Null pthread_ptr in cancelThread!";
      M.Df[a].worker.postMessage({ cmd: "cancel" });
    }
    function vb(a) {
      if (l)
        throw "Internal Error! cleanupThread() can only ever be called from main application thread!";
      if (!a) throw "Internal Error! Null pthread_ptr in cleanupThread!";
      E[(a + 12) >> 2] = 0;
      (a = M.Df[a]) && M.zg(a.worker);
    }
    var M = {
      Oh: 1,
      mj: { Hh: 0, Ih: 0 },
      Ff: [],
      Jf: [],
      kj: function () {},
      oi: function () {
        M.wf = Ma(232);
        for (var a = 0; 58 > a; ++a) F[M.wf / 4 + a] = 0;
        E[(M.wf + 12) >> 2] = M.wf;
        a = M.wf + 156;
        E[a >> 2] = a;
        var b = Ma(512);
        for (a = 0; 128 > a; ++a) F[b / 4 + a] = 0;
        Atomics.store(F, (M.wf + 104) >> 2, b);
        Atomics.store(F, (M.wf + 40) >> 2, M.wf);
        Atomics.store(F, (M.wf + 44) >> 2, 42);
        M.Bh();
        sb(M.wf, !la, 1);
        wb(M.wf);
      },
      pi: function () {
        M.Bh();
        ba(f);
        M.receiveObjectTransfer = M.Hi;
        M.setThreadStatus = M.Ki;
        M.threadCancel = M.Oi;
        M.threadExit = M.Pi;
      },
      Bh: function () {
        M.Uf = xb;
      },
      Df: {},
      Cg: [],
      Ki: function () {},
      dh: function () {
        for (; 0 < M.Cg.length; ) M.Cg.pop()();
        l && threadInfoStruct && yb();
      },
      Pi: function (a) {
        var b = pb | 0;
        b &&
          (Atomics.store(F, (b + 4) >> 2, a),
          Atomics.store(F, (b + 0) >> 2, 1),
          Atomics.store(F, (b + 60) >> 2, 1),
          Atomics.store(F, (b + 64) >> 2, 0),
          M.dh(),
          tb(b + 0, 2147483647),
          sb(0, 0, 0),
          (threadInfoStruct = 0),
          l && postMessage({ cmd: "exit" }));
      },
      Oi: function () {
        M.dh();
        Atomics.store(F, (threadInfoStruct + 4) >> 2, -1);
        Atomics.store(F, (threadInfoStruct + 0) >> 2, 1);
        tb(threadInfoStruct + 0, 2147483647);
        threadInfoStruct = selfThreadId = 0;
        sb(0, 0, 0);
        postMessage({ cmd: "cancelDone" });
      },
      Ni: function () {
        for (var a in M.Df) {
          var b = M.Df[a];
          b && b.worker && M.zg(b.worker);
        }
        M.Df = {};
        for (a = 0; a < M.Ff.length; ++a) {
          var c = M.Ff[a];
          c.terminate();
        }
        M.Ff = [];
        for (a = 0; a < M.Jf.length; ++a)
          (c = M.Jf[a]), (b = c.xf), M.Og(b), c.terminate();
        M.Jf = [];
      },
      Og: function (a) {
        if (a) {
          if (a.threadInfoStruct) {
            var b = E[(a.threadInfoStruct + 104) >> 2];
            E[(a.threadInfoStruct + 104) >> 2] = 0;
            zb(b);
            zb(a.threadInfoStruct);
          }
          a.threadInfoStruct = 0;
          a.Jg && a.Qf && zb(a.Qf);
          a.Qf = 0;
          a.worker && (a.worker.xf = null);
        }
      },
      zg: function (a) {
        delete M.Df[a.xf.Kh];
        M.Ff.push(a);
        M.Jf.splice(M.Jf.indexOf(a), 1);
        M.Og(a.xf);
        a.xf = void 0;
      },
      Hi: function () {},
      ui: function (a, b) {
        a.onmessage = function (c) {
          var d = c.data,
            e = d.cmd;
          a.xf && (M.Lg = a.xf.threadInfoStruct);
          if (d.targetThread && d.targetThread != (pb | 0)) {
            var g = M.Df[d.wj];
            g
              ? g.worker.postMessage(c.data, d.transferList)
              : console.error(
                  'Internal error! Worker sent a message "' +
                    e +
                    '" to target pthread ' +
                    d.targetThread +
                    ", but that thread no longer exists!"
                );
          } else if ("processQueuedMainThreadWork" === e) Ab();
          else if ("spawnThread" === e) Bb(c.data);
          else if ("cleanupThread" === e) vb(d.thread);
          else if ("killThread" === e) {
            c = d.thread;
            if (l)
              throw "Internal Error! killThread() can only ever be called from main application thread!";
            if (!c) throw "Internal Error! Null pthread_ptr in killThread!";
            E[(c + 12) >> 2] = 0;
            c = M.Df[c];
            c.worker.terminate();
            M.Og(c);
            M.Jf.splice(M.Jf.indexOf(c.worker), 1);
            c.worker.xf = void 0;
          } else if ("cancelThread" === e) ub(d.thread);
          else if ("loaded" === e)
            (a.loaded = !0), b && b(a), a.ng && (a.ng(), delete a.ng);
          else if ("print" === e) ya("Thread " + d.threadId + ": " + d.text);
          else if ("printErr" === e) u("Thread " + d.threadId + ": " + d.text);
          else if ("alert" === e) alert("Thread " + d.threadId + ": " + d.text);
          else if ("exit" === e)
            a.xf && Atomics.load(F, (a.xf.Kh + 68) >> 2) && M.zg(a);
          else if ("exitProcess" === e) {
            noExitRuntime = !1;
            try {
              Cb(d.returnCode);
            } catch (k) {
              if (k instanceof wa) return;
              throw k;
            }
          } else
            "cancelDone" === e
              ? M.zg(a)
              : "objectTransfer" !== e &&
                ("setimmediate" === c.data.target
                  ? a.postMessage(c.data)
                  : u("worker sent an unknown command " + e));
          M.Lg = void 0;
        };
        a.onerror = function (c) {
          u(
            "pthread sent an error! " +
              c.filename +
              ":" +
              c.lineno +
              ": " +
              c.message
          );
        };
        h &&
          (a.on("message", function (c) {
            a.onmessage({ data: c });
          }),
          a.on("error", function (c) {
            a.onerror(c);
          }),
          a.on("exit", function () {}));
        a.postMessage({
          cmd: "load",
          urlOrBlob: f.mainScriptUrlOrBlob || _scriptDir,
          wasmMemory: Ca,
          wasmModule: Da,
        });
      },
      Vh: function () {
        var a = qa("ffmpeg-core.worker.js");
        M.Ff.push(new Worker(a));
      },
      ki: function () {
        0 == M.Ff.length && (M.Vh(), M.ui(M.Ff[0]));
        return 0 < M.Ff.length ? M.Ff.pop() : null;
      },
      Yi: function (a) {
        for (a = performance.now() + a; performance.now() < a; );
      },
    };
    f.establishStackSpace = function (a) {
      D(a);
    };
    f.getNoExitRuntime = function () {
      return noExitRuntime;
    };
    var Db;
    h
      ? (Db = function () {
          var a = process.hrtime();
          return 1e3 * a[0] + a[1] / 1e6;
        })
      : l
      ? (Db = function () {
          return performance.now() - f.__performance_now_clock_drift;
        })
      : "undefined" !== typeof dateNow
      ? (Db = dateNow)
      : (Db = function () {
          return performance.now();
        });
    function Eb(a) {
      return (E[Fb() >> 2] = a);
    }
    function Gb(a, b) {
      if (0 === a) a = Date.now();
      else if (1 === a || 4 === a) a = Db();
      else return Eb(28), -1;
      E[b >> 2] = (a / 1e3) | 0;
      E[(b + 4) >> 2] = ((a % 1e3) * 1e6) | 0;
      return 0;
    }
    function Hb(a, b) {
      if (l) return N(1, 1, a, b);
      Ya.unshift({ uh: a, Sf: b });
    }
    function Ib(a, b) {
      a = new Date(1e3 * E[a >> 2]);
      E[b >> 2] = a.getUTCSeconds();
      E[(b + 4) >> 2] = a.getUTCMinutes();
      E[(b + 8) >> 2] = a.getUTCHours();
      E[(b + 12) >> 2] = a.getUTCDate();
      E[(b + 16) >> 2] = a.getUTCMonth();
      E[(b + 20) >> 2] = a.getUTCFullYear() - 1900;
      E[(b + 24) >> 2] = a.getUTCDay();
      E[(b + 36) >> 2] = 0;
      E[(b + 32) >> 2] = 0;
      E[(b + 28) >> 2] =
        ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
          864e5) |
        0;
      Ib.hh || (Ib.hh = La("GMT"));
      E[(b + 40) >> 2] = Ib.hh;
      return b;
    }
    function Jb() {
      function a(k) {
        return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
      }
      if (l) return N(2, 1);
      if (!Jb.Xh) {
        Jb.Xh = !0;
        var b = new Date().getFullYear(),
          c = new Date(b, 0, 1),
          d = new Date(b, 6, 1);
        b = c.getTimezoneOffset();
        var e = d.getTimezoneOffset(),
          g = Math.max(b, e);
        E[Kb() >> 2] = 60 * g;
        E[Lb() >> 2] = Number(b != e);
        c = a(c);
        d = a(d);
        c = La(c);
        d = La(d);
        e < b
          ? ((E[Mb() >> 2] = c), (E[(Mb() + 4) >> 2] = d))
          : ((E[Mb() >> 2] = d), (E[(Mb() + 4) >> 2] = c));
      }
    }
    function Nb(a, b) {
      Jb();
      a = new Date(1e3 * E[a >> 2]);
      E[b >> 2] = a.getSeconds();
      E[(b + 4) >> 2] = a.getMinutes();
      E[(b + 8) >> 2] = a.getHours();
      E[(b + 12) >> 2] = a.getDate();
      E[(b + 16) >> 2] = a.getMonth();
      E[(b + 20) >> 2] = a.getFullYear() - 1900;
      E[(b + 24) >> 2] = a.getDay();
      var c = new Date(a.getFullYear(), 0, 1);
      E[(b + 28) >> 2] = ((a.getTime() - c.getTime()) / 864e5) | 0;
      E[(b + 36) >> 2] = -(60 * a.getTimezoneOffset());
      var d = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
      c = c.getTimezoneOffset();
      a = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
      E[(b + 32) >> 2] = a;
      a = E[(Mb() + (a ? 4 : 0)) >> 2];
      E[(b + 40) >> 2] = a;
      return b;
    }
    function Ob(a, b) {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        "." === e
          ? a.splice(d, 1)
          : ".." === e
          ? (a.splice(d, 1), c++)
          : c && (a.splice(d, 1), c--);
      }
      if (b) for (; c; c--) a.unshift("..");
      return a;
    }
    function Pb(a) {
      var b = "/" === a.charAt(0),
        c = "/" === a.substr(-1);
      (a = Ob(
        a.split("/").filter(function (d) {
          return !!d;
        }),
        !b
      ).join("/")) ||
        b ||
        (a = ".");
      a && c && (a += "/");
      return (b ? "/" : "") + a;
    }
    function Qb(a) {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
        .exec(a)
        .slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b) return ".";
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }
    function Rb(a) {
      if ("/" === a) return "/";
      a = Pb(a);
      a = a.replace(/\/$/, "");
      var b = a.lastIndexOf("/");
      return -1 === b ? a : a.substr(b + 1);
    }
    function Sb(a, b) {
      return Pb(a + "/" + b);
    }
    function Tb() {
      if (
        "object" === typeof crypto &&
        "function" === typeof crypto.getRandomValues
      ) {
        var a = new Uint8Array(1);
        return function () {
          crypto.getRandomValues(a);
          return a[0];
        };
      }
      if (h)
        try {
          var b = require("crypto");
          return function () {
            return b.randomBytes(1)[0];
          };
        } catch (c) {}
      return function () {
        n("randomDevice");
      };
    }
    function Ub() {
      for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : O.cwd();
        if ("string" !== typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Ob(
        a.split("/").filter(function (d) {
          return !!d;
        }),
        !b
      ).join("/");
      return (b ? "/" : "") + a || ".";
    }
    function Vb(a, b) {
      function c(k) {
        for (var m = 0; m < k.length && "" === k[m]; m++);
        for (var r = k.length - 1; 0 <= r && "" === k[r]; r--);
        return m > r ? [] : k.slice(m, r - m + 1);
      }
      a = Ub(a).substr(1);
      b = Ub(b).substr(1);
      a = c(a.split("/"));
      b = c(b.split("/"));
      for (var d = Math.min(a.length, b.length), e = d, g = 0; g < d; g++)
        if (a[g] !== b[g]) {
          e = g;
          break;
        }
      d = [];
      for (g = e; g < a.length; g++) d.push("..");
      d = d.concat(b.slice(e));
      return d.join("/");
    }
    var Wb = [];
    function Xb(a, b) {
      Wb[a] = { input: [], output: [], Xf: b };
      O.bh(a, Yb);
    }
    var Yb = {
        open: function (a) {
          var b = Wb[a.node.rdev];
          if (!b) throw new O.$e(43);
          a.tty = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.tty.Xf.flush(a.tty);
        },
        flush: function (a) {
          a.tty.Xf.flush(a.tty);
        },
        read: function (a, b, c, d) {
          if (!a.tty || !a.tty.Xf.wh) throw new O.$e(60);
          for (var e = 0, g = 0; g < d; g++) {
            try {
              var k = a.tty.Xf.wh(a.tty);
            } catch (m) {
              throw new O.$e(29);
            }
            if (void 0 === k && 0 === e) throw new O.$e(6);
            if (null === k || void 0 === k) break;
            e++;
            b[c + g] = k;
          }
          e && (a.node.timestamp = Date.now());
          return e;
        },
        write: function (a, b, c, d) {
          if (!a.tty || !a.tty.Xf.Yg) throw new O.$e(60);
          try {
            for (var e = 0; e < d; e++) a.tty.Xf.Yg(a.tty, b[c + e]);
          } catch (g) {
            throw new O.$e(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        },
      },
      cc = {
        wh: function (a) {
          if (!a.input.length) {
            var b = null;
            if (h) {
              var c = Buffer.Rf ? Buffer.Rf(256) : new Buffer(256),
                d = 0;
              try {
                d = ta.readSync(process.stdin.fd, c, 0, 256, null);
              } catch (e) {
                if (-1 != e.toString().indexOf("EOF")) d = 0;
                else throw e;
              }
              0 < d ? (b = c.slice(0, d).toString("utf-8")) : (b = null);
            } else
              "undefined" != typeof window && "function" == typeof window.prompt
                ? ((b = window.prompt("Input: ")), null !== b && (b += "\n"))
                : "function" == typeof readline &&
                  ((b = readline()), null !== b && (b += "\n"));
            if (!b) return null;
            a.input = Zb(b, !0);
          }
          return a.input.shift();
        },
        Yg: function (a, b) {
          null === b || 10 === b
            ? (ya(Ja(a.output, 0)), (a.output = []))
            : 0 != b && a.output.push(b);
        },
        flush: function (a) {
          a.output &&
            0 < a.output.length &&
            (ya(Ja(a.output, 0)), (a.output = []));
        },
      },
      dc = {
        Yg: function (a, b) {
          null === b || 10 === b
            ? (u(Ja(a.output, 0)), (a.output = []))
            : 0 != b && a.output.push(b);
        },
        flush: function (a) {
          a.output &&
            0 < a.output.length &&
            (u(Ja(a.output, 0)), (a.output = []));
        },
      },
      P = {
        Cf: null,
        hf: function () {
          return P.createNode(null, "/", 16895, 0);
        },
        createNode: function (a, b, c, d) {
          if (O.ri(c) || O.isFIFO(c)) throw new O.$e(63);
          P.Cf ||
            (P.Cf = {
              dir: {
                node: {
                  zf: P.bf.zf,
                  mf: P.bf.mf,
                  lookup: P.bf.lookup,
                  Ef: P.bf.Ef,
                  rename: P.bf.rename,
                  unlink: P.bf.unlink,
                  rmdir: P.bf.rmdir,
                  readdir: P.bf.readdir,
                  symlink: P.bf.symlink,
                },
                stream: { sf: P.cf.sf },
              },
              file: {
                node: { zf: P.bf.zf, mf: P.bf.mf },
                stream: {
                  sf: P.cf.sf,
                  read: P.cf.read,
                  write: P.cf.write,
                  eg: P.cf.eg,
                  Vf: P.cf.Vf,
                  Wf: P.cf.Wf,
                },
              },
              link: {
                node: { zf: P.bf.zf, mf: P.bf.mf, readlink: P.bf.readlink },
                stream: {},
              },
              kh: { node: { zf: P.bf.zf, mf: P.bf.mf }, stream: O.Zh },
            });
          c = O.createNode(a, b, c, d);
          O.jf(c.mode)
            ? ((c.bf = P.Cf.dir.node), (c.cf = P.Cf.dir.stream), (c.af = {}))
            : O.isFile(c.mode)
            ? ((c.bf = P.Cf.file.node),
              (c.cf = P.Cf.file.stream),
              (c.ff = 0),
              (c.af = null))
            : O.Lf(c.mode)
            ? ((c.bf = P.Cf.link.node), (c.cf = P.Cf.link.stream))
            : O.gg(c.mode) && ((c.bf = P.Cf.kh.node), (c.cf = P.Cf.kh.stream));
          c.timestamp = Date.now();
          a && (a.af[b] = c);
          return c;
        },
        fj: function (a) {
          if (a.af && a.af.subarray) {
            for (var b = [], c = 0; c < a.ff; ++c) b.push(a.af[c]);
            return b;
          }
          return a.af;
        },
        gj: function (a) {
          return a.af
            ? a.af.subarray
              ? a.af.subarray(0, a.ff)
              : new Uint8Array(a.af)
            : new Uint8Array(0);
        },
        rh: function (a, b) {
          var c = a.af ? a.af.length : 0;
          c >= b ||
            ((b = Math.max(b, (c * (1048576 > c ? 2 : 1.125)) >>> 0)),
            0 != c && (b = Math.max(b, 256)),
            (c = a.af),
            (a.af = new Uint8Array(b)),
            0 < a.ff && a.af.set(c.subarray(0, a.ff), 0));
        },
        Ii: function (a, b) {
          if (a.ff != b)
            if (0 == b) (a.af = null), (a.ff = 0);
            else {
              if (!a.af || a.af.subarray) {
                var c = a.af;
                a.af = new Uint8Array(b);
                c && a.af.set(c.subarray(0, Math.min(b, a.ff)));
              } else if ((a.af || (a.af = []), a.af.length > b))
                a.af.length = b;
              else for (; a.af.length < b; ) a.af.push(0);
              a.ff = b;
            }
        },
        bf: {
          zf: function (a) {
            var b = {};
            b.dev = O.gg(a.mode) ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            O.jf(a.mode)
              ? (b.size = 4096)
              : O.isFile(a.mode)
              ? (b.size = a.ff)
              : O.Lf(a.mode)
              ? (b.size = a.link.length)
              : (b.size = 0);
            b.atime = new Date(a.timestamp);
            b.mtime = new Date(a.timestamp);
            b.ctime = new Date(a.timestamp);
            b.Wh = 4096;
            b.blocks = Math.ceil(b.size / b.Wh);
            return b;
          },
          mf: function (a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            void 0 !== b.size && P.Ii(a, b.size);
          },
          lookup: function () {
            throw O.Pg[44];
          },
          Ef: function (a, b, c, d) {
            return P.createNode(a, b, c, d);
          },
          rename: function (a, b, c) {
            if (O.jf(a.mode)) {
              try {
                var d = O.Af(b, c);
              } catch (g) {}
              if (d) for (var e in d.af) throw new O.$e(55);
            }
            delete a.parent.af[a.name];
            a.name = c;
            b.af[c] = a;
            a.parent = b;
          },
          unlink: function (a, b) {
            delete a.af[b];
          },
          rmdir: function (a, b) {
            var c = O.Af(a, b),
              d;
            for (d in c.af) throw new O.$e(55);
            delete a.af[b];
          },
          readdir: function (a) {
            var b = [".", ".."],
              c;
            for (c in a.af) a.af.hasOwnProperty(c) && b.push(c);
            return b;
          },
          symlink: function (a, b, c) {
            a = P.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          },
          readlink: function (a) {
            if (!O.Lf(a.mode)) throw new O.$e(28);
            return a.link;
          },
        },
        cf: {
          read: function (a, b, c, d, e) {
            var g = a.node.af;
            if (e >= a.node.ff) return 0;
            a = Math.min(a.node.ff - e, d);
            if (8 < a && g.subarray) b.set(g.subarray(e, e + a), c);
            else for (d = 0; d < a; d++) b[c + d] = g[e + d];
            return a;
          },
          write: function (a, b, c, d, e, g) {
            if (!d) return 0;
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.af || a.af.subarray)) {
              if (g) return (a.af = b.subarray(c, c + d)), (a.ff = d);
              if (0 === a.ff && 0 === e)
                return (a.af = b.slice(c, c + d)), (a.ff = d);
              if (e + d <= a.ff) return a.af.set(b.subarray(c, c + d), e), d;
            }
            P.rh(a, e + d);
            if (a.af.subarray && b.subarray) a.af.set(b.subarray(c, c + d), e);
            else for (g = 0; g < d; g++) a.af[e + g] = b[c + g];
            a.ff = Math.max(a.ff, e + d);
            return d;
          },
          sf: function (a, b, c) {
            1 === c
              ? (b += a.position)
              : 2 === c && O.isFile(a.node.mode) && (b += a.node.ff);
            if (0 > b) throw new O.$e(28);
            return b;
          },
          eg: function (a, b, c) {
            P.rh(a.node, b + c);
            a.node.ff = Math.max(a.node.ff, b + c);
          },
          Vf: function (a, b, c, d, e, g) {
            assert(0 === b);
            if (!O.isFile(a.node.mode)) throw new O.$e(43);
            a = a.node.af;
            if (g & 2 || a.buffer !== oa) {
              if (0 < d || d + c < a.length)
                a.subarray
                  ? (a = a.subarray(d, d + c))
                  : (a = Array.prototype.slice.call(a, d, d + c));
              d = !0;
              g = 16384 * Math.ceil(c / 16384);
              for (b = Ma(g); c < g; ) y[b + c++] = 0;
              c = b;
              if (!c) throw new O.$e(48);
              y.set(a, c);
            } else (d = !1), (c = a.byteOffset);
            return { Gi: c, Ig: d };
          },
          Wf: function (a, b, c, d, e) {
            if (!O.isFile(a.node.mode)) throw new O.$e(43);
            if (e & 2) return 0;
            P.cf.write(a, b, 0, d, c, !1);
            return 0;
          },
        },
      },
      O = {
        root: null,
        lg: [],
        oh: {},
        streams: [],
        zi: 1,
        Bf: null,
        nh: "/",
        Sg: !1,
        Ah: !0,
        lf: {},
        Lh: { Fh: { Qh: 1, Rh: 2 } },
        $e: null,
        Pg: {},
        hi: null,
        Bg: 0,
        jj: function (a) {
          if (!(a instanceof O.$e)) {
            a: {
              var b = Error();
              if (!b.stack) {
                try {
                  throw Error();
                } catch (c) {
                  b = c;
                }
                if (!b.stack) {
                  b = "(no stack trace available)";
                  break a;
                }
              }
              b = b.stack.toString();
            }
            f.extraStackTrace && (b += "\n" + f.extraStackTrace());
            b = ob(b);
            throw a + " : " + b;
          }
          return Eb(a.df);
        },
        ef: function (a, b) {
          a = Ub(O.cwd(), a);
          b = b || {};
          if (!a) return { path: "", node: null };
          var c = { Ng: !0, $g: 0 },
            d;
          for (d in c) void 0 === b[d] && (b[d] = c[d]);
          if (8 < b.$g) throw new O.$e(32);
          a = Ob(
            a.split("/").filter(function (k) {
              return !!k;
            }),
            !1
          );
          var e = O.root;
          c = "/";
          for (d = 0; d < a.length; d++) {
            var g = d === a.length - 1;
            if (g && b.parent) break;
            e = O.Af(e, a[d]);
            c = Sb(c, a[d]);
            O.Mf(e) && (!g || (g && b.Ng)) && (e = e.kg.root);
            if (!g || b.vf)
              for (g = 0; O.Lf(e.mode); )
                if (
                  ((e = O.readlink(c)),
                  (c = Ub(Qb(c), e)),
                  (e = O.ef(c, { $g: b.$g }).node),
                  40 < g++)
                )
                  throw new O.$e(32);
          }
          return { path: c, node: e };
        },
        Hf: function (a) {
          for (var b; ; ) {
            if (O.vg(a))
              return (
                (a = a.hf.Dh),
                b ? ("/" !== a[a.length - 1] ? a + "/" + b : a + b) : a
              );
            b = b ? a.name + "/" + b : a.name;
            a = a.parent;
          }
        },
        Rg: function (a, b) {
          for (var c = 0, d = 0; d < b.length; d++)
            c = ((c << 5) - c + b.charCodeAt(d)) | 0;
          return ((a + c) >>> 0) % O.Bf.length;
        },
        yh: function (a) {
          var b = O.Rg(a.parent.id, a.name);
          a.Of = O.Bf[b];
          O.Bf[b] = a;
        },
        zh: function (a) {
          var b = O.Rg(a.parent.id, a.name);
          if (O.Bf[b] === a) O.Bf[b] = a.Of;
          else
            for (b = O.Bf[b]; b; ) {
              if (b.Of === a) {
                b.Of = a.Of;
                break;
              }
              b = b.Of;
            }
        },
        Af: function (a, b) {
          var c = O.xi(a);
          if (c) throw new O.$e(c, a);
          for (c = O.Bf[O.Rg(a.id, b)]; c; c = c.Of) {
            var d = c.name;
            if (c.parent.id === a.id && d === b) return c;
          }
          return O.lookup(a, b);
        },
        createNode: function (a, b, c, d) {
          a = new O.Nh(a, b, c, d);
          O.yh(a);
          return a;
        },
        Mg: function (a) {
          O.zh(a);
        },
        vg: function (a) {
          return a === a.parent;
        },
        Mf: function (a) {
          return !!a.kg;
        },
        isFile: function (a) {
          return 32768 === (a & 61440);
        },
        jf: function (a) {
          return 16384 === (a & 61440);
        },
        Lf: function (a) {
          return 40960 === (a & 61440);
        },
        gg: function (a) {
          return 8192 === (a & 61440);
        },
        ri: function (a) {
          return 24576 === (a & 61440);
        },
        isFIFO: function (a) {
          return 4096 === (a & 61440);
        },
        isSocket: function (a) {
          return 49152 === (a & 49152);
        },
        ii: {
          r: 0,
          rs: 1052672,
          "r+": 2,
          w: 577,
          wx: 705,
          xw: 705,
          "w+": 578,
          "wx+": 706,
          "xw+": 706,
          a: 1089,
          ax: 1217,
          xa: 1217,
          "a+": 1090,
          "ax+": 1218,
          "xa+": 1218,
        },
        Ch: function (a) {
          var b = O.ii[a];
          if ("undefined" === typeof b)
            throw Error("Unknown file open mode: " + a);
          return b;
        },
        sh: function (a) {
          var b = ["r", "w", "rw"][a & 3];
          a & 512 && (b += "w");
          return b;
        },
        If: function (a, b) {
          if (O.Ah) return 0;
          if (-1 === b.indexOf("r") || a.mode & 292) {
            if (
              (-1 !== b.indexOf("w") && !(a.mode & 146)) ||
              (-1 !== b.indexOf("x") && !(a.mode & 73))
            )
              return 2;
          } else return 2;
          return 0;
        },
        xi: function (a) {
          var b = O.If(a, "x");
          return b ? b : a.bf.lookup ? 0 : 2;
        },
        Xg: function (a, b) {
          try {
            return O.Af(a, b), 20;
          } catch (c) {}
          return O.If(a, "wx");
        },
        wg: function (a, b, c) {
          try {
            var d = O.Af(a, b);
          } catch (e) {
            return e.df;
          }
          if ((a = O.If(a, "wx"))) return a;
          if (c) {
            if (!O.jf(d.mode)) return 54;
            if (O.vg(d) || O.Hf(d) === O.cwd()) return 10;
          } else if (O.jf(d.mode)) return 31;
          return 0;
        },
        yi: function (a, b) {
          return a
            ? O.Lf(a.mode)
              ? 32
              : O.jf(a.mode) && ("r" !== O.sh(b) || b & 512)
              ? 31
              : O.If(a, O.sh(b))
            : 44;
        },
        Ph: 4096,
        Ai: function (a, b) {
          b = b || O.Ph;
          for (a = a || 0; a <= b; a++) if (!O.streams[a]) return a;
          throw new O.$e(33);
        },
        yf: function (a) {
          return O.streams[a];
        },
        mh: function (a, b, c) {
          O.Gg ||
            ((O.Gg = function () {}),
            (O.Gg.prototype = {
              object: {
                get: function () {
                  return this.node;
                },
                set: function (g) {
                  this.node = g;
                },
              },
            }));
          var d = new O.Gg(),
            e;
          for (e in a) d[e] = a[e];
          a = d;
          b = O.Ai(b, c);
          a.fd = b;
          return (O.streams[b] = a);
        },
        $h: function (a) {
          O.streams[a] = null;
        },
        Zh: {
          open: function (a) {
            a.cf = O.ji(a.node.rdev).cf;
            a.cf.open && a.cf.open(a);
          },
          sf: function () {
            throw new O.$e(70);
          },
        },
        Vg: function (a) {
          return a >> 8;
        },
        nj: function (a) {
          return a & 255;
        },
        Nf: function (a, b) {
          return (a << 8) | b;
        },
        bh: function (a, b) {
          O.oh[a] = { cf: b };
        },
        ji: function (a) {
          return O.oh[a];
        },
        vh: function (a) {
          var b = [];
          for (a = [a]; a.length; ) {
            var c = a.pop();
            b.push(c);
            a.push.apply(a, c.lg);
          }
          return b;
        },
        Jh: function (a, b) {
          function c(k) {
            O.Bg--;
            return b(k);
          }
          function d(k) {
            if (k) {
              if (!d.fi) return (d.fi = !0), c(k);
            } else ++g >= e.length && c(null);
          }
          "function" === typeof a && ((b = a), (a = !1));
          O.Bg++;
          1 < O.Bg &&
            u(
              "warning: " +
                O.Bg +
                " FS.syncfs operations in flight at once, probably just doing extra work"
            );
          var e = O.vh(O.root.hf),
            g = 0;
          e.forEach(function (k) {
            if (!k.type.Jh) return d(null);
            k.type.Jh(k, a, d);
          });
        },
        hf: function (a, b, c) {
          var d = "/" === c,
            e = !c;
          if (d && O.root) throw new O.$e(10);
          if (!d && !e) {
            var g = O.ef(c, { Ng: !1 });
            c = g.path;
            g = g.node;
            if (O.Mf(g)) throw new O.$e(10);
            if (!O.jf(g.mode)) throw new O.$e(54);
          }
          b = { type: a, sj: b, Dh: c, lg: [] };
          a = a.hf(b);
          a.hf = b;
          b.root = a;
          d ? (O.root = a) : g && ((g.kg = b), g.hf && g.hf.lg.push(b));
          return a;
        },
        yj: function (a) {
          a = O.ef(a, { Ng: !1 });
          if (!O.Mf(a.node)) throw new O.$e(28);
          a = a.node;
          var b = a.kg,
            c = O.vh(b);
          Object.keys(O.Bf).forEach(function (d) {
            for (d = O.Bf[d]; d; ) {
              var e = d.Of;
              -1 !== c.indexOf(d.hf) && O.Mg(d);
              d = e;
            }
          });
          a.kg = null;
          a.hf.lg.splice(a.hf.lg.indexOf(b), 1);
        },
        lookup: function (a, b) {
          return a.bf.lookup(a, b);
        },
        Ef: function (a, b, c) {
          var d = O.ef(a, { parent: !0 }).node;
          a = Rb(a);
          if (!a || "." === a || ".." === a) throw new O.$e(28);
          var e = O.Xg(d, a);
          if (e) throw new O.$e(e);
          if (!d.bf.Ef) throw new O.$e(63);
          return d.bf.Ef(d, a, b, c);
        },
        create: function (a, b) {
          return O.Ef(a, ((void 0 !== b ? b : 438) & 4095) | 32768, 0);
        },
        mkdir: function (a, b) {
          return O.Ef(a, ((void 0 !== b ? b : 511) & 1023) | 16384, 0);
        },
        pj: function (a, b) {
          a = a.split("/");
          for (var c = "", d = 0; d < a.length; ++d)
            if (a[d]) {
              c += "/" + a[d];
              try {
                O.mkdir(c, b);
              } catch (e) {
                if (20 != e.df) throw e;
              }
            }
        },
        xg: function (a, b, c) {
          "undefined" === typeof c && ((c = b), (b = 438));
          return O.Ef(a, b | 8192, c);
        },
        symlink: function (a, b) {
          if (!Ub(a)) throw new O.$e(44);
          var c = O.ef(b, { parent: !0 }).node;
          if (!c) throw new O.$e(44);
          b = Rb(b);
          var d = O.Xg(c, b);
          if (d) throw new O.$e(d);
          if (!c.bf.symlink) throw new O.$e(63);
          return c.bf.symlink(c, b, a);
        },
        rename: function (a, b) {
          var c = Qb(a),
            d = Qb(b),
            e = Rb(a),
            g = Rb(b);
          var k = O.ef(a, { parent: !0 });
          var m = k.node;
          k = O.ef(b, { parent: !0 });
          k = k.node;
          if (!m || !k) throw new O.$e(44);
          if (m.hf !== k.hf) throw new O.$e(75);
          var r = O.Af(m, e);
          d = Vb(a, d);
          if ("." !== d.charAt(0)) throw new O.$e(28);
          d = Vb(b, c);
          if ("." !== d.charAt(0)) throw new O.$e(55);
          try {
            var q = O.Af(k, g);
          } catch (t) {}
          if (r !== q) {
            c = O.jf(r.mode);
            if ((e = O.wg(m, e, c))) throw new O.$e(e);
            if ((e = q ? O.wg(k, g, c) : O.Xg(k, g))) throw new O.$e(e);
            if (!m.bf.rename) throw new O.$e(63);
            if (O.Mf(r) || (q && O.Mf(q))) throw new O.$e(10);
            if (k !== m && (e = O.If(m, "w"))) throw new O.$e(e);
            try {
              O.lf.willMovePath && O.lf.willMovePath(a, b);
            } catch (t) {
              u(
                "FS.trackingDelegate['willMovePath']('" +
                  a +
                  "', '" +
                  b +
                  "') threw an exception: " +
                  t.message
              );
            }
            O.zh(r);
            try {
              m.bf.rename(r, k, g);
            } catch (t) {
              throw t;
            } finally {
              O.yh(r);
            }
            try {
              if (O.lf.onMovePath) O.lf.onMovePath(a, b);
            } catch (t) {
              u(
                "FS.trackingDelegate['onMovePath']('" +
                  a +
                  "', '" +
                  b +
                  "') threw an exception: " +
                  t.message
              );
            }
          }
        },
        rmdir: function (a) {
          var b = O.ef(a, { parent: !0 }).node,
            c = Rb(a),
            d = O.Af(b, c),
            e = O.wg(b, c, !0);
          if (e) throw new O.$e(e);
          if (!b.bf.rmdir) throw new O.$e(63);
          if (O.Mf(d)) throw new O.$e(10);
          try {
            O.lf.willDeletePath && O.lf.willDeletePath(a);
          } catch (g) {
            u(
              "FS.trackingDelegate['willDeletePath']('" +
                a +
                "') threw an exception: " +
                g.message
            );
          }
          b.bf.rmdir(b, c);
          O.Mg(d);
          try {
            if (O.lf.onDeletePath) O.lf.onDeletePath(a);
          } catch (g) {
            u(
              "FS.trackingDelegate['onDeletePath']('" +
                a +
                "') threw an exception: " +
                g.message
            );
          }
        },
        readdir: function (a) {
          a = O.ef(a, { vf: !0 }).node;
          if (!a.bf.readdir) throw new O.$e(54);
          return a.bf.readdir(a);
        },
        unlink: function (a) {
          var b = O.ef(a, { parent: !0 }).node,
            c = Rb(a),
            d = O.Af(b, c),
            e = O.wg(b, c, !1);
          if (e) throw new O.$e(e);
          if (!b.bf.unlink) throw new O.$e(63);
          if (O.Mf(d)) throw new O.$e(10);
          try {
            O.lf.willDeletePath && O.lf.willDeletePath(a);
          } catch (g) {
            u(
              "FS.trackingDelegate['willDeletePath']('" +
                a +
                "') threw an exception: " +
                g.message
            );
          }
          b.bf.unlink(b, c);
          O.Mg(d);
          try {
            if (O.lf.onDeletePath) O.lf.onDeletePath(a);
          } catch (g) {
            u(
              "FS.trackingDelegate['onDeletePath']('" +
                a +
                "') threw an exception: " +
                g.message
            );
          }
        },
        readlink: function (a) {
          a = O.ef(a).node;
          if (!a) throw new O.$e(44);
          if (!a.bf.readlink) throw new O.$e(28);
          return Ub(O.Hf(a.parent), a.bf.readlink(a));
        },
        stat: function (a, b) {
          a = O.ef(a, { vf: !b }).node;
          if (!a) throw new O.$e(44);
          if (!a.bf.zf) throw new O.$e(63);
          return a.bf.zf(a);
        },
        lstat: function (a) {
          return O.stat(a, !0);
        },
        chmod: function (a, b, c) {
          var d;
          "string" === typeof a ? (d = O.ef(a, { vf: !c }).node) : (d = a);
          if (!d.bf.mf) throw new O.$e(63);
          d.bf.mf(d, {
            mode: (b & 4095) | (d.mode & -4096),
            timestamp: Date.now(),
          });
        },
        lchmod: function (a, b) {
          O.chmod(a, b, !0);
        },
        fchmod: function (a, b) {
          a = O.yf(a);
          if (!a) throw new O.$e(8);
          O.chmod(a.node, b);
        },
        chown: function (a, b, c, d) {
          var e;
          "string" === typeof a ? (e = O.ef(a, { vf: !d }).node) : (e = a);
          if (!e.bf.mf) throw new O.$e(63);
          e.bf.mf(e, { timestamp: Date.now() });
        },
        lchown: function (a, b, c) {
          O.chown(a, b, c, !0);
        },
        fchown: function (a, b, c) {
          a = O.yf(a);
          if (!a) throw new O.$e(8);
          O.chown(a.node, b, c);
        },
        truncate: function (a, b) {
          if (0 > b) throw new O.$e(28);
          var c;
          "string" === typeof a ? (c = O.ef(a, { vf: !0 }).node) : (c = a);
          if (!c.bf.mf) throw new O.$e(63);
          if (O.jf(c.mode)) throw new O.$e(31);
          if (!O.isFile(c.mode)) throw new O.$e(28);
          if ((a = O.If(c, "w"))) throw new O.$e(a);
          c.bf.mf(c, { size: b, timestamp: Date.now() });
        },
        ej: function (a, b) {
          a = O.yf(a);
          if (!a) throw new O.$e(8);
          if (0 === (a.flags & 2097155)) throw new O.$e(28);
          O.truncate(a.node, b);
        },
        zj: function (a, b, c) {
          a = O.ef(a, { vf: !0 }).node;
          a.bf.mf(a, { timestamp: Math.max(b, c) });
        },
        open: function (a, b, c, d, e) {
          if ("" === a) throw new O.$e(44);
          b = "string" === typeof b ? O.Ch(b) : b;
          c =
            b & 64 ? (("undefined" === typeof c ? 438 : c) & 4095) | 32768 : 0;
          if ("object" === typeof a) var g = a;
          else {
            a = Pb(a);
            try {
              g = O.ef(a, { vf: !(b & 131072) }).node;
            } catch (m) {}
          }
          var k = !1;
          if (b & 64)
            if (g) {
              if (b & 128) throw new O.$e(20);
            } else (g = O.Ef(a, c, 0)), (k = !0);
          if (!g) throw new O.$e(44);
          O.gg(g.mode) && (b &= -513);
          if (b & 65536 && !O.jf(g.mode)) throw new O.$e(54);
          if (!k && (c = O.yi(g, b))) throw new O.$e(c);
          b & 512 && O.truncate(g, 0);
          b &= -131713;
          d = O.mh(
            {
              node: g,
              path: O.Hf(g),
              flags: b,
              seekable: !0,
              position: 0,
              cf: g.cf,
              Vi: [],
              error: !1,
            },
            d,
            e
          );
          d.cf.open && d.cf.open(d);
          !f.logReadFiles ||
            b & 1 ||
            (O.Zg || (O.Zg = {}),
            a in O.Zg ||
              ((O.Zg[a] = 1),
              u("FS.trackingDelegate error on read file: " + a)));
          try {
            O.lf.onOpenFile &&
              ((e = 0),
              1 !== (b & 2097155) && (e |= O.Lh.Fh.Qh),
              0 !== (b & 2097155) && (e |= O.Lh.Fh.Rh),
              O.lf.onOpenFile(a, e));
          } catch (m) {
            u(
              "FS.trackingDelegate['onOpenFile']('" +
                a +
                "', flags) threw an exception: " +
                m.message
            );
          }
          return d;
        },
        close: function (a) {
          if (O.hg(a)) throw new O.$e(8);
          a.Kf && (a.Kf = null);
          try {
            a.cf.close && a.cf.close(a);
          } catch (b) {
            throw b;
          } finally {
            O.$h(a.fd);
          }
          a.fd = null;
        },
        hg: function (a) {
          return null === a.fd;
        },
        sf: function (a, b, c) {
          if (O.hg(a)) throw new O.$e(8);
          if (!a.seekable || !a.cf.sf) throw new O.$e(70);
          if (0 != c && 1 != c && 2 != c) throw new O.$e(28);
          a.position = a.cf.sf(a, b, c);
          a.Vi = [];
          return a.position;
        },
        read: function (a, b, c, d, e) {
          if (0 > d || 0 > e) throw new O.$e(28);
          if (O.hg(a)) throw new O.$e(8);
          if (1 === (a.flags & 2097155)) throw new O.$e(8);
          if (O.jf(a.node.mode)) throw new O.$e(31);
          if (!a.cf.read) throw new O.$e(28);
          var g = "undefined" !== typeof e;
          if (!g) e = a.position;
          else if (!a.seekable) throw new O.$e(70);
          b = a.cf.read(a, b, c, d, e);
          g || (a.position += b);
          return b;
        },
        write: function (a, b, c, d, e, g) {
          if (0 > d || 0 > e) throw new O.$e(28);
          if (O.hg(a)) throw new O.$e(8);
          if (0 === (a.flags & 2097155)) throw new O.$e(8);
          if (O.jf(a.node.mode)) throw new O.$e(31);
          if (!a.cf.write) throw new O.$e(28);
          a.seekable && a.flags & 1024 && O.sf(a, 0, 2);
          var k = "undefined" !== typeof e;
          if (!k) e = a.position;
          else if (!a.seekable) throw new O.$e(70);
          b = a.cf.write(a, b, c, d, e, g);
          k || (a.position += b);
          try {
            if (a.path && O.lf.onWriteToFile) O.lf.onWriteToFile(a.path);
          } catch (m) {
            u(
              "FS.trackingDelegate['onWriteToFile']('" +
                a.path +
                "') threw an exception: " +
                m.message
            );
          }
          return b;
        },
        eg: function (a, b, c) {
          if (O.hg(a)) throw new O.$e(8);
          if (0 > b || 0 >= c) throw new O.$e(28);
          if (0 === (a.flags & 2097155)) throw new O.$e(8);
          if (!O.isFile(a.node.mode) && !O.jf(a.node.mode)) throw new O.$e(43);
          if (!a.cf.eg) throw new O.$e(138);
          a.cf.eg(a, b, c);
        },
        Vf: function (a, b, c, d, e, g) {
          if (0 !== (e & 2) && 0 === (g & 2) && 2 !== (a.flags & 2097155))
            throw new O.$e(2);
          if (1 === (a.flags & 2097155)) throw new O.$e(2);
          if (!a.cf.Vf) throw new O.$e(43);
          return a.cf.Vf(a, b, c, d, e, g);
        },
        Wf: function (a, b, c, d, e) {
          return a && a.cf.Wf ? a.cf.Wf(a, b, c, d, e) : 0;
        },
        rj: function () {
          return 0;
        },
        Tf: function (a, b, c) {
          if (!a.cf.Tf) throw new O.$e(59);
          return a.cf.Tf(a, b, c);
        },
        readFile: function (a, b) {
          b = b || {};
          b.flags = b.flags || "r";
          b.encoding = b.encoding || "binary";
          if ("utf8" !== b.encoding && "binary" !== b.encoding)
            throw Error('Invalid encoding type "' + b.encoding + '"');
          var c,
            d = O.open(a, b.flags);
          a = O.stat(a).size;
          var e = new Uint8Array(a);
          O.read(d, e, 0, a, 0);
          "utf8" === b.encoding
            ? (c = Ja(e, 0))
            : "binary" === b.encoding && (c = e);
          O.close(d);
          return c;
        },
        writeFile: function (a, b, c) {
          c = c || {};
          c.flags = c.flags || "w";
          a = O.open(a, c.flags, c.mode);
          if ("string" === typeof b) {
            var d = new Uint8Array(Ka(b) + 1);
            b = Ia(b, d, 0, d.length);
            O.write(a, d, 0, b, void 0, c.Yh);
          } else if (ArrayBuffer.isView(b))
            O.write(a, b, 0, b.byteLength, void 0, c.Yh);
          else throw Error("Unsupported data type");
          O.close(a);
        },
        cwd: function () {
          return O.nh;
        },
        chdir: function (a) {
          a = O.ef(a, { vf: !0 });
          if (null === a.node) throw new O.$e(44);
          if (!O.jf(a.node.mode)) throw new O.$e(54);
          var b = O.If(a.node, "x");
          if (b) throw new O.$e(b);
          O.nh = a.path;
        },
        bi: function () {
          O.mkdir("/tmp");
          O.mkdir("/home");
          O.mkdir("/home/web_user");
        },
        ai: function () {
          O.mkdir("/dev");
          O.bh(O.Nf(1, 3), {
            read: function () {
              return 0;
            },
            write: function (b, c, d, e) {
              return e;
            },
          });
          O.xg("/dev/null", O.Nf(1, 3));
          Xb(O.Nf(5, 0), cc);
          Xb(O.Nf(6, 0), dc);
          O.xg("/dev/tty", O.Nf(5, 0));
          O.xg("/dev/tty1", O.Nf(6, 0));
          var a = Tb();
          O.Gf("/dev", "random", a);
          O.Gf("/dev", "urandom", a);
          O.mkdir("/dev/shm");
          O.mkdir("/dev/shm/tmp");
        },
        di: function () {
          O.mkdir("/proc");
          O.mkdir("/proc/self");
          O.mkdir("/proc/self/fd");
          O.hf(
            {
              hf: function () {
                var a = O.createNode("/proc/self", "fd", 16895, 73);
                a.bf = {
                  lookup: function (b, c) {
                    var d = O.yf(+c);
                    if (!d) throw new O.$e(8);
                    b = {
                      parent: null,
                      hf: { Dh: "fake" },
                      bf: {
                        readlink: function () {
                          return d.path;
                        },
                      },
                    };
                    return (b.parent = b);
                  },
                };
                return a;
              },
            },
            {},
            "/proc/self/fd"
          );
        },
        ei: function () {
          f.stdin
            ? O.Gf("/dev", "stdin", f.stdin)
            : O.symlink("/dev/tty", "/dev/stdin");
          f.stdout
            ? O.Gf("/dev", "stdout", null, f.stdout)
            : O.symlink("/dev/tty", "/dev/stdout");
          f.stderr
            ? O.Gf("/dev", "stderr", null, f.stderr)
            : O.symlink("/dev/tty1", "/dev/stderr");
          O.open("/dev/stdin", "r");
          O.open("/dev/stdout", "w");
          O.open("/dev/stderr", "w");
        },
        qh: function () {
          O.$e ||
            ((O.$e = function (a, b) {
              this.node = b;
              this.Ji = function (c) {
                this.df = c;
              };
              this.Ji(a);
              this.message = "FS error";
            }),
            (O.$e.prototype = Error()),
            (O.$e.prototype.constructor = O.$e),
            [44].forEach(function (a) {
              O.Pg[a] = new O.$e(a);
              O.Pg[a].stack = "<generic error, no stack>";
            }));
        },
        Mi: function () {
          O.qh();
          O.Bf = Array(4096);
          O.hf(P, {}, "/");
          O.bi();
          O.ai();
          O.di();
          O.hi = { MEMFS: P };
        },
        fg: function (a, b, c) {
          O.fg.Sg = !0;
          O.qh();
          f.stdin = a || f.stdin;
          f.stdout = b || f.stdout;
          f.stderr = c || f.stderr;
          O.ei();
        },
        quit: function () {
          O.fg.Sg = !1;
          var a = f._fflush;
          a && a(0);
          for (a = 0; a < O.streams.length; a++) {
            var b = O.streams[a];
            b && O.close(b);
          }
        },
        Qg: function (a, b) {
          var c = 0;
          a && (c |= 365);
          b && (c |= 146);
          return c;
        },
        dj: function (a, b) {
          a = O.Kg(a, b);
          if (a.exists) return a.object;
          Eb(a.error);
          return null;
        },
        Kg: function (a, b) {
          try {
            var c = O.ef(a, { vf: !b });
            a = c.path;
          } catch (e) {}
          var d = {
            vg: !1,
            exists: !1,
            error: 0,
            name: null,
            path: null,
            object: null,
            Bi: !1,
            Di: null,
            Ci: null,
          };
          try {
            (c = O.ef(a, { parent: !0 })),
              (d.Bi = !0),
              (d.Di = c.path),
              (d.Ci = c.node),
              (d.name = Rb(a)),
              (c = O.ef(a, { vf: !b })),
              (d.exists = !0),
              (d.path = c.path),
              (d.object = c.node),
              (d.name = c.node.name),
              (d.vg = "/" === c.path);
          } catch (e) {
            d.error = e.df;
          }
          return d;
        },
        bj: function (a, b) {
          a = "string" === typeof a ? a : O.Hf(a);
          for (b = b.split("/").reverse(); b.length; ) {
            var c = b.pop();
            if (c) {
              var d = Sb(a, c);
              try {
                O.mkdir(d);
              } catch (e) {}
              a = d;
            }
          }
          return d;
        },
        ci: function (a, b, c, d, e) {
          a = Sb("string" === typeof a ? a : O.Hf(a), b);
          return O.create(a, O.Qg(d, e));
        },
        lh: function (a, b, c, d, e, g) {
          a = b ? Sb("string" === typeof a ? a : O.Hf(a), b) : a;
          d = O.Qg(d, e);
          e = O.create(a, d);
          if (c) {
            if ("string" === typeof c) {
              a = Array(c.length);
              b = 0;
              for (var k = c.length; b < k; ++b) a[b] = c.charCodeAt(b);
              c = a;
            }
            O.chmod(e, d | 146);
            a = O.open(e, "w");
            O.write(a, c, 0, c.length, 0, g);
            O.close(a);
            O.chmod(e, d);
          }
          return e;
        },
        Gf: function (a, b, c, d) {
          a = Sb("string" === typeof a ? a : O.Hf(a), b);
          b = O.Qg(!!c, !!d);
          O.Gf.Vg || (O.Gf.Vg = 64);
          var e = O.Nf(O.Gf.Vg++, 0);
          O.bh(e, {
            open: function (g) {
              g.seekable = !1;
            },
            close: function () {
              d && d.buffer && d.buffer.length && d(10);
            },
            read: function (g, k, m, r) {
              for (var q = 0, t = 0; t < r; t++) {
                try {
                  var w = c();
                } catch (B) {
                  throw new O.$e(29);
                }
                if (void 0 === w && 0 === q) throw new O.$e(6);
                if (null === w || void 0 === w) break;
                q++;
                k[m + t] = w;
              }
              q && (g.node.timestamp = Date.now());
              return q;
            },
            write: function (g, k, m, r) {
              for (var q = 0; q < r; q++)
                try {
                  d(k[m + q]);
                } catch (t) {
                  throw new O.$e(29);
                }
              r && (g.node.timestamp = Date.now());
              return q;
            },
          });
          return O.xg(a, b, e);
        },
        th: function (a) {
          if (a.Tg || a.si || a.link || a.af) return !0;
          var b = !0;
          if ("undefined" !== typeof XMLHttpRequest)
            throw Error(
              "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
            );
          if (ra)
            try {
              (a.af = Zb(ra(a.url), !0)), (a.ff = a.af.length);
            } catch (c) {
              b = !1;
            }
          else throw Error("Cannot load without read() or XMLHttpRequest.");
          b || Eb(29);
          return b;
        },
        aj: function (a, b, c, d, e) {
          function g() {
            this.Ug = !1;
            this.Rf = [];
          }
          g.prototype.get = function (q) {
            if (!(q > this.length - 1 || 0 > q)) {
              var t = q % this.chunkSize;
              return this.xh((q / this.chunkSize) | 0)[t];
            }
          };
          g.prototype.Uh = function (q) {
            this.xh = q;
          };
          g.prototype.jh = function () {
            var q = new XMLHttpRequest();
            q.open("HEAD", c, !1);
            q.send(null);
            if (!((200 <= q.status && 300 > q.status) || 304 === q.status))
              throw Error("Couldn't load " + c + ". Status: " + q.status);
            var t = Number(q.getResponseHeader("Content-length")),
              w,
              B = (w = q.getResponseHeader("Accept-Ranges")) && "bytes" === w;
            q = (w = q.getResponseHeader("Content-Encoding")) && "gzip" === w;
            var p = 1048576;
            B || (p = t);
            var x = this;
            x.Uh(function (z) {
              var I = z * p,
                W = (z + 1) * p - 1;
              W = Math.min(W, t - 1);
              if ("undefined" === typeof x.Rf[z]) {
                var db = x.Rf;
                if (I > W)
                  throw Error(
                    "invalid range (" +
                      I +
                      ", " +
                      W +
                      ") or no bytes requested!"
                  );
                if (W > t - 1)
                  throw Error(
                    "only " + t + " bytes available! programmer error!"
                  );
                var K = new XMLHttpRequest();
                K.open("GET", c, !1);
                t !== p && K.setRequestHeader("Range", "bytes=" + I + "-" + W);
                "undefined" != typeof Uint8Array &&
                  (K.responseType = "arraybuffer");
                K.overrideMimeType &&
                  K.overrideMimeType("text/plain; charset=x-user-defined");
                K.send(null);
                if (!((200 <= K.status && 300 > K.status) || 304 === K.status))
                  throw Error("Couldn't load " + c + ". Status: " + K.status);
                I =
                  void 0 !== K.response
                    ? new Uint8Array(K.response || [])
                    : Zb(K.responseText || "", !0);
                db[z] = I;
              }
              if ("undefined" === typeof x.Rf[z]) throw Error("doXHR failed!");
              return x.Rf[z];
            });
            if (q || !t)
              (p = t = 1),
                (p = t = this.xh(0).length),
                ya(
                  "LazyFiles on gzip forces download of the whole file when length is accessed"
                );
            this.Th = t;
            this.Sh = p;
            this.Ug = !0;
          };
          if ("undefined" !== typeof XMLHttpRequest) {
            if (!la)
              throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var k = new g();
            Object.defineProperties(k, {
              length: {
                get: function () {
                  this.Ug || this.jh();
                  return this.Th;
                },
              },
              chunkSize: {
                get: function () {
                  this.Ug || this.jh();
                  return this.Sh;
                },
              },
            });
            k = { Tg: !1, af: k };
          } else k = { Tg: !1, url: c };
          var m = O.ci(a, b, k, d, e);
          k.af ? (m.af = k.af) : k.url && ((m.af = null), (m.url = k.url));
          Object.defineProperties(m, {
            ff: {
              get: function () {
                return this.af.length;
              },
            },
          });
          var r = {};
          Object.keys(m.cf).forEach(function (q) {
            var t = m.cf[q];
            r[q] = function () {
              if (!O.th(m)) throw new O.$e(29);
              return t.apply(null, arguments);
            };
          });
          r.read = function (q, t, w, B, p) {
            if (!O.th(m)) throw new O.$e(29);
            q = q.node.af;
            if (p >= q.length) return 0;
            B = Math.min(q.length - p, B);
            if (q.slice) for (var x = 0; x < B; x++) t[w + x] = q[p + x];
            else for (x = 0; x < B; x++) t[w + x] = q.get(p + x);
            return B;
          };
          m.cf = r;
          return m;
        },
        cj: function (a, b, c, d, e, g, k, m, r, q) {
          function t(B) {
            function p(z) {
              q && q();
              m || O.lh(a, b, z, d, e, r);
              g && g();
              fb();
            }
            var x = !1;
            f.preloadPlugins.forEach(function (z) {
              !x &&
                z.canHandle(w) &&
                (z.handle(B, w, p, function () {
                  k && k();
                  fb();
                }),
                (x = !0));
            });
            x || p(B);
          }
          ec.fg();
          var w = b ? Ub(Sb(a, b)) : a;
          eb();
          "string" == typeof c
            ? ec.Wi(
                c,
                function (B) {
                  t(B);
                },
                k
              )
            : t(c);
        },
        indexedDB: function () {
          return (
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB
          );
        },
        fh: function () {
          return "EM_FS_" + window.location.pathname;
        },
        gh: 20,
        dg: "FILE_DATA",
        vj: function (a, b, c) {
          b = b || function () {};
          c = c || function () {};
          var d = O.indexedDB();
          try {
            var e = d.open(O.fh(), O.gh);
          } catch (g) {
            return c(g);
          }
          e.onupgradeneeded = function () {
            ya("creating db");
            e.result.createObjectStore(O.dg);
          };
          e.onsuccess = function () {
            var g = e.result.transaction([O.dg], "readwrite"),
              k = g.objectStore(O.dg),
              m = 0,
              r = 0,
              q = a.length;
            a.forEach(function (t) {
              t = k.put(O.Kg(t).object.af, t);
              t.onsuccess = function () {
                m++;
                m + r == q && (0 == r ? b() : c());
              };
              t.onerror = function () {
                r++;
                m + r == q && (0 == r ? b() : c());
              };
            });
            g.onerror = c;
          };
          e.onerror = c;
        },
        lj: function (a, b, c) {
          b = b || function () {};
          c = c || function () {};
          var d = O.indexedDB();
          try {
            var e = d.open(O.fh(), O.gh);
          } catch (g) {
            return c(g);
          }
          e.onupgradeneeded = c;
          e.onsuccess = function () {
            var g = e.result;
            try {
              var k = g.transaction([O.dg], "readonly");
            } catch (w) {
              c(w);
              return;
            }
            var m = k.objectStore(O.dg),
              r = 0,
              q = 0,
              t = a.length;
            a.forEach(function (w) {
              var B = m.get(w);
              B.onsuccess = function () {
                O.Kg(w).exists && O.unlink(w);
                O.lh(Qb(w), Rb(w), B.result, !0, !0, !0);
                r++;
                r + q == t && (0 == q ? b() : c());
              };
              B.onerror = function () {
                q++;
                r + q == t && (0 == q ? b() : c());
              };
            });
            k.onerror = c;
          };
          e.onerror = c;
        },
      },
      fc = {};
    function hc(a, b, c) {
      try {
        var d = a(b);
      } catch (e) {
        if (e && e.node && Pb(b) !== Pb(O.Hf(e.node))) return -54;
        throw e;
      }
      E[c >> 2] = d.dev;
      E[(c + 4) >> 2] = 0;
      E[(c + 8) >> 2] = d.ino;
      E[(c + 12) >> 2] = d.mode;
      E[(c + 16) >> 2] = d.nlink;
      E[(c + 20) >> 2] = d.uid;
      E[(c + 24) >> 2] = d.gid;
      E[(c + 28) >> 2] = d.rdev;
      E[(c + 32) >> 2] = 0;
      L = [
        d.size >>> 0,
        ((J = d.size),
        1 <= +Math.abs(J)
          ? 0 < J
            ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      E[(c + 40) >> 2] = L[0];
      E[(c + 44) >> 2] = L[1];
      E[(c + 48) >> 2] = 4096;
      E[(c + 52) >> 2] = d.blocks;
      E[(c + 56) >> 2] = (d.atime.getTime() / 1e3) | 0;
      E[(c + 60) >> 2] = 0;
      E[(c + 64) >> 2] = (d.mtime.getTime() / 1e3) | 0;
      E[(c + 68) >> 2] = 0;
      E[(c + 72) >> 2] = (d.ctime.getTime() / 1e3) | 0;
      E[(c + 76) >> 2] = 0;
      L = [
        d.ino >>> 0,
        ((J = d.ino),
        1 <= +Math.abs(J)
          ? 0 < J
            ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      E[(c + 80) >> 2] = L[0];
      E[(c + 84) >> 2] = L[1];
      return 0;
    }
    var ic = void 0;
    function Q() {
      ic += 4;
      return E[(ic - 4) >> 2];
    }
    function jc(a) {
      a = O.yf(a);
      if (!a) throw new O.$e(8);
      return a;
    }
    function kc(a, b, c, d, e) {
      if (l) return N(3, 1, a, b, c, d, e);
      try {
        e = 0;
        for (
          var g = b ? E[b >> 2] : 0,
            k = b ? E[(b + 4) >> 2] : 0,
            m = c ? E[c >> 2] : 0,
            r = c ? E[(c + 4) >> 2] : 0,
            q = d ? E[d >> 2] : 0,
            t = d ? E[(d + 4) >> 2] : 0,
            w = 0,
            B = 0,
            p = 0,
            x = 0,
            z = 0,
            I = 0,
            W = (b ? E[b >> 2] : 0) | (c ? E[c >> 2] : 0) | (d ? E[d >> 2] : 0),
            db =
              (b ? E[(b + 4) >> 2] : 0) |
              (c ? E[(c + 4) >> 2] : 0) |
              (d ? E[(d + 4) >> 2] : 0),
            K = 0;
          K < a;
          K++
        ) {
          var Y = 1 << K % 32;
          if (32 > K ? W & Y : db & Y) {
            var ia = O.yf(K);
            if (!ia) throw new O.$e(8);
            var na = 5;
            ia.cf.Yf && (na = ia.cf.Yf(ia));
            na & 1 &&
              (32 > K ? g & Y : k & Y) &&
              (32 > K ? (w |= Y) : (B |= Y), e++);
            na & 4 &&
              (32 > K ? m & Y : r & Y) &&
              (32 > K ? (p |= Y) : (x |= Y), e++);
            na & 2 &&
              (32 > K ? q & Y : t & Y) &&
              (32 > K ? (z |= Y) : (I |= Y), e++);
          }
        }
        b && ((E[b >> 2] = w), (E[(b + 4) >> 2] = B));
        c && ((E[c >> 2] = p), (E[(c + 4) >> 2] = x));
        d && ((E[d >> 2] = z), (E[(d + 4) >> 2] = I));
        return e;
      } catch (ua) {
        return (
          ("undefined" !== typeof O && ua instanceof O.$e) || n(ua), -ua.df
        );
      }
    }
    function lc(a, b) {
      if (l) return N(4, 1, a, b);
      try {
        a = C(a);
        if (b & -8) var c = -28;
        else {
          var d;
          (d = O.ef(a, { vf: !0 }).node)
            ? ((a = ""),
              b & 4 && (a += "r"),
              b & 2 && (a += "w"),
              b & 1 && (a += "x"),
              (c = a && O.If(d, a) ? -2 : 0))
            : (c = -44);
        }
        return c;
      } catch (e) {
        return ("undefined" !== typeof O && e instanceof O.$e) || n(e), -e.df;
      }
    }
    function mc(a, b, c) {
      if (l) return N(5, 1, a, b, c);
      ic = c;
      try {
        var d = jc(a);
        switch (b) {
          case 0:
            var e = Q();
            return 0 > e ? -28 : O.open(d.path, d.flags, 0, e).fd;
          case 1:
          case 2:
            return 0;
          case 3:
            return d.flags;
          case 4:
            return (e = Q()), (d.flags |= e), 0;
          case 12:
            return (e = Q()), (Qa[(e + 0) >> 1] = 2), 0;
          case 13:
          case 14:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return Eb(28), -1;
          default:
            return -28;
        }
      } catch (g) {
        return ("undefined" !== typeof O && g instanceof O.$e) || n(g), -g.df;
      }
    }
    function nc(a, b) {
      if (l) return N(6, 1, a, b);
      try {
        var c = jc(a);
        return hc(O.stat, c.path, b);
      } catch (d) {
        return ("undefined" !== typeof O && d instanceof O.$e) || n(d), -d.df;
      }
    }
    function oc(a, b, c) {
      if (l) return N(7, 1, a, b, c);
      try {
        var d = jc(a);
        d.Kf || (d.Kf = O.readdir(d.path));
        a = 0;
        for (
          var e = O.sf(d, 0, 1), g = Math.floor(e / 280);
          g < d.Kf.length && a + 280 <= c;

        ) {
          var k = d.Kf[g];
          if ("." === k[0]) {
            var m = 1;
            var r = 4;
          } else {
            var q = O.Af(d.node, k);
            m = q.id;
            r = O.gg(q.mode) ? 2 : O.jf(q.mode) ? 4 : O.Lf(q.mode) ? 10 : 8;
          }
          L = [
            m >>> 0,
            ((J = m),
            1 <= +Math.abs(J)
              ? 0 < J
                ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          E[(b + a) >> 2] = L[0];
          E[(b + a + 4) >> 2] = L[1];
          L = [
            (280 * (g + 1)) >>> 0,
            ((J = 280 * (g + 1)),
            1 <= +Math.abs(J)
              ? 0 < J
                ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          E[(b + a + 8) >> 2] = L[0];
          E[(b + a + 12) >> 2] = L[1];
          Qa[(b + a + 16) >> 1] = 280;
          y[(b + a + 18) >> 0] = r;
          Ia(k, v, b + a + 19, 256);
          a += 280;
          g += 1;
        }
        O.sf(d, 280 * g, 0);
        return a;
      } catch (t) {
        return ("undefined" !== typeof O && t instanceof O.$e) || n(t), -t.df;
      }
    }
    function pc(a, b) {
      if (l) return N(8, 1, a, b);
      try {
        return (
          qc(b, 0, 136),
          (E[b >> 2] = 1),
          (E[(b + 4) >> 2] = 2),
          (E[(b + 8) >> 2] = 3),
          (E[(b + 12) >> 2] = 4),
          0
        );
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
      }
    }
    function rc(a, b, c) {
      if (l) return N(9, 1, a, b, c);
      ic = c;
      try {
        var d = jc(a);
        switch (b) {
          case 21509:
          case 21505:
            return d.tty ? 0 : -59;
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508:
            return d.tty ? 0 : -59;
          case 21519:
            if (!d.tty) return -59;
            var e = Q();
            return (E[e >> 2] = 0);
          case 21520:
            return d.tty ? -28 : -59;
          case 21531:
            return (e = Q()), O.Tf(d, b, e);
          case 21523:
            return d.tty ? 0 : -59;
          case 21524:
            return d.tty ? 0 : -59;
          default:
            n("bad ioctl syscall " + b);
        }
      } catch (g) {
        return ("undefined" !== typeof O && g instanceof O.$e) || n(g), -g.df;
      }
    }
    function sc(a, b) {
      if (l) return N(10, 1, a, b);
      try {
        return (a = C(a)), hc(O.lstat, a, b);
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
      }
    }
    function tc(a, b) {
      if (l) return N(11, 1, a, b);
      try {
        return (
          (a = C(a)),
          (a = Pb(a)),
          "/" === a[a.length - 1] && (a = a.substr(0, a.length - 1)),
          O.mkdir(a, b, 0),
          0
        );
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
      }
    }
    function uc(a, b, c, d, e, g) {
      if (l) return N(12, 1, a, b, c, d, e, g);
      try {
        a: {
          g <<= 12;
          var k = !1;
          if (0 !== (d & 16) && 0 !== a % 16384) var m = -28;
          else {
            if (0 !== (d & 32)) {
              var r = vc(16384, b);
              if (!r) {
                m = -48;
                break a;
              }
              qc(r, 0, b);
              k = !0;
            } else {
              var q = O.yf(e);
              if (!q) {
                m = -8;
                break a;
              }
              var t = O.Vf(q, a, b, g, c, d);
              r = t.Gi;
              k = t.Ig;
            }
            fc[r] = { wi: r, ti: b, Ig: k, fd: e, Fi: c, flags: d, offset: g };
            m = r;
          }
        }
        return m;
      } catch (w) {
        return ("undefined" !== typeof O && w instanceof O.$e) || n(w), -w.df;
      }
    }
    function wc(a, b) {
      if (l) return N(13, 1, a, b);
      try {
        if (-1 === (a | 0) || 0 === b) var c = -28;
        else {
          var d = fc[a];
          if (d && b === d.ti) {
            var e = O.yf(d.fd);
            if (d.Fi & 2) {
              var g = d.flags,
                k = d.offset,
                m = v.slice(a, a + b);
              O.Wf(e, m, k, b, g);
            }
            fc[a] = null;
            d.Ig && zb(d.wi);
          }
          c = 0;
        }
        return c;
      } catch (r) {
        return ("undefined" !== typeof O && r instanceof O.$e) || n(r), -r.df;
      }
    }
    function xc(a, b, c) {
      if (l) return N(14, 1, a, b, c);
      ic = c;
      try {
        var d = C(a),
          e = Q();
        return O.open(d, b, e).fd;
      } catch (g) {
        return ("undefined" !== typeof O && g instanceof O.$e) || n(g), -g.df;
      }
    }
    function yc(a, b, c) {
      if (l) return N(15, 1, a, b, c);
      try {
        for (var d = (c = 0); d < b; d++) {
          var e = a + 8 * d,
            g = Qa[(e + 4) >> 1],
            k = 32,
            m = O.yf(E[e >> 2]);
          m && ((k = 5), m.cf.Yf && (k = m.cf.Yf(m)));
          (k &= g | 24) && c++;
          Qa[(e + 6) >> 1] = k;
        }
        return c;
      } catch (r) {
        return ("undefined" !== typeof O && r instanceof O.$e) || n(r), -r.df;
      }
    }
    function zc(a, b, c, d) {
      if (l) return N(16, 1, a, b, c, d);
      try {
        return (
          d &&
            ((E[d >> 2] = -1),
            (E[(d + 4) >> 2] = -1),
            (E[(d + 8) >> 2] = -1),
            (E[(d + 12) >> 2] = -1)),
          0
        );
      } catch (e) {
        return ("undefined" !== typeof O && e instanceof O.$e) || n(e), -e.df;
      }
    }
    function Ac(a, b, c) {
      if (l) return N(17, 1, a, b, c);
      try {
        var d = jc(a);
        return O.read(d, y, b, c);
      } catch (e) {
        return ("undefined" !== typeof O && e instanceof O.$e) || n(e), -e.df;
      }
    }
    function Bc(a, b) {
      if (l) return N(18, 1, a, b);
      try {
        return (a = C(a)), (b = C(b)), O.rename(a, b), 0;
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
      }
    }
    function Cc(a) {
      if (l) return N(19, 1, a);
      try {
        return (a = C(a)), O.rmdir(a), 0;
      } catch (b) {
        return ("undefined" !== typeof O && b instanceof O.$e) || n(b), -b.df;
      }
    }
    var R = {
      hf: function () {
        f.websocket =
          f.websocket && "object" === typeof f.websocket ? f.websocket : {};
        f.websocket.Hg = {};
        f.websocket.on = function (a, b) {
          "function" === typeof b && (this.Hg[a] = b);
          return this;
        };
        f.websocket.emit = function (a, b) {
          "function" === typeof this.Hg[a] && this.Hg[a].call(this, b);
        };
        return O.createNode(null, "/", 16895, 0);
      },
      createSocket: function (a, b, c) {
        b &= -526337;
        c && assert((1 == b) == (6 == c));
        a = {
          family: a,
          type: b,
          protocol: c,
          kf: null,
          error: null,
          mg: {},
          pending: [],
          $f: [],
          nf: R.pf,
        };
        b = R.yg();
        c = O.createNode(R.root, b, 49152, 0);
        c.ag = a;
        b = O.mh({
          path: b,
          node: c,
          flags: O.Ch("r+"),
          seekable: !1,
          cf: R.cf,
        });
        a.stream = b;
        return a;
      },
      li: function (a) {
        return (a = O.yf(a)) && O.isSocket(a.node.mode) ? a.node.ag : null;
      },
      cf: {
        Yf: function (a) {
          a = a.node.ag;
          return a.nf.Yf(a);
        },
        Tf: function (a, b, c) {
          a = a.node.ag;
          return a.nf.Tf(a, b, c);
        },
        read: function (a, b, c, d) {
          a = a.node.ag;
          d = a.nf.ah(a, d);
          if (!d) return 0;
          b.set(d.buffer, c);
          return d.buffer.length;
        },
        write: function (a, b, c, d) {
          a = a.node.ag;
          return a.nf.eh(a, b, c, d);
        },
        close: function (a) {
          a = a.node.ag;
          a.nf.close(a);
        },
      },
      yg: function () {
        R.yg.current || (R.yg.current = 0);
        return "socket[" + R.yg.current++ + "]";
      },
      pf: {
        sg: function (a, b, c) {
          if ("object" === typeof b) {
            var d = b;
            c = b = null;
          }
          if (d)
            if (d._socket)
              (b = d._socket.remoteAddress), (c = d._socket.remotePort);
            else {
              c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url);
              if (!c)
                throw Error(
                  "WebSocket URL must be in the format ws(s)://address:port"
                );
              b = c[1];
              c = parseInt(c[2], 10);
            }
          else
            try {
              var e = f.websocket && "object" === typeof f.websocket,
                g = "ws:#".replace("#", "//");
              e && "string" === typeof f.websocket.url && (g = f.websocket.url);
              if ("ws://" === g || "wss://" === g) {
                var k = b.split("/");
                g = g + k[0] + ":" + c + "/" + k.slice(1).join("/");
              }
              k = "binary";
              e &&
                "string" === typeof f.websocket.subprotocol &&
                (k = f.websocket.subprotocol);
              var m = void 0;
              "null" !== k &&
                ((k = k.replace(/^ +| +$/g, "").split(/ *, */)),
                (m = h ? { protocol: k.toString() } : k));
              e && null === f.websocket.subprotocol && (m = void 0);
              d = new (h ? require("ws") : WebSocket)(g, m);
              d.binaryType = "arraybuffer";
            } catch (r) {
              throw new O.$e(23);
            }
          b = { gf: b, port: c, socket: d, tg: [] };
          R.pf.ih(a, b);
          R.pf.mi(a, b);
          2 === a.type &&
            "undefined" !== typeof a.Pf &&
            b.tg.push(
              new Uint8Array([
                255,
                255,
                255,
                255,
                112,
                111,
                114,
                116,
                (a.Pf & 65280) >> 8,
                a.Pf & 255,
              ])
            );
          return b;
        },
        ug: function (a, b, c) {
          return a.mg[b + ":" + c];
        },
        ih: function (a, b) {
          a.mg[b.gf + ":" + b.port] = b;
        },
        Gh: function (a, b) {
          delete a.mg[b.gf + ":" + b.port];
        },
        mi: function (a, b) {
          function c() {
            f.websocket.emit("open", a.stream.fd);
            try {
              for (var g = b.tg.shift(); g; )
                b.socket.send(g), (g = b.tg.shift());
            } catch (k) {
              b.socket.close();
            }
          }
          function d(g) {
            if ("string" === typeof g) g = new TextEncoder().encode(g);
            else {
              assert(void 0 !== g.byteLength);
              if (0 == g.byteLength) return;
              g = new Uint8Array(g);
            }
            var k = e;
            e = !1;
            k &&
            10 === g.length &&
            255 === g[0] &&
            255 === g[1] &&
            255 === g[2] &&
            255 === g[3] &&
            112 === g[4] &&
            111 === g[5] &&
            114 === g[6] &&
            116 === g[7]
              ? ((g = (g[8] << 8) | g[9]),
                R.pf.Gh(a, b),
                (b.port = g),
                R.pf.ih(a, b))
              : (a.$f.push({ gf: b.gf, port: b.port, data: g }),
                f.websocket.emit("message", a.stream.fd));
          }
          var e = !0;
          h
            ? (b.socket.on("open", c),
              b.socket.on("message", function (g, k) {
                k.Xi && d(new Uint8Array(g).buffer);
              }),
              b.socket.on("close", function () {
                f.websocket.emit("close", a.stream.fd);
              }),
              b.socket.on("error", function () {
                a.error = 14;
                f.websocket.emit("error", [
                  a.stream.fd,
                  a.error,
                  "ECONNREFUSED: Connection refused",
                ]);
              }))
            : ((b.socket.onopen = c),
              (b.socket.onclose = function () {
                f.websocket.emit("close", a.stream.fd);
              }),
              (b.socket.onmessage = function (g) {
                d(g.data);
              }),
              (b.socket.onerror = function () {
                a.error = 14;
                f.websocket.emit("error", [
                  a.stream.fd,
                  a.error,
                  "ECONNREFUSED: Connection refused",
                ]);
              }));
        },
        Yf: function (a) {
          if (1 === a.type && a.kf) return a.pending.length ? 65 : 0;
          var b = 0,
            c = 1 === a.type ? R.pf.ug(a, a.rf, a.uf) : null;
          if (
            a.$f.length ||
            !c ||
            (c && c.socket.readyState === c.socket.CLOSING) ||
            (c && c.socket.readyState === c.socket.CLOSED)
          )
            b |= 65;
          if (!c || (c && c.socket.readyState === c.socket.OPEN)) b |= 4;
          if (
            (c && c.socket.readyState === c.socket.CLOSING) ||
            (c && c.socket.readyState === c.socket.CLOSED)
          )
            b |= 16;
          return b;
        },
        Tf: function (a, b, c) {
          switch (b) {
            case 21531:
              return (
                (b = 0),
                a.$f.length && (b = a.$f[0].data.length),
                (E[c >> 2] = b),
                0
              );
            default:
              return 28;
          }
        },
        close: function (a) {
          if (a.kf) {
            try {
              a.kf.close();
            } catch (e) {}
            a.kf = null;
          }
          for (var b = Object.keys(a.mg), c = 0; c < b.length; c++) {
            var d = a.mg[b[c]];
            try {
              d.socket.close();
            } catch (e) {}
            R.pf.Gh(a, d);
          }
          return 0;
        },
        bind: function (a, b, c) {
          if ("undefined" !== typeof a.Ag || "undefined" !== typeof a.Pf)
            throw new O.$e(28);
          a.Ag = b;
          a.Pf = c;
          if (2 === a.type) {
            a.kf && (a.kf.close(), (a.kf = null));
            try {
              a.nf.listen(a, 0);
            } catch (d) {
              if (!(d instanceof O.$e)) throw d;
              if (138 !== d.df) throw d;
            }
          }
        },
        connect: function (a, b, c) {
          if (a.kf) throw new O.$e(138);
          if ("undefined" !== typeof a.rf && "undefined" !== typeof a.uf) {
            var d = R.pf.ug(a, a.rf, a.uf);
            if (d) {
              if (d.socket.readyState === d.socket.CONNECTING)
                throw new O.$e(7);
              throw new O.$e(30);
            }
          }
          b = R.pf.sg(a, b, c);
          a.rf = b.gf;
          a.uf = b.port;
          throw new O.$e(26);
        },
        listen: function (a) {
          if (!h) throw new O.$e(138);
          if (a.kf) throw new O.$e(28);
          var b = require("ws").Server;
          a.kf = new b({ host: a.Ag, port: a.Pf });
          f.websocket.emit("listen", a.stream.fd);
          a.kf.on("connection", function (c) {
            if (1 === a.type) {
              var d = R.createSocket(a.family, a.type, a.protocol);
              c = R.pf.sg(d, c);
              d.rf = c.gf;
              d.uf = c.port;
              a.pending.push(d);
              f.websocket.emit("connection", d.stream.fd);
            } else R.pf.sg(a, c), f.websocket.emit("connection", a.stream.fd);
          });
          a.kf.on("closed", function () {
            f.websocket.emit("close", a.stream.fd);
            a.kf = null;
          });
          a.kf.on("error", function () {
            a.error = 23;
            f.websocket.emit("error", [
              a.stream.fd,
              a.error,
              "EHOSTUNREACH: Host is unreachable",
            ]);
          });
        },
        accept: function (a) {
          if (!a.kf) throw new O.$e(28);
          var b = a.pending.shift();
          b.stream.flags = a.stream.flags;
          return b;
        },
        hj: function (a, b) {
          if (b) {
            if (void 0 === a.rf || void 0 === a.uf) throw new O.$e(53);
            b = a.rf;
            a = a.uf;
          } else (b = a.Ag || 0), (a = a.Pf || 0);
          return { gf: b, port: a };
        },
        eh: function (a, b, c, d, e, g) {
          if (2 === a.type) {
            if (void 0 === e || void 0 === g) (e = a.rf), (g = a.uf);
            if (void 0 === e || void 0 === g) throw new O.$e(17);
          } else (e = a.rf), (g = a.uf);
          var k = R.pf.ug(a, e, g);
          if (1 === a.type) {
            if (
              !k ||
              k.socket.readyState === k.socket.CLOSING ||
              k.socket.readyState === k.socket.CLOSED
            )
              throw new O.$e(53);
            if (k.socket.readyState === k.socket.CONNECTING) throw new O.$e(6);
          }
          ArrayBuffer.isView(b) && ((c += b.byteOffset), (b = b.buffer));
          var m;
          b instanceof SharedArrayBuffer
            ? (m = new Uint8Array(new Uint8Array(b.slice(c, c + d))).buffer)
            : (m = b.slice(c, c + d));
          if (2 === a.type && (!k || k.socket.readyState !== k.socket.OPEN))
            return (
              (k &&
                k.socket.readyState !== k.socket.CLOSING &&
                k.socket.readyState !== k.socket.CLOSED) ||
                (k = R.pf.sg(a, e, g)),
              k.tg.push(m),
              d
            );
          try {
            return k.socket.send(m), d;
          } catch (r) {
            throw new O.$e(28);
          }
        },
        ah: function (a, b) {
          if (1 === a.type && a.kf) throw new O.$e(53);
          var c = a.$f.shift();
          if (!c) {
            if (1 === a.type) {
              if ((a = R.pf.ug(a, a.rf, a.uf))) {
                if (
                  a.socket.readyState === a.socket.CLOSING ||
                  a.socket.readyState === a.socket.CLOSED
                )
                  return null;
                throw new O.$e(6);
              }
              throw new O.$e(53);
            }
            throw new O.$e(6);
          }
          var d = c.data.byteLength || c.data.length,
            e = c.data.byteOffset || 0,
            g = c.data.buffer || c.data;
          b = Math.min(b, d);
          var k = { buffer: new Uint8Array(g, e, b), gf: c.gf, port: c.port };
          1 === a.type &&
            b < d &&
            ((c.data = new Uint8Array(g, e + b, d - b)), a.$f.unshift(c));
          return k;
        },
      },
    };
    function Dc(a) {
      a = a.split(".");
      for (var b = 0; 4 > b; b++) {
        var c = Number(a[b]);
        if (isNaN(c)) return null;
        a[b] = c;
      }
      return (a[0] | (a[1] << 8) | (a[2] << 16) | (a[3] << 24)) >>> 0;
    }
    function Ec(a) {
      var b,
        c,
        d = [];
      if (
        !/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(
          a
        )
      )
        return null;
      if ("::" === a) return [0, 0, 0, 0, 0, 0, 0, 0];
      a =
        0 === a.indexOf("::") ? a.replace("::", "Z:") : a.replace("::", ":Z:");
      0 < a.indexOf(".")
        ? ((a = a.replace(/[.]/g, ":")),
          (a = a.split(":")),
          (a[a.length - 4] =
            parseInt(a[a.length - 4]) + 256 * parseInt(a[a.length - 3])),
          (a[a.length - 3] =
            parseInt(a[a.length - 2]) + 256 * parseInt(a[a.length - 1])),
          (a = a.slice(0, a.length - 2)))
        : (a = a.split(":"));
      for (b = c = 0; b < a.length; b++)
        if ("string" === typeof a[b])
          if ("Z" === a[b]) {
            for (c = 0; c < 8 - a.length + 1; c++) d[b + c] = 0;
            --c;
          } else d[b + c] = Fc(parseInt(a[b], 16));
        else d[b + c] = a[b];
      return [
        (d[1] << 16) | d[0],
        (d[3] << 16) | d[2],
        (d[5] << 16) | d[4],
        (d[7] << 16) | d[6],
      ];
    }
    var Gc = 1,
      Hc = {},
      Ic = {};
    function Jc(a) {
      var b = Dc(a);
      if (null !== b) return a;
      b = Ec(a);
      if (null !== b) return a;
      Hc[a]
        ? (b = Hc[a])
        : ((b = Gc++),
          assert(65535 > b, "exceeded max address mappings of 65535"),
          (b = "172.29." + (b & 255) + "." + (b & 65280)),
          (Ic[b] = a),
          (Hc[a] = b));
      return b;
    }
    function Kc(a) {
      return Ic[a] ? Ic[a] : null;
    }
    function Lc(a) {
      return (
        (a & 255) +
        "." +
        ((a >> 8) & 255) +
        "." +
        ((a >> 16) & 255) +
        "." +
        ((a >> 24) & 255)
      );
    }
    function Mc(a) {
      var b = "",
        c,
        d = 0,
        e = 0,
        g = 0,
        k = 0;
      a = [
        a[0] & 65535,
        a[0] >> 16,
        a[1] & 65535,
        a[1] >> 16,
        a[2] & 65535,
        a[2] >> 16,
        a[3] & 65535,
        a[3] >> 16,
      ];
      var m = !0;
      for (c = 0; 5 > c; c++)
        if (0 !== a[c]) {
          m = !1;
          break;
        }
      if (m) {
        c = Lc(a[6] | (a[7] << 16));
        if (-1 === a[5]) return "::ffff:" + c;
        if (0 === a[5])
          return (
            "0.0.0.0" === c && (c = ""), "0.0.0.1" === c && (c = "1"), "::" + c
          );
      }
      for (c = 0; 8 > c; c++)
        0 === a[c] && (1 < c - e && (k = 0), (e = c), k++),
          k > d && ((d = k), (g = c - d + 1));
      for (c = 0; 8 > c; c++)
        1 < d && 0 === a[c] && c >= g && c < g + d
          ? c === g && ((b += ":"), 0 === g && (b += ":"))
          : ((b += Number(Nc(a[c] & 65535)).toString(16)),
            (b += 7 > c ? ":" : ""));
      return b;
    }
    function Oc(a, b) {
      var c = Qa[a >> 1],
        d = Nc(Ra[(a + 2) >> 1]);
      switch (c) {
        case 2:
          if (16 !== b) return { df: 28 };
          a = E[(a + 4) >> 2];
          a = Lc(a);
          break;
        case 10:
          if (28 !== b) return { df: 28 };
          a = [
            E[(a + 8) >> 2],
            E[(a + 12) >> 2],
            E[(a + 16) >> 2],
            E[(a + 20) >> 2],
          ];
          a = Mc(a);
          break;
        default:
          return { df: 5 };
      }
      return { family: c, gf: a, port: d };
    }
    function Pc(a, b, c, d) {
      switch (b) {
        case 2:
          c = Dc(c);
          Qa[a >> 1] = b;
          E[(a + 4) >> 2] = c;
          Qa[(a + 2) >> 1] = Fc(d);
          break;
        case 10:
          c = Ec(c);
          E[a >> 2] = b;
          E[(a + 8) >> 2] = c[0];
          E[(a + 12) >> 2] = c[1];
          E[(a + 16) >> 2] = c[2];
          E[(a + 20) >> 2] = c[3];
          Qa[(a + 2) >> 1] = Fc(d);
          E[(a + 4) >> 2] = 0;
          E[(a + 24) >> 2] = 0;
          break;
        default:
          return { df: 5 };
      }
      return {};
    }
    function Qc(a, b) {
      if (l) return N(20, 1, a, b);
      try {
        ic = b;
        b = function () {
          var aa = R.li(Q());
          if (!aa) throw new O.$e(8);
          return aa;
        };
        var c = function (aa) {
          var pd = Q(),
            ge = Q();
          if (aa && 0 === pd) return null;
          aa = Oc(pd, ge);
          if (aa.df) throw new O.$e(aa.df);
          aa.gf = Kc(aa.gf) || aa.gf;
          return aa;
        };
        switch (a) {
          case 1:
            var d = Q(),
              e = Q(),
              g = Q(),
              k = R.createSocket(d, e, g);
            return k.stream.fd;
          case 2:
            k = b();
            var m = c();
            k.nf.bind(k, m.gf, m.port);
            return 0;
          case 3:
            return (k = b()), (m = c()), k.nf.connect(k, m.gf, m.port), 0;
          case 4:
            k = b();
            var r = Q();
            k.nf.listen(k, r);
            return 0;
          case 5:
            k = b();
            var q = Q();
            Q();
            var t = k.nf.accept(k);
            q && Pc(q, t.family, Jc(t.rf), t.uf);
            return t.stream.fd;
          case 6:
            return (
              (k = b()),
              (q = Q()),
              Q(),
              Pc(q, k.family, Jc(k.Ag || "0.0.0.0"), k.Pf),
              0
            );
          case 7:
            k = b();
            q = Q();
            Q();
            if (!k.rf) return -53;
            Pc(q, k.family, Jc(k.rf), k.uf);
            return 0;
          case 11:
            k = b();
            var w = Q(),
              B = Q();
            Q();
            var p = c(!0);
            return p
              ? k.nf.eh(k, y, w, B, p.gf, p.port)
              : O.write(k.stream, y, w, B);
          case 12:
            k = b();
            var x = Q(),
              z = Q();
            Q();
            q = Q();
            Q();
            var I = k.nf.ah(k, z);
            if (!I) return 0;
            q && Pc(q, k.family, Jc(I.gf), I.port);
            v.set(I.buffer, x);
            return I.buffer.byteLength;
          case 14:
            return -50;
          case 15:
            k = b();
            var W = Q(),
              db = Q(),
              K = Q(),
              Y = Q();
            return 1 === W && 4 === db
              ? ((E[K >> 2] = k.error), (E[Y >> 2] = 4), (k.error = null), 0)
              : -50;
          case 16:
            k = b();
            w = Q();
            Q();
            var ia = E[(w + 8) >> 2],
              na = E[(w + 12) >> 2],
              ua = E[w >> 2],
              he = E[(w + 4) >> 2];
            if (ua) {
              m = Oc(ua, he);
              if (m.df) return -m.df;
              var ie = m.port;
              q = Kc(m.gf) || m.gf;
            }
            for (var Oa = 0, X = 0; X < na; X++)
              Oa += E[(ia + (8 * X + 4)) >> 2];
            var qd = new Uint8Array(Oa);
            for (X = B = 0; X < na; X++) {
              var $b = E[(ia + 8 * X) >> 2],
                ac = E[(ia + (8 * X + 4)) >> 2];
              for (x = 0; x < ac; x++) qd[B++] = y[($b + x) >> 0];
            }
            return k.nf.eh(k, qd, 0, Oa, q, ie);
          case 17:
            k = b();
            w = Q();
            Q();
            ia = E[(w + 8) >> 2];
            na = E[(w + 12) >> 2];
            for (X = Oa = 0; X < na; X++) Oa += E[(ia + (8 * X + 4)) >> 2];
            I = k.nf.ah(k, Oa);
            if (!I) return 0;
            (ua = E[w >> 2]) && Pc(ua, k.family, Jc(I.gf), I.port);
            k = 0;
            var bc = I.buffer.byteLength;
            for (X = 0; 0 < bc && X < na; X++)
              if (
                (($b = E[(ia + 8 * X) >> 2]), (ac = E[(ia + (8 * X + 4)) >> 2]))
              )
                (B = Math.min(ac, bc)),
                  (x = I.buffer.subarray(k, k + B)),
                  v.set(x, $b + k),
                  (k += B),
                  (bc -= B);
            return k;
          default:
            return -52;
        }
      } catch (aa) {
        return (
          ("undefined" !== typeof O && aa instanceof O.$e) || n(aa), -aa.df
        );
      }
    }
    function Rc(a, b) {
      if (l) return N(21, 1, a, b);
      try {
        return (a = C(a)), hc(O.stat, a, b);
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
      }
    }
    function Sc(a) {
      if (l) return N(22, 1, a);
      try {
        return (a = C(a)), O.unlink(a), 0;
      } catch (b) {
        return ("undefined" !== typeof O && b instanceof O.$e) || n(b), -b.df;
      }
    }
    function Tc() {
      void 0 === Tc.start && (Tc.start = Date.now());
      return (1e3 * (Date.now() - Tc.start)) | 0;
    }
    function Uc() {
      h ||
        la ||
        (za || (za = {}),
        za[
          "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
        ] ||
          ((za[
            "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
          ] = 1),
          u(
            "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
          )));
    }
    function Vc(a, b, c) {
      if (0 >= a || a > y.length || a & 1) return -28;
      if (ka) {
        if (Atomics.load(E, a >> 2) != b) return -6;
        var d = performance.now();
        c = d + c;
        for (Atomics.exchange(E, M.Uf >> 2, a); ; ) {
          d = performance.now();
          if (d > c) return Atomics.exchange(E, M.Uf >> 2, 0), -73;
          d = Atomics.exchange(E, M.Uf >> 2, 0);
          if (0 == d) break;
          Ab();
          if (Atomics.load(E, a >> 2) != b) return -6;
          Atomics.exchange(E, M.Uf >> 2, a);
        }
        return 0;
      }
      a = Atomics.wait(E, a >> 2, b, c);
      if ("timed-out" === a) return -73;
      if ("not-equal" === a) return -6;
      if ("ok" === a) return 0;
      throw "Atomics.wait returned an unexpected value " + a;
    }
    function Wc(a) {
      var b = a.getExtension("ANGLE_instanced_arrays");
      b &&
        ((a.vertexAttribDivisor = function (c, d) {
          b.vertexAttribDivisorANGLE(c, d);
        }),
        (a.drawArraysInstanced = function (c, d, e, g) {
          b.drawArraysInstancedANGLE(c, d, e, g);
        }),
        (a.drawElementsInstanced = function (c, d, e, g, k) {
          b.drawElementsInstancedANGLE(c, d, e, g, k);
        }));
    }
    function Xc(a) {
      var b = a.getExtension("OES_vertex_array_object");
      b &&
        ((a.createVertexArray = function () {
          return b.createVertexArrayOES();
        }),
        (a.deleteVertexArray = function (c) {
          b.deleteVertexArrayOES(c);
        }),
        (a.bindVertexArray = function (c) {
          b.bindVertexArrayOES(c);
        }),
        (a.isVertexArray = function (c) {
          return b.isVertexArrayOES(c);
        }));
    }
    function Yc(a) {
      var b = a.getExtension("WEBGL_draw_buffers");
      b &&
        (a.drawBuffers = function (c, d) {
          b.drawBuffersWEBGL(c, d);
        });
    }
    var Zc = 1,
      $c = [],
      S = [],
      ad = [],
      bd = [],
      cd = [],
      T = [],
      dd = [],
      ed = [],
      fd = [],
      gd = {},
      hd = {},
      id = 4;
    function U(a) {
      jd || (jd = a);
    }
    function kd(a) {
      for (var b = Zc++, c = a.length; c < b; c++) a[c] = null;
      return b;
    }
    function ld(a) {
      a || (a = md);
      if (!a.ni) {
        a.ni = !0;
        var b = a.pg;
        Wc(b);
        Xc(b);
        Yc(b);
        b.tf = b.getExtension("EXT_disjoint_timer_query");
        b.qj = b.getExtension("WEBGL_multi_draw");
        var c = "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod EXT_texture_norm16 WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2 WEBKIT_WEBGL_compressed_texture_pvrtc".split(
          " "
        );
        (b.getSupportedExtensions() || []).forEach(function (d) {
          -1 != c.indexOf(d) && b.getExtension(d);
        });
      }
    }
    var jd,
      md,
      nd = [];
    function od(a, b, c, d) {
      for (var e = 0; e < a; e++) {
        var g = V[c](),
          k = g && kd(d);
        g ? ((g.name = k), (d[k] = g)) : U(1282);
        E[(b + 4 * e) >> 2] = k;
      }
    }
    function rd(a, b, c, d, e, g, k, m) {
      b = S[b];
      if ((a = V[a](b, c)))
        (d = m && Ia(a.name, v, m, d)),
          e && (E[e >> 2] = d),
          g && (E[g >> 2] = a.size),
          k && (E[k >> 2] = a.type);
    }
    function sd(a, b) {
      F[a >> 2] = b;
      F[(a + 4) >> 2] = (b - F[a >> 2]) / 4294967296;
    }
    function td(a, b, c) {
      if (b) {
        var d = void 0;
        switch (a) {
          case 36346:
            d = 1;
            break;
          case 36344:
            0 != c && 1 != c && U(1280);
            return;
          case 36345:
            d = 0;
            break;
          case 34466:
            var e = V.getParameter(34467);
            d = e ? e.length : 0;
        }
        if (void 0 === d)
          switch (((e = V.getParameter(a)), typeof e)) {
            case "number":
              d = e;
              break;
            case "boolean":
              d = e ? 1 : 0;
              break;
            case "string":
              U(1280);
              return;
            case "object":
              if (null === e)
                switch (a) {
                  case 34964:
                  case 35725:
                  case 34965:
                  case 36006:
                  case 36007:
                  case 32873:
                  case 34229:
                  case 34068:
                    d = 0;
                    break;
                  default:
                    U(1280);
                    return;
                }
              else {
                if (
                  e instanceof Float32Array ||
                  e instanceof Uint32Array ||
                  e instanceof Int32Array ||
                  e instanceof Array
                ) {
                  for (a = 0; a < e.length; ++a)
                    switch (c) {
                      case 0:
                        E[(b + 4 * a) >> 2] = e[a];
                        break;
                      case 2:
                        G[(b + 4 * a) >> 2] = e[a];
                        break;
                      case 4:
                        y[(b + a) >> 0] = e[a] ? 1 : 0;
                    }
                  return;
                }
                try {
                  d = e.name | 0;
                } catch (g) {
                  U(1280);
                  u(
                    "GL_INVALID_ENUM in glGet" +
                      c +
                      "v: Unknown object returned from WebGL getParameter(" +
                      a +
                      ")! (error: " +
                      g +
                      ")"
                  );
                  return;
                }
              }
              break;
            default:
              U(1280);
              u(
                "GL_INVALID_ENUM in glGet" +
                  c +
                  "v: Native code calling glGet" +
                  c +
                  "v(" +
                  a +
                  ") and it returns " +
                  e +
                  " of type " +
                  typeof e +
                  "!"
              );
              return;
          }
        switch (c) {
          case 1:
            sd(b, d);
            break;
          case 0:
            E[b >> 2] = d;
            break;
          case 2:
            G[b >> 2] = d;
            break;
          case 4:
            y[b >> 0] = d ? 1 : 0;
        }
      } else U(1281);
    }
    function ud(a) {
      var b = Ka(a) + 1,
        c = Ma(b);
      Ia(a, v, c, b);
      return c;
    }
    function vd(a, b, c, d) {
      if (c)
        if (
          ((a = V.getUniform(S[a], T[b])),
          "number" == typeof a || "boolean" == typeof a)
        )
          switch (d) {
            case 0:
              E[c >> 2] = a;
              break;
            case 2:
              G[c >> 2] = a;
          }
        else
          for (b = 0; b < a.length; b++)
            switch (d) {
              case 0:
                E[(c + 4 * b) >> 2] = a[b];
                break;
              case 2:
                G[(c + 4 * b) >> 2] = a[b];
            }
      else U(1281);
    }
    function wd(a, b, c, d) {
      if (c)
        if (((a = V.getVertexAttrib(a, b)), 34975 == b))
          E[c >> 2] = a && a.name;
        else if ("number" == typeof a || "boolean" == typeof a)
          switch (d) {
            case 0:
              E[c >> 2] = a;
              break;
            case 2:
              G[c >> 2] = a;
              break;
            case 5:
              E[c >> 2] = Math.fround(a);
          }
        else
          for (b = 0; b < a.length; b++)
            switch (d) {
              case 0:
                E[(c + 4 * b) >> 2] = a[b];
                break;
              case 2:
                G[(c + 4 * b) >> 2] = a[b];
                break;
              case 5:
                E[(c + 4 * b) >> 2] = Math.fround(a[b]);
            }
      else U(1281);
    }
    function xd(a, b, c, d, e) {
      a -= 5120;
      a = 1 == a ? v : 4 == a ? E : 6 == a ? G : 5 == a || 28922 == a ? F : Ra;
      var g = 31 - Math.clz32(a.BYTES_PER_ELEMENT),
        k = id;
      return a.subarray(
        e >> g,
        (e +
          d *
            ((c *
              ({ 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 }[b - 6402] || 1) *
              (1 << g) +
              k -
              1) &
              -k)) >>
          g
      );
    }
    var yd = [],
      zd = [];
    function N(a, b) {
      for (
        var c = arguments.length - 2, d = A(), e = Ha(8 * c), g = e >> 3, k = 0;
        k < c;
        k++
      )
        Sa[g + k] = arguments[2 + k];
      c = Ad(a, c, e, b);
      D(d);
      return c;
    }
    var Bd = [],
      Cd = [],
      Dd = [
        0,
        "undefined" !== typeof document ? document : 0,
        "undefined" !== typeof window ? window : 0,
      ];
    function Ed(a) {
      a = 2 < a ? C(a) : a;
      return (
        Dd[a] ||
        ("undefined" !== typeof document ? document.querySelector(a) : void 0)
      );
    }
    function Fd(a, b, c) {
      var d = Ed(a);
      if (!d) return -4;
      d.rg && ((E[d.rg >> 2] = b), (E[(d.rg + 4) >> 2] = c));
      if (d.Eh || !d.$i)
        d.Eh && (d = d.Eh),
          (a = !1),
          d.qg &&
            d.qg.pg &&
            ((a = d.qg.pg.getParameter(2978)),
            (a =
              0 === a[0] &&
              0 === a[1] &&
              a[2] === d.width &&
              a[3] === d.height)),
          (d.width = b),
          (d.height = c),
          a && d.qg.pg.viewport(0, 0, b, c);
      else {
        if (d.rg) {
          a = a ? C(a) : "";
          d = E[(d.rg + 8) >> 2];
          var e = A(),
            g = Ha(12),
            k = 0;
          a && (k = ud(a));
          E[g >> 2] = k;
          E[(g + 4) >> 2] = b;
          E[(g + 8) >> 2] = c;
          Gd(0, d, 657457152, 0, k, g);
          D(e);
          return 1;
        }
        return -4;
      }
      return 0;
    }
    function Hd(a, b, c) {
      return l ? N(23, 1, a, b, c) : Fd(a, b, c);
    }
    var Id = ["default", "low-power", "high-performance"],
      Jd = {};
    function Kd() {
      if (!Ld) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: ha || "./this.program",
          },
          b;
        for (b in Jd) a[b] = Jd[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        Ld = c;
      }
      return Ld;
    }
    var Ld;
    function Md(a) {
      if (l) return N(24, 1, a);
      try {
        var b = jc(a);
        O.close(b);
        return 0;
      } catch (c) {
        return ("undefined" !== typeof O && c instanceof O.$e) || n(c), c.df;
      }
    }
    function Nd(a, b) {
      if (l) return N(25, 1, a, b);
      try {
        var c = jc(a);
        y[b >> 0] = c.tty ? 2 : O.jf(c.mode) ? 3 : O.Lf(c.mode) ? 7 : 4;
        return 0;
      } catch (d) {
        return ("undefined" !== typeof O && d instanceof O.$e) || n(d), d.df;
      }
    }
    function Od(a, b, c, d) {
      if (l) return N(26, 1, a, b, c, d);
      try {
        a: {
          for (var e = jc(a), g = (a = 0); g < c; g++) {
            var k = E[(b + (8 * g + 4)) >> 2],
              m = O.read(e, y, E[(b + 8 * g) >> 2], k, void 0);
            if (0 > m) {
              var r = -1;
              break a;
            }
            a += m;
            if (m < k) break;
          }
          r = a;
        }
        E[d >> 2] = r;
        return 0;
      } catch (q) {
        return ("undefined" !== typeof O && q instanceof O.$e) || n(q), q.df;
      }
    }
    function Pd(a, b, c, d, e) {
      if (l) return N(27, 1, a, b, c, d, e);
      try {
        var g = jc(a);
        a = 4294967296 * c + (b >>> 0);
        if (-9007199254740992 >= a || 9007199254740992 <= a) return -61;
        O.sf(g, a, d);
        L = [
          g.position >>> 0,
          ((J = g.position),
          1 <= +Math.abs(J)
            ? 0 < J
              ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
            : 0),
        ];
        E[e >> 2] = L[0];
        E[(e + 4) >> 2] = L[1];
        g.Kf && 0 === a && 0 === d && (g.Kf = null);
        return 0;
      } catch (k) {
        return ("undefined" !== typeof O && k instanceof O.$e) || n(k), k.df;
      }
    }
    function Qd(a, b, c, d) {
      if (l) return N(28, 1, a, b, c, d);
      try {
        a: {
          for (var e = jc(a), g = (a = 0); g < c; g++) {
            var k = O.write(
              e,
              y,
              E[(b + 8 * g) >> 2],
              E[(b + (8 * g + 4)) >> 2],
              void 0
            );
            if (0 > k) {
              var m = -1;
              break a;
            }
            a += k;
          }
          m = a;
        }
        E[d >> 2] = m;
        return 0;
      } catch (r) {
        return ("undefined" !== typeof O && r instanceof O.$e) || n(r), r.df;
      }
    }
    var Rd = {};
    function Sd(a) {
      Sd.buffer ||
        ((Sd.buffer = Ma(256)),
        (Rd["0"] = "Success"),
        (Rd["-1"] = "Invalid value for 'ai_flags' field"),
        (Rd["-2"] = "NAME or SERVICE is unknown"),
        (Rd["-3"] = "Temporary failure in name resolution"),
        (Rd["-4"] = "Non-recoverable failure in name res"),
        (Rd["-6"] = "'ai_family' not supported"),
        (Rd["-7"] = "'ai_socktype' not supported"),
        (Rd["-8"] = "SERVICE not supported for 'ai_socktype'"),
        (Rd["-10"] = "Memory allocation failure"),
        (Rd["-11"] = "System error returned in 'errno'"),
        (Rd["-12"] = "Argument buffer overflow"));
      var b = "Unknown error";
      a in Rd && (255 < Rd[a].length ? (b = "Message too long") : (b = Rd[a]));
      Pa(b, Sd.buffer);
      return Sd.buffer;
    }
    function Td(a, b, c, d) {
      function e(w, B, p, x, z, I) {
        var W = 10 === w ? 28 : 16;
        z = 10 === w ? Mc(z) : Lc(z);
        W = Ma(W);
        z = Pc(W, w, z, I);
        assert(!z.df);
        z = Ma(32);
        E[(z + 4) >> 2] = w;
        E[(z + 8) >> 2] = B;
        E[(z + 12) >> 2] = p;
        E[(z + 24) >> 2] = x;
        E[(z + 20) >> 2] = W;
        E[(z + 16) >> 2] = 10 === w ? 28 : 16;
        E[(z + 28) >> 2] = 0;
        return z;
      }
      if (l) return N(29, 1, a, b, c, d);
      var g = 0,
        k = 0,
        m = 0,
        r = 0,
        q = 0,
        t = 0;
      c &&
        ((m = E[c >> 2]),
        (r = E[(c + 4) >> 2]),
        (q = E[(c + 8) >> 2]),
        (t = E[(c + 12) >> 2]));
      q && !t && (t = 2 === q ? 17 : 6);
      !q && t && (q = 17 === t ? 2 : 1);
      0 === t && (t = 6);
      0 === q && (q = 1);
      if (!a && !b) return -2;
      if (m & -1088 || (0 !== c && E[c >> 2] & 2 && !a)) return -1;
      if (m & 32) return -2;
      if (0 !== q && 1 !== q && 2 !== q) return -7;
      if (0 !== r && 2 !== r && 10 !== r) return -6;
      if (b && ((b = C(b)), (k = parseInt(b, 10)), isNaN(k)))
        return m & 1024 ? -2 : -8;
      if (!a)
        return (
          0 === r && (r = 2),
          0 === (m & 1) &&
            (2 === r ? (g = Ud(2130706433)) : (g = [0, 0, 0, 1])),
          (a = e(r, q, t, null, g, k)),
          (E[d >> 2] = a),
          0
        );
      a = C(a);
      g = Dc(a);
      if (null !== g)
        if (0 === r || 2 === r) r = 2;
        else if (10 === r && m & 8) (g = [0, 0, Ud(65535), g]), (r = 10);
        else return -2;
      else if (((g = Ec(a)), null !== g))
        if (0 === r || 10 === r) r = 10;
        else return -2;
      if (null != g) return (a = e(r, q, t, a, g, k)), (E[d >> 2] = a), 0;
      if (m & 4) return -2;
      a = Jc(a);
      g = Dc(a);
      0 === r ? (r = 2) : 10 === r && (g = [0, 0, Ud(65535), g]);
      a = e(r, q, t, null, g, k);
      E[d >> 2] = a;
      return 0;
    }
    function Bb(a) {
      if (l)
        throw "Internal Error! spawnThread() can only ever be called from main application thread!";
      var b = M.ki();
      if (void 0 !== b.xf) throw "Internal error!";
      if (!a.Zf) throw "Internal error, no pthread ptr!";
      M.Jf.push(b);
      for (var c = Ma(512), d = 0; 128 > d; ++d) E[(c + 4 * d) >> 2] = 0;
      var e = a.Qf + a.bg;
      d = M.Df[a.Zf] = {
        worker: b,
        Qf: a.Qf,
        bg: a.bg,
        Jg: a.Jg,
        Kh: a.Zf,
        threadInfoStruct: a.Zf,
      };
      var g = d.threadInfoStruct >> 2;
      Atomics.store(F, g, 0);
      Atomics.store(F, g + 1, 0);
      Atomics.store(F, g + 2, 0);
      Atomics.store(F, g + 17, a.detached);
      Atomics.store(F, g + 26, c);
      Atomics.store(F, g + 12, 0);
      Atomics.store(F, g + 10, d.threadInfoStruct);
      Atomics.store(F, g + 11, 42);
      Atomics.store(F, g + 27, a.bg);
      Atomics.store(F, g + 21, a.bg);
      Atomics.store(F, g + 20, e);
      Atomics.store(F, g + 29, e);
      Atomics.store(F, g + 30, a.detached);
      Atomics.store(F, g + 32, a.Hh);
      Atomics.store(F, g + 33, a.Ih);
      c = Vd() + 40;
      Atomics.store(F, g + 44, c);
      b.xf = d;
      var k = {
        cmd: "run",
        start_routine: a.Li,
        arg: a.Sf,
        threadInfoStruct: a.Zf,
        selfThreadId: a.Zf,
        parentThreadId: a.Ei,
        stackBase: a.Qf,
        stackSize: a.bg,
      };
      b.ng = function () {
        k.time = performance.now();
        b.postMessage(k, a.Ui);
      };
      b.loaded && (b.ng(), delete b.ng);
    }
    function Wd() {
      return pb | 0;
    }
    f._pthread_self = Wd;
    function Xd(a, b) {
      if (!a) return u("pthread_join attempted on a null thread pointer!"), 71;
      if (l && selfThreadId == a)
        return u("PThread " + a + " is attempting to join to itself!"), 16;
      if (!l && M.wf == a)
        return u("Main thread " + a + " is attempting to join to itself!"), 16;
      if (E[(a + 12) >> 2] !== a)
        return (
          u(
            "pthread_join attempted on thread " +
              a +
              ", which does not point to a valid thread, or does not exist anymore!"
          ),
          71
        );
      if (Atomics.load(F, (a + 68) >> 2))
        return (
          u("Attempted to join thread " + a + ", which was already detached!"),
          28
        );
      for (Uc(); ; ) {
        var c = Atomics.load(F, a >> 2);
        if (1 == c)
          return (
            (c = Atomics.load(F, (a + 4) >> 2)),
            b && (E[b >> 2] = c),
            Atomics.store(F, (a + 68) >> 2, 1),
            l ? postMessage({ cmd: "cleanupThread", thread: a }) : vb(a),
            0
          );
        if (
          l &&
          threadInfoStruct &&
          !Atomics.load(F, (threadInfoStruct + 60) >> 2) &&
          2 == Atomics.load(F, (threadInfoStruct + 0) >> 2)
        )
          throw "Canceled!";
        l || Ab();
        Vc(a, c, l ? 100 : 1);
      }
    }
    function Yd(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function Zd(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var $d = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      ae = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function be(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (Yd(a.getFullYear()) ? $d : ae)[c];
        if (b > d - a.getDate())
          (b -= d - a.getDate() + 1),
            a.setDate(1),
            11 > c
              ? a.setMonth(c + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
          a.setDate(a.getDate() + b);
          break;
        }
      }
      return a;
    }
    function ce(a) {
      if (l) return N(30, 1, a);
      switch (a) {
        case 30:
          return 16384;
        case 85:
          return v.length / 16384;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
        case 79:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0:
          return 2097152;
        case 3:
          return 65536;
        case 28:
          return 32768;
        case 44:
          return 32767;
        case 75:
          return 16384;
        case 39:
          return 1e3;
        case 89:
          return 700;
        case 71:
          return 256;
        case 40:
          return 255;
        case 2:
          return 100;
        case 180:
          return 64;
        case 25:
          return 20;
        case 5:
          return 16;
        case 6:
          return 6;
        case 73:
          return 4;
        case 84:
          return "object" === typeof navigator
            ? navigator.hardwareConcurrency || 1
            : 1;
      }
      Eb(28);
      return -1;
    }
    function de(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.hf = a.hf;
      this.kg = null;
      this.id = O.zi++;
      this.name = b;
      this.mode = c;
      this.bf = {};
      this.cf = {};
      this.rdev = d;
    }
    Object.defineProperties(de.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366);
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147);
        },
      },
      si: {
        get: function () {
          return O.jf(this.mode);
        },
      },
      Tg: {
        get: function () {
          return O.gg(this.mode);
        },
      },
    });
    O.Nh = de;
    O.Mi();
    for (var ec, V, ee = 0; 32 > ee; ++ee) nd.push(Array(ee));
    var fe = new Float32Array(288);
    for (ee = 0; 288 > ee; ++ee) yd[ee] = fe.subarray(0, ee + 1);
    var je = new Int32Array(288);
    for (ee = 0; 288 > ee; ++ee) zd[ee] = je.subarray(0, ee + 1);
    var ke = [
      null,
      Hb,
      Jb,
      kc,
      lc,
      mc,
      nc,
      oc,
      pc,
      rc,
      sc,
      tc,
      uc,
      wc,
      xc,
      yc,
      zc,
      Ac,
      Bc,
      Cc,
      Qc,
      Rc,
      Sc,
      Hd,
      Md,
      Nd,
      Od,
      Pd,
      Qd,
      Td,
      ce,
    ];
    function Zb(a, b) {
      var c = Array(Ka(a) + 1);
      a = Ia(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    l ||
      Wa.push({
        uh: function () {
          le();
        },
      });
    var Fe = {
      c: function (a, b, c, d) {
        n(
          "Assertion failed: " +
            C(a) +
            ", at: " +
            [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"]
        );
      },
      K: function (a, b) {
        a = me(a, b);
        if (!noExitRuntime)
          return postMessage({ cmd: "exitProcess", returnCode: a }), a;
      },
      W: function (a, b) {
        return Gb(a, b);
      },
      aa: function (a, b) {
        return Hb(a, b);
      },
      wa: function (a, b) {
        return Ib(a, b);
      },
      va: function (a, b) {
        return Nb(a, b);
      },
      Ma: kc,
      Ea: lc,
      u: mc,
      Na: nc,
      Ka: oc,
      Ha: pc,
      V: rc,
      Oa: sc,
      Pa: tc,
      za: uc,
      Aa: wc,
      Da: function () {
        return -63;
      },
      Y: xc,
      La: yc,
      Ja: zc,
      Ca: Ac,
      xa: Bc,
      Ga: Cc,
      Ia: function () {
        return 0;
      },
      t: Qc,
      X: Rc,
      Fa: function (a) {
        try {
          if (!a) return -21;
          var b = {
            __size__: 390,
            sysname: 0,
            nodename: 65,
            release: 130,
            version: 195,
            machine: 260,
            domainname: 325,
          };
          Pa("Emscripten", a + b.sysname);
          Pa("emscripten", a + b.nodename);
          Pa("1.0", a + b.release);
          Pa("#1", a + b.version);
          Pa("x86-JS", a + b.machine);
          return 0;
        } catch (c) {
          return ("undefined" !== typeof O && c instanceof O.$e) || n(c), -c.df;
        }
      },
      Ba: Sc,
      qa: function (a, b) {
        if (a == b) postMessage({ cmd: "processQueuedMainThreadWork" });
        else if (l) postMessage({ targetThread: a, cmd: "processThreadQueue" });
        else {
          a = (a = M.Df[a]) && a.worker;
          if (!a) return;
          a.postMessage({ cmd: "processThreadQueue" });
        }
        return 1;
      },
      b: function () {
        n();
      },
      Qa: Tc,
      Ta: Gb,
      $: function () {
        n(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      },
      Ua: function () {
        n(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      },
      F: function (a, b, c) {
        Cd.length = 0;
        var d;
        for (c >>= 2; (d = v[b++]); )
          (d = 105 > d) && c & 1 && c++, Cd.push(d ? Sa[c++ >> 1] : E[c]), ++c;
        return mb[a].apply(null, Cd);
      },
      ra: Uc,
      I: function () {},
      A: Vc,
      p: tb,
      z: Db,
      Ed: function (a) {
        V.activeTexture(a);
      },
      Dd: function (a, b) {
        V.attachShader(S[a], dd[b]);
      },
      fa: function (a, b) {
        V.tf.beginQueryEXT(a, fd[b]);
      },
      Cd: function (a, b, c) {
        V.bindAttribLocation(S[a], b, C(c));
      },
      Bd: function (a, b) {
        V.bindBuffer(a, $c[b]);
      },
      Ad: function (a, b) {
        V.bindFramebuffer(a, ad[b]);
      },
      zd: function (a, b) {
        V.bindRenderbuffer(a, bd[b]);
      },
      yd: function (a, b) {
        V.bindTexture(a, cd[b]);
      },
      Md: function (a) {
        V.bindVertexArray(ed[a]);
      },
      xd: function (a, b, c, d) {
        V.blendColor(a, b, c, d);
      },
      wd: function (a) {
        V.blendEquation(a);
      },
      vd: function (a, b) {
        V.blendEquationSeparate(a, b);
      },
      ud: function (a, b) {
        V.blendFunc(a, b);
      },
      td: function (a, b, c, d) {
        V.blendFuncSeparate(a, b, c, d);
      },
      sd: function (a, b, c, d) {
        V.bufferData(a, c ? v.subarray(c, c + b) : b, d);
      },
      rd: function (a, b, c, d) {
        V.bufferSubData(a, b, v.subarray(d, d + c));
      },
      qd: function (a) {
        return V.checkFramebufferStatus(a);
      },
      pd: function (a) {
        V.clear(a);
      },
      od: function (a, b, c, d) {
        V.clearColor(a, b, c, d);
      },
      nd: function (a) {
        V.clearDepth(a);
      },
      md: function (a) {
        V.clearStencil(a);
      },
      ld: function (a, b, c, d) {
        V.colorMask(!!a, !!b, !!c, !!d);
      },
      kd: function (a) {
        V.compileShader(dd[a]);
      },
      jd: function (a, b, c, d, e, g, k, m) {
        V.compressedTexImage2D(
          a,
          b,
          c,
          d,
          e,
          g,
          m ? v.subarray(m, m + k) : null
        );
      },
      id: function (a, b, c, d, e, g, k, m, r) {
        V.compressedTexSubImage2D(
          a,
          b,
          c,
          d,
          e,
          g,
          k,
          r ? v.subarray(r, r + m) : null
        );
      },
      hd: function (a, b, c, d, e, g, k, m) {
        V.copyTexImage2D(a, b, c, d, e, g, k, m);
      },
      gd: function (a, b, c, d, e, g, k, m) {
        V.copyTexSubImage2D(a, b, c, d, e, g, k, m);
      },
      fd: function () {
        var a = kd(S),
          b = V.createProgram();
        b.name = a;
        S[a] = b;
        return a;
      },
      ed: function (a) {
        var b = kd(dd);
        dd[b] = V.createShader(a);
        return b;
      },
      dd: function (a) {
        V.cullFace(a);
      },
      cd: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = E[(b + 4 * c) >> 2],
            e = $c[d];
          e && (V.deleteBuffer(e), (e.name = 0), ($c[d] = null));
        }
      },
      bd: function (a, b) {
        for (var c = 0; c < a; ++c) {
          var d = E[(b + 4 * c) >> 2],
            e = ad[d];
          e && (V.deleteFramebuffer(e), (e.name = 0), (ad[d] = null));
        }
      },
      ad: function (a) {
        if (a) {
          var b = S[a];
          b
            ? (V.deleteProgram(b), (b.name = 0), (S[a] = null), (gd[a] = null))
            : U(1281);
        }
      },
      ha: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = E[(b + 4 * c) >> 2],
            e = fd[d];
          e && (V.tf.deleteQueryEXT(e), (fd[d] = null));
        }
      },
      $c: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = E[(b + 4 * c) >> 2],
            e = bd[d];
          e && (V.deleteRenderbuffer(e), (e.name = 0), (bd[d] = null));
        }
      },
      _c: function (a) {
        if (a) {
          var b = dd[a];
          b ? (V.deleteShader(b), (dd[a] = null)) : U(1281);
        }
      },
      Zc: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = E[(b + 4 * c) >> 2],
            e = cd[d];
          e && (V.deleteTexture(e), (e.name = 0), (cd[d] = null));
        }
      },
      Ld: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = E[(b + 4 * c) >> 2];
          V.deleteVertexArray(ed[d]);
          ed[d] = null;
        }
      },
      Yc: function (a) {
        V.depthFunc(a);
      },
      Xc: function (a) {
        V.depthMask(!!a);
      },
      Wc: function (a, b) {
        V.depthRange(a, b);
      },
      Vc: function (a, b) {
        V.detachShader(S[a], dd[b]);
      },
      Uc: function (a) {
        V.disable(a);
      },
      Tc: function (a) {
        V.disableVertexAttribArray(a);
      },
      Sc: function (a, b, c) {
        V.drawArrays(a, b, c);
      },
      Hd: function (a, b, c, d) {
        V.drawArraysInstanced(a, b, c, d);
      },
      Id: function (a, b) {
        for (var c = nd[a], d = 0; d < a; d++) c[d] = E[(b + 4 * d) >> 2];
        V.drawBuffers(c);
      },
      Rc: function (a, b, c, d) {
        V.drawElements(a, b, c, d);
      },
      Gd: function (a, b, c, d, e) {
        V.drawElementsInstanced(a, b, c, d, e);
      },
      Qc: function (a) {
        V.enable(a);
      },
      Pc: function (a) {
        V.enableVertexAttribArray(a);
      },
      ea: function (a) {
        V.tf.endQueryEXT(a);
      },
      Oc: function () {
        V.finish();
      },
      Nc: function () {
        V.flush();
      },
      Mc: function (a, b, c, d) {
        V.framebufferRenderbuffer(a, b, c, bd[d]);
      },
      Lc: function (a, b, c, d, e) {
        V.framebufferTexture2D(a, b, c, cd[d], e);
      },
      Kc: function (a) {
        V.frontFace(a);
      },
      Jc: function (a, b) {
        od(a, b, "createBuffer", $c);
      },
      Hc: function (a, b) {
        od(a, b, "createFramebuffer", ad);
      },
      ia: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = V.tf.createQueryEXT();
          if (!d) {
            for (U(1282); c < a; ) E[(b + 4 * c++) >> 2] = 0;
            break;
          }
          var e = kd(fd);
          d.name = e;
          fd[e] = d;
          E[(b + 4 * c) >> 2] = e;
        }
      },
      Gc: function (a, b) {
        od(a, b, "createRenderbuffer", bd);
      },
      Fc: function (a, b) {
        od(a, b, "createTexture", cd);
      },
      Kd: function (a, b) {
        od(a, b, "createVertexArray", ed);
      },
      Ic: function (a) {
        V.generateMipmap(a);
      },
      Ec: function (a, b, c, d, e, g, k) {
        rd("getActiveAttrib", a, b, c, d, e, g, k);
      },
      Dc: function (a, b, c, d, e, g, k) {
        rd("getActiveUniform", a, b, c, d, e, g, k);
      },
      Cc: function (a, b, c, d) {
        a = V.getAttachedShaders(S[a]);
        var e = a.length;
        e > b && (e = b);
        E[c >> 2] = e;
        for (b = 0; b < e; ++b) E[(d + 4 * b) >> 2] = dd.indexOf(a[b]);
      },
      Bc: function (a, b) {
        return V.getAttribLocation(S[a], C(b));
      },
      Ac: function (a, b) {
        td(a, b, 4);
      },
      zc: function (a, b, c) {
        c ? (E[c >> 2] = V.getBufferParameter(a, b)) : U(1281);
      },
      yc: function () {
        var a = V.getError() || jd;
        jd = 0;
        return a;
      },
      xc: function (a, b) {
        td(a, b, 2);
      },
      wc: function (a, b, c, d) {
        a = V.getFramebufferAttachmentParameter(a, b, c);
        if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
          a = a.name | 0;
        E[d >> 2] = a;
      },
      vc: function (a, b) {
        td(a, b, 0);
      },
      tc: function (a, b, c, d) {
        a = V.getProgramInfoLog(S[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? Ia(a, v, d, b) : 0;
        c && (E[c >> 2] = b);
      },
      uc: function (a, b, c) {
        if (c)
          if (a >= Zc) U(1281);
          else {
            var d = gd[a];
            if (d)
              if (35716 == b)
                (a = V.getProgramInfoLog(S[a])),
                  null === a && (a = "(unknown error)"),
                  (E[c >> 2] = a.length + 1);
              else if (35719 == b) E[c >> 2] = d.Wg;
              else if (35722 == b) {
                if (-1 == d.ig) {
                  a = S[a];
                  var e = V.getProgramParameter(a, 35721);
                  for (b = d.ig = 0; b < e; ++b)
                    d.ig = Math.max(
                      d.ig,
                      V.getActiveAttrib(a, b).name.length + 1
                    );
                }
                E[c >> 2] = d.ig;
              } else if (35381 == b) {
                if (-1 == d.jg)
                  for (
                    a = S[a], e = V.getProgramParameter(a, 35382), b = d.jg = 0;
                    b < e;
                    ++b
                  )
                    d.jg = Math.max(
                      d.jg,
                      V.getActiveUniformBlockName(a, b).length + 1
                    );
                E[c >> 2] = d.jg;
              } else E[c >> 2] = V.getProgramParameter(S[a], b);
            else U(1282);
          }
        else U(1281);
      },
      Od: function (a, b, c) {
        if (c) {
          a = V.tf.getQueryObjectEXT(fd[a], b);
          var d;
          "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
          sd(c, d);
        } else U(1281);
      },
      Qd: function (a, b, c) {
        if (c) {
          a = V.tf.getQueryObjectEXT(fd[a], b);
          var d;
          "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
          E[c >> 2] = d;
        } else U(1281);
      },
      Nd: function (a, b, c) {
        if (c) {
          a = V.tf.getQueryObjectEXT(fd[a], b);
          var d;
          "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
          sd(c, d);
        } else U(1281);
      },
      Pd: function (a, b, c) {
        if (c) {
          a = V.tf.getQueryObjectEXT(fd[a], b);
          var d;
          "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
          E[c >> 2] = d;
        } else U(1281);
      },
      ca: function (a, b, c) {
        c ? (E[c >> 2] = V.tf.getQueryEXT(a, b)) : U(1281);
      },
      sc: function (a, b, c) {
        c ? (E[c >> 2] = V.getRenderbufferParameter(a, b)) : U(1281);
      },
      qc: function (a, b, c, d) {
        a = V.getShaderInfoLog(dd[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? Ia(a, v, d, b) : 0;
        c && (E[c >> 2] = b);
      },
      pc: function (a, b, c, d) {
        a = V.getShaderPrecisionFormat(a, b);
        E[c >> 2] = a.rangeMin;
        E[(c + 4) >> 2] = a.rangeMax;
        E[d >> 2] = a.precision;
      },
      oc: function (a, b, c, d) {
        if ((a = V.getShaderSource(dd[a])))
          (b = 0 < b && d ? Ia(a, v, d, b) : 0), c && (E[c >> 2] = b);
      },
      rc: function (a, b, c) {
        c
          ? 35716 == b
            ? ((a = V.getShaderInfoLog(dd[a])),
              null === a && (a = "(unknown error)"),
              (E[c >> 2] = a ? a.length + 1 : 0))
            : 35720 == b
            ? ((a = V.getShaderSource(dd[a])),
              (E[c >> 2] = a ? a.length + 1 : 0))
            : (E[c >> 2] = V.getShaderParameter(dd[a], b))
          : U(1281);
      },
      nc: function (a) {
        if (hd[a]) return hd[a];
        switch (a) {
          case 7939:
            var b = V.getSupportedExtensions() || [];
            b = b.concat(
              b.map(function (d) {
                return "GL_" + d;
              })
            );
            b = ud(b.join(" "));
            break;
          case 7936:
          case 7937:
          case 37445:
          case 37446:
            (b = V.getParameter(a)) || U(1280);
            b = ud(b);
            break;
          case 7938:
            b = ud("OpenGL ES 2.0 (" + V.getParameter(7938) + ")");
            break;
          case 35724:
            b = V.getParameter(35724);
            var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
            null !== c &&
              (3 == c[1].length && (c[1] += "0"),
              (b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")"));
            b = ud(b);
            break;
          default:
            return U(1280), 0;
        }
        return (hd[a] = b);
      },
      mc: function (a, b, c) {
        c ? (G[c >> 2] = V.getTexParameter(a, b)) : U(1281);
      },
      lc: function (a, b, c) {
        c ? (E[c >> 2] = V.getTexParameter(a, b)) : U(1281);
      },
      ic: function (a, b) {
        b = C(b);
        var c = 0;
        if ("]" == b[b.length - 1]) {
          var d = b.lastIndexOf("[");
          c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0;
          b = b.slice(0, d);
        }
        return (a = gd[a] && gd[a].Mh[b]) && 0 <= c && c < a[0] ? a[1] + c : -1;
      },
      kc: function (a, b, c) {
        vd(a, b, c, 2);
      },
      jc: function (a, b, c) {
        vd(a, b, c, 0);
      },
      fc: function (a, b, c) {
        c ? (E[c >> 2] = V.getVertexAttribOffset(a, b)) : U(1281);
      },
      hc: function (a, b, c) {
        wd(a, b, c, 2);
      },
      gc: function (a, b, c) {
        wd(a, b, c, 5);
      },
      ec: function (a, b) {
        V.hint(a, b);
      },
      dc: function (a) {
        return (a = $c[a]) ? V.isBuffer(a) : 0;
      },
      cc: function (a) {
        return V.isEnabled(a);
      },
      bc: function (a) {
        return (a = ad[a]) ? V.isFramebuffer(a) : 0;
      },
      ac: function (a) {
        return (a = S[a]) ? V.isProgram(a) : 0;
      },
      ga: function (a) {
        return (a = fd[a]) ? V.tf.isQueryEXT(a) : 0;
      },
      $b: function (a) {
        return (a = bd[a]) ? V.isRenderbuffer(a) : 0;
      },
      _b: function (a) {
        return (a = dd[a]) ? V.isShader(a) : 0;
      },
      Zb: function (a) {
        return (a = cd[a]) ? V.isTexture(a) : 0;
      },
      Jd: function (a) {
        return (a = ed[a]) ? V.isVertexArray(a) : 0;
      },
      Yb: function (a) {
        V.lineWidth(a);
      },
      Xb: function (a) {
        V.linkProgram(S[a]);
        var b = S[a];
        a = gd[a] = { Mh: {}, Wg: 0, ig: -1, jg: -1 };
        for (
          var c = a.Mh, d = V.getProgramParameter(b, 35718), e = 0;
          e < d;
          ++e
        ) {
          var g = V.getActiveUniform(b, e),
            k = g.name;
          a.Wg = Math.max(a.Wg, k.length + 1);
          "]" == k.slice(-1) && (k = k.slice(0, k.lastIndexOf("[")));
          var m = V.getUniformLocation(b, k);
          if (m) {
            var r = kd(T);
            c[k] = [g.size, r];
            T[r] = m;
            for (var q = 1; q < g.size; ++q)
              (m = V.getUniformLocation(b, k + "[" + q + "]")),
                (r = kd(T)),
                (T[r] = m);
          }
        }
      },
      Wb: function (a, b) {
        3317 == a && (id = b);
        V.pixelStorei(a, b);
      },
      Vb: function (a, b) {
        V.polygonOffset(a, b);
      },
      da: function (a, b) {
        V.tf.queryCounterEXT(fd[a], b);
      },
      Ub: function (a, b, c, d, e, g, k) {
        (k = xd(g, e, c, d, k)) ? V.readPixels(a, b, c, d, e, g, k) : U(1280);
      },
      Tb: function () {},
      Sb: function (a, b, c, d) {
        V.renderbufferStorage(a, b, c, d);
      },
      Rb: function (a, b) {
        V.sampleCoverage(a, !!b);
      },
      Qb: function (a, b, c, d) {
        V.scissor(a, b, c, d);
      },
      Pb: function () {
        U(1280);
      },
      Ob: function (a, b, c, d) {
        for (var e = "", g = 0; g < b; ++g) {
          var k = d ? E[(d + 4 * g) >> 2] : -1;
          e += C(E[(c + 4 * g) >> 2], 0 > k ? void 0 : k);
        }
        V.shaderSource(dd[a], e);
      },
      Nb: function (a, b, c) {
        V.stencilFunc(a, b, c);
      },
      Mb: function (a, b, c, d) {
        V.stencilFuncSeparate(a, b, c, d);
      },
      Lb: function (a) {
        V.stencilMask(a);
      },
      Kb: function (a, b) {
        V.stencilMaskSeparate(a, b);
      },
      Jb: function (a, b, c) {
        V.stencilOp(a, b, c);
      },
      Ib: function (a, b, c, d) {
        V.stencilOpSeparate(a, b, c, d);
      },
      Hb: function (a, b, c, d, e, g, k, m, r) {
        V.texImage2D(a, b, c, d, e, g, k, m, r ? xd(m, k, d, e, r) : null);
      },
      Gb: function (a, b, c) {
        V.texParameterf(a, b, c);
      },
      Fb: function (a, b, c) {
        V.texParameterf(a, b, G[c >> 2]);
      },
      Eb: function (a, b, c) {
        V.texParameteri(a, b, c);
      },
      Db: function (a, b, c) {
        V.texParameteri(a, b, E[c >> 2]);
      },
      Cb: function (a, b, c, d, e, g, k, m, r) {
        var q = null;
        r && (q = xd(m, k, e, g, r));
        V.texSubImage2D(a, b, c, d, e, g, k, m, q);
      },
      Bb: function (a, b) {
        V.uniform1f(T[a], b);
      },
      Ab: function (a, b, c) {
        if (288 >= b)
          for (var d = yd[b - 1], e = 0; e < b; ++e) d[e] = G[(c + 4 * e) >> 2];
        else d = G.subarray(c >> 2, (c + 4 * b) >> 2);
        V.uniform1fv(T[a], d);
      },
      zb: function (a, b) {
        V.uniform1i(T[a], b);
      },
      yb: function (a, b, c) {
        if (288 >= b)
          for (var d = zd[b - 1], e = 0; e < b; ++e) d[e] = E[(c + 4 * e) >> 2];
        else d = E.subarray(c >> 2, (c + 4 * b) >> 2);
        V.uniform1iv(T[a], d);
      },
      xb: function (a, b, c) {
        V.uniform2f(T[a], b, c);
      },
      wb: function (a, b, c) {
        if (144 >= b)
          for (var d = yd[2 * b - 1], e = 0; e < 2 * b; e += 2)
            (d[e] = G[(c + 4 * e) >> 2]),
              (d[e + 1] = G[(c + (4 * e + 4)) >> 2]);
        else d = G.subarray(c >> 2, (c + 8 * b) >> 2);
        V.uniform2fv(T[a], d);
      },
      vb: function (a, b, c) {
        V.uniform2i(T[a], b, c);
      },
      ub: function (a, b, c) {
        if (144 >= b)
          for (var d = zd[2 * b - 1], e = 0; e < 2 * b; e += 2)
            (d[e] = E[(c + 4 * e) >> 2]),
              (d[e + 1] = E[(c + (4 * e + 4)) >> 2]);
        else d = E.subarray(c >> 2, (c + 8 * b) >> 2);
        V.uniform2iv(T[a], d);
      },
      tb: function (a, b, c, d) {
        V.uniform3f(T[a], b, c, d);
      },
      sb: function (a, b, c) {
        if (96 >= b)
          for (var d = yd[3 * b - 1], e = 0; e < 3 * b; e += 3)
            (d[e] = G[(c + 4 * e) >> 2]),
              (d[e + 1] = G[(c + (4 * e + 4)) >> 2]),
              (d[e + 2] = G[(c + (4 * e + 8)) >> 2]);
        else d = G.subarray(c >> 2, (c + 12 * b) >> 2);
        V.uniform3fv(T[a], d);
      },
      rb: function (a, b, c, d) {
        V.uniform3i(T[a], b, c, d);
      },
      qb: function (a, b, c) {
        if (96 >= b)
          for (var d = zd[3 * b - 1], e = 0; e < 3 * b; e += 3)
            (d[e] = E[(c + 4 * e) >> 2]),
              (d[e + 1] = E[(c + (4 * e + 4)) >> 2]),
              (d[e + 2] = E[(c + (4 * e + 8)) >> 2]);
        else d = E.subarray(c >> 2, (c + 12 * b) >> 2);
        V.uniform3iv(T[a], d);
      },
      pb: function (a, b, c, d, e) {
        V.uniform4f(T[a], b, c, d, e);
      },
      ob: function (a, b, c) {
        if (72 >= b) {
          var d = yd[4 * b - 1];
          c >>= 2;
          for (var e = 0; e < 4 * b; e += 4) {
            var g = c + e;
            d[e] = G[g];
            d[e + 1] = G[g + 1];
            d[e + 2] = G[g + 2];
            d[e + 3] = G[g + 3];
          }
        } else d = G.subarray(c >> 2, (c + 16 * b) >> 2);
        V.uniform4fv(T[a], d);
      },
      nb: function (a, b, c, d, e) {
        V.uniform4i(T[a], b, c, d, e);
      },
      mb: function (a, b, c) {
        if (72 >= b)
          for (var d = zd[4 * b - 1], e = 0; e < 4 * b; e += 4)
            (d[e] = E[(c + 4 * e) >> 2]),
              (d[e + 1] = E[(c + (4 * e + 4)) >> 2]),
              (d[e + 2] = E[(c + (4 * e + 8)) >> 2]),
              (d[e + 3] = E[(c + (4 * e + 12)) >> 2]);
        else d = E.subarray(c >> 2, (c + 16 * b) >> 2);
        V.uniform4iv(T[a], d);
      },
      lb: function (a, b, c, d) {
        if (72 >= b)
          for (var e = yd[4 * b - 1], g = 0; g < 4 * b; g += 4)
            (e[g] = G[(d + 4 * g) >> 2]),
              (e[g + 1] = G[(d + (4 * g + 4)) >> 2]),
              (e[g + 2] = G[(d + (4 * g + 8)) >> 2]),
              (e[g + 3] = G[(d + (4 * g + 12)) >> 2]);
        else e = G.subarray(d >> 2, (d + 16 * b) >> 2);
        V.uniformMatrix2fv(T[a], !!c, e);
      },
      kb: function (a, b, c, d) {
        if (32 >= b)
          for (var e = yd[9 * b - 1], g = 0; g < 9 * b; g += 9)
            (e[g] = G[(d + 4 * g) >> 2]),
              (e[g + 1] = G[(d + (4 * g + 4)) >> 2]),
              (e[g + 2] = G[(d + (4 * g + 8)) >> 2]),
              (e[g + 3] = G[(d + (4 * g + 12)) >> 2]),
              (e[g + 4] = G[(d + (4 * g + 16)) >> 2]),
              (e[g + 5] = G[(d + (4 * g + 20)) >> 2]),
              (e[g + 6] = G[(d + (4 * g + 24)) >> 2]),
              (e[g + 7] = G[(d + (4 * g + 28)) >> 2]),
              (e[g + 8] = G[(d + (4 * g + 32)) >> 2]);
        else e = G.subarray(d >> 2, (d + 36 * b) >> 2);
        V.uniformMatrix3fv(T[a], !!c, e);
      },
      jb: function (a, b, c, d) {
        if (18 >= b) {
          var e = yd[16 * b - 1];
          d >>= 2;
          for (var g = 0; g < 16 * b; g += 16) {
            var k = d + g;
            e[g] = G[k];
            e[g + 1] = G[k + 1];
            e[g + 2] = G[k + 2];
            e[g + 3] = G[k + 3];
            e[g + 4] = G[k + 4];
            e[g + 5] = G[k + 5];
            e[g + 6] = G[k + 6];
            e[g + 7] = G[k + 7];
            e[g + 8] = G[k + 8];
            e[g + 9] = G[k + 9];
            e[g + 10] = G[k + 10];
            e[g + 11] = G[k + 11];
            e[g + 12] = G[k + 12];
            e[g + 13] = G[k + 13];
            e[g + 14] = G[k + 14];
            e[g + 15] = G[k + 15];
          }
        } else e = G.subarray(d >> 2, (d + 64 * b) >> 2);
        V.uniformMatrix4fv(T[a], !!c, e);
      },
      ib: function (a) {
        V.useProgram(S[a]);
      },
      hb: function (a) {
        V.validateProgram(S[a]);
      },
      gb: function (a, b) {
        V.vertexAttrib1f(a, b);
      },
      fb: function (a, b) {
        V.vertexAttrib1f(a, G[b >> 2]);
      },
      eb: function (a, b, c) {
        V.vertexAttrib2f(a, b, c);
      },
      db: function (a, b) {
        V.vertexAttrib2f(a, G[b >> 2], G[(b + 4) >> 2]);
      },
      cb: function (a, b, c, d) {
        V.vertexAttrib3f(a, b, c, d);
      },
      bb: function (a, b) {
        V.vertexAttrib3f(a, G[b >> 2], G[(b + 4) >> 2], G[(b + 8) >> 2]);
      },
      ab: function (a, b, c, d, e) {
        V.vertexAttrib4f(a, b, c, d, e);
      },
      $a: function (a, b) {
        V.vertexAttrib4f(
          a,
          G[b >> 2],
          G[(b + 4) >> 2],
          G[(b + 8) >> 2],
          G[(b + 12) >> 2]
        );
      },
      Fd: function (a, b) {
        V.vertexAttribDivisor(a, b);
      },
      _a: function (a, b, c, d, e, g) {
        V.vertexAttribPointer(a, b, c, !!d, e, g);
      },
      Za: function (a, b, c, d) {
        V.viewport(a, b, c, d);
      },
      la: function () {
        return "undefined" !== typeof SharedArrayBuffer;
      },
      G: function () {
        return rb | 0;
      },
      R: function () {
        return qb | 0;
      },
      f: function (a, b) {
        Z(a, b || 1);
        throw "longjmp";
      },
      ka: function (a, b, c) {
        v.copyWithin(a, b, b + c);
      },
      na: function (a, b, c) {
        Bd.length = b;
        c >>= 3;
        for (var d = 0; d < b; d++) Bd[d] = Sa[c + d];
        return (0 > a ? mb[-a - 1] : ke[a]).apply(null, Bd);
      },
      sa: function () {
        n("OOM");
      },
      oa: function (a, b, c) {
        return Ed(a) ? Fd(a, b, c) : Hd(a, b, c);
      },
      Q: function () {},
      ma: function () {},
      pa: function (a, b) {
        var c = {};
        b >>= 2;
        c.alpha = !!E[b];
        c.depth = !!E[b + 1];
        c.stencil = !!E[b + 2];
        c.antialias = !!E[b + 3];
        c.premultipliedAlpha = !!E[b + 4];
        c.preserveDrawingBuffer = !!E[b + 5];
        c.powerPreference = Id[E[b + 6]];
        c.failIfMajorPerformanceCaveat = !!E[b + 7];
        c.vi = E[b + 8];
        c.oj = E[b + 9];
        c.ph = E[b + 10];
        c.gi = E[b + 11];
        c.tj = E[b + 12];
        c.uj = E[b + 13];
        a = Ed(a);
        if (!a || c.gi) c = 0;
        else if ((a = a.getContext("webgl", c))) {
          b = Ma(8);
          E[(b + 4) >> 2] = pb | 0;
          var d = { ij: b, attributes: c, version: c.vi, pg: a };
          a.canvas && (a.canvas.qg = d);
          ("undefined" === typeof c.ph || c.ph) && ld(d);
          c = b;
        } else c = 0;
        return c;
      },
      ta: function (a, b) {
        var c = 0;
        Kd().forEach(function (d, e) {
          var g = b + c;
          E[(a + 4 * e) >> 2] = g;
          Pa(d, g);
          c += d.length + 1;
        });
        return 0;
      },
      ua: function (a, b) {
        var c = Kd();
        E[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        E[b >> 2] = d;
        return 0;
      },
      D: function (a) {
        Cb(a);
      },
      H: Md,
      U: Nd,
      ya: Od,
      Va: Pd,
      M: Qd,
      B: Sd,
      d: function () {
        return Aa | 0;
      },
      x: Td,
      v: function (a, b, c, d, e, g, k) {
        b = Oc(a, b);
        if (b.df) return -6;
        a = b.port;
        var m = b.gf;
        b = !1;
        if (c && d) {
          var r;
          if (k & 1 || !(r = Kc(m))) {
            if (k & 8) return -2;
          } else m = r;
          c = Ia(m, v, c, d);
          c + 1 >= d && (b = !0);
        }
        e && g && ((c = Ia("" + a, v, e, g)), c + 1 >= g && (b = !0));
        return b ? -12 : 0;
      },
      l: function (a) {
        var b = Date.now();
        E[a >> 2] = (b / 1e3) | 0;
        E[(a + 4) >> 2] = ((b % 1e3) * 1e3) | 0;
        return 0;
      },
      r: Ib,
      ja: function () {
        M.oi();
      },
      ba: ne,
      j: oe,
      h: pe,
      C: qe,
      P: re,
      _: se,
      O: te,
      Xa: ue,
      Wa: ve,
      k: we,
      w: xe,
      J: ye,
      g: ze,
      N: Ae,
      Sa: Be,
      Z: Ce,
      Ya: De,
      q: Nb,
      a: Ca || f.wasmMemory,
      T: function (a) {
        Jb();
        var b = new Date(
            E[(a + 20) >> 2] + 1900,
            E[(a + 16) >> 2],
            E[(a + 12) >> 2],
            E[(a + 8) >> 2],
            E[(a + 4) >> 2],
            E[a >> 2],
            0
          ),
          c = E[(a + 32) >> 2],
          d = b.getTimezoneOffset(),
          e = new Date(b.getFullYear(), 0, 1),
          g = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(),
          k = e.getTimezoneOffset(),
          m = Math.min(k, g);
        0 > c
          ? (E[(a + 32) >> 2] = Number(g != k && m == d))
          : 0 < c != (m == d) &&
            ((g = Math.max(k, g)),
            b.setTime(b.getTime() + 6e4 * ((0 < c ? m : g) - d)));
        E[(a + 24) >> 2] = b.getDay();
        E[(a + 28) >> 2] = ((b.getTime() - e.getTime()) / 864e5) | 0;
        return (b.getTime() / 1e3) | 0;
      },
      Ra: function (a) {
        if (a === M.Oh)
          return u("Main thread (id=" + a + ") cannot be canceled!"), 71;
        if (!a)
          return u("pthread_cancel attempted on a null thread pointer!"), 71;
        if (E[(a + 12) >> 2] !== a)
          return (
            u(
              "pthread_cancel attempted on thread " +
                a +
                ", which does not point to a valid thread, or does not exist anymore!"
            ),
            71
          );
        Atomics.compareExchange(F, a >> 2, 0, 2);
        l ? postMessage({ cmd: "cancelThread", thread: a }) : ub(a);
        return 0;
      },
      S: function (a) {
        var b = M.Cg.pop();
        a && b();
      },
      L: function (a, b) {
        M.Cg.push(function () {
          H.get(a)(b);
        });
      },
      n: function (a, b, c, d) {
        if ("undefined" === typeof SharedArrayBuffer)
          return (
            u(
              "Current environment does not support SharedArrayBuffer, pthreads are not available!"
            ),
            6
          );
        if (!a)
          return u("pthread_create called with a null thread pointer!"), 28;
        var e = [];
        if (l && 0 === e.length) return Ee(687865856, a, b, c, d);
        var g = 0,
          k = 0,
          m = 0,
          r = 0;
        if (b) {
          var q = E[b >> 2];
          q += 81920;
          g = E[(b + 8) >> 2];
          k = 0 !== E[(b + 12) >> 2];
          if (0 === E[(b + 16) >> 2]) {
            var t = E[(b + 20) >> 2],
              w = E[(b + 24) >> 2];
            m = b + 20;
            r = b + 24;
            var B = M.Lg ? M.Lg : pb | 0;
            if (m || r)
              if (B)
                if (E[(B + 12) >> 2] !== B)
                  u(
                    "pthread_getschedparam attempted on thread " +
                      B +
                      ", which does not point to a valid thread, or does not exist anymore!"
                  );
                else {
                  var p = Atomics.load(F, (B + 128) >> 2);
                  B = Atomics.load(F, (B + 132) >> 2);
                  m && (E[m >> 2] = p);
                  r && (E[r >> 2] = B);
                }
              else
                u("pthread_getschedparam called with a null thread pointer!");
            m = E[(b + 20) >> 2];
            r = E[(b + 24) >> 2];
            E[(b + 20) >> 2] = t;
            E[(b + 24) >> 2] = w;
          } else (m = E[(b + 20) >> 2]), (r = E[(b + 24) >> 2]);
        } else q = 2097152;
        (b = 0 == g) ? (g = vc(16, q)) : ((g -= q), assert(0 < g));
        t = Ma(232);
        for (w = 0; 58 > w; ++w) F[(t >> 2) + w] = 0;
        E[a >> 2] = t;
        E[(t + 12) >> 2] = t;
        a = t + 156;
        E[a >> 2] = a;
        c = {
          Qf: g,
          bg: q,
          Jg: b,
          Hh: m,
          Ih: r,
          detached: k,
          Li: c,
          Zf: t,
          Ei: pb | 0,
          Sf: d,
          Ui: e,
        };
        l ? ((c.Zi = "spawnThread"), postMessage(c, e)) : Bb(c);
        return 0;
      },
      o: function (a, b) {
        return Xd(a, b);
      },
      i: Wd,
      e: function (a) {
        Aa = a | 0;
      },
      E: function () {
        return 0;
      },
      m: function (a, b, c, d) {
        function e(p, x, z) {
          for (
            p = "number" === typeof p ? p.toString() : p || "";
            p.length < x;

          )
            p = z[0] + p;
          return p;
        }
        function g(p, x) {
          return e(p, x, "0");
        }
        function k(p, x) {
          function z(W) {
            return 0 > W ? -1 : 0 < W ? 1 : 0;
          }
          var I;
          0 === (I = z(p.getFullYear() - x.getFullYear())) &&
            0 === (I = z(p.getMonth() - x.getMonth())) &&
            (I = z(p.getDate() - x.getDate()));
          return I;
        }
        function m(p) {
          switch (p.getDay()) {
            case 0:
              return new Date(p.getFullYear() - 1, 11, 29);
            case 1:
              return p;
            case 2:
              return new Date(p.getFullYear(), 0, 3);
            case 3:
              return new Date(p.getFullYear(), 0, 2);
            case 4:
              return new Date(p.getFullYear(), 0, 1);
            case 5:
              return new Date(p.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(p.getFullYear() - 1, 11, 30);
          }
        }
        function r(p) {
          p = be(new Date(p.qf + 1900, 0, 1), p.Fg);
          var x = new Date(p.getFullYear() + 1, 0, 4),
            z = m(new Date(p.getFullYear(), 0, 4));
          x = m(x);
          return 0 >= k(z, p)
            ? 0 >= k(x, p)
              ? p.getFullYear() + 1
              : p.getFullYear()
            : p.getFullYear() - 1;
        }
        var q = E[(d + 40) >> 2];
        d = {
          Si: E[d >> 2],
          Ri: E[(d + 4) >> 2],
          Dg: E[(d + 8) >> 2],
          og: E[(d + 12) >> 2],
          cg: E[(d + 16) >> 2],
          qf: E[(d + 20) >> 2],
          Eg: E[(d + 24) >> 2],
          Fg: E[(d + 28) >> 2],
          xj: E[(d + 32) >> 2],
          Qi: E[(d + 36) >> 2],
          Ti: q ? C(q) : "",
        };
        c = C(c);
        q = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y",
        };
        for (var t in q) c = c.replace(new RegExp(t, "g"), q[t]);
        var w = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
            " "
          ),
          B = "January February March April May June July August September October November December".split(
            " "
          );
        q = {
          "%a": function (p) {
            return w[p.Eg].substring(0, 3);
          },
          "%A": function (p) {
            return w[p.Eg];
          },
          "%b": function (p) {
            return B[p.cg].substring(0, 3);
          },
          "%B": function (p) {
            return B[p.cg];
          },
          "%C": function (p) {
            return g(((p.qf + 1900) / 100) | 0, 2);
          },
          "%d": function (p) {
            return g(p.og, 2);
          },
          "%e": function (p) {
            return e(p.og, 2, " ");
          },
          "%g": function (p) {
            return r(p).toString().substring(2);
          },
          "%G": function (p) {
            return r(p);
          },
          "%H": function (p) {
            return g(p.Dg, 2);
          },
          "%I": function (p) {
            p = p.Dg;
            0 == p ? (p = 12) : 12 < p && (p -= 12);
            return g(p, 2);
          },
          "%j": function (p) {
            return g(p.og + Zd(Yd(p.qf + 1900) ? $d : ae, p.cg - 1), 3);
          },
          "%m": function (p) {
            return g(p.cg + 1, 2);
          },
          "%M": function (p) {
            return g(p.Ri, 2);
          },
          "%n": function () {
            return "\n";
          },
          "%p": function (p) {
            return 0 <= p.Dg && 12 > p.Dg ? "AM" : "PM";
          },
          "%S": function (p) {
            return g(p.Si, 2);
          },
          "%t": function () {
            return "\t";
          },
          "%u": function (p) {
            return p.Eg || 7;
          },
          "%U": function (p) {
            var x = new Date(p.qf + 1900, 0, 1),
              z = 0 === x.getDay() ? x : be(x, 7 - x.getDay());
            p = new Date(p.qf + 1900, p.cg, p.og);
            return 0 > k(z, p)
              ? g(
                  Math.ceil(
                    (31 -
                      z.getDate() +
                      (Zd(Yd(p.getFullYear()) ? $d : ae, p.getMonth() - 1) -
                        31) +
                      p.getDate()) /
                      7
                  ),
                  2
                )
              : 0 === k(z, x)
              ? "01"
              : "00";
          },
          "%V": function (p) {
            var x = new Date(p.qf + 1901, 0, 4),
              z = m(new Date(p.qf + 1900, 0, 4));
            x = m(x);
            var I = be(new Date(p.qf + 1900, 0, 1), p.Fg);
            return 0 > k(I, z)
              ? "53"
              : 0 >= k(x, I)
              ? "01"
              : g(
                  Math.ceil(
                    (z.getFullYear() < p.qf + 1900
                      ? p.Fg + 32 - z.getDate()
                      : p.Fg + 1 - z.getDate()) / 7
                  ),
                  2
                );
          },
          "%w": function (p) {
            return p.Eg;
          },
          "%W": function (p) {
            var x = new Date(p.qf, 0, 1),
              z =
                1 === x.getDay()
                  ? x
                  : be(x, 0 === x.getDay() ? 1 : 7 - x.getDay() + 1);
            p = new Date(p.qf + 1900, p.cg, p.og);
            return 0 > k(z, p)
              ? g(
                  Math.ceil(
                    (31 -
                      z.getDate() +
                      (Zd(Yd(p.getFullYear()) ? $d : ae, p.getMonth() - 1) -
                        31) +
                      p.getDate()) /
                      7
                  ),
                  2
                )
              : 0 === k(z, x)
              ? "01"
              : "00";
          },
          "%y": function (p) {
            return (p.qf + 1900).toString().substring(2);
          },
          "%Y": function (p) {
            return p.qf + 1900;
          },
          "%z": function (p) {
            p = p.Qi;
            var x = 0 <= p;
            p = Math.abs(p) / 60;
            return (
              (x ? "+" : "-") +
              String("0000" + ((p / 60) * 100 + (p % 60))).slice(-4)
            );
          },
          "%Z": function (p) {
            return p.Ti;
          },
          "%%": function () {
            return "%";
          },
        };
        for (t in q)
          0 <= c.indexOf(t) && (c = c.replace(new RegExp(t, "g"), q[t](d)));
        t = Zb(c, !1);
        if (t.length > b) return 0;
        y.set(t, a);
        return t.length - 1;
      },
      y: ce,
      s: function (a) {
        var b = (Date.now() / 1e3) | 0;
        a && (E[a >> 2] = b);
        return b;
      },
    };
    (function () {
      function a(e, g) {
        f.asm = e.exports;
        H = f.asm.Rd;
        Da = g;
        l || fb();
      }
      function b(e) {
        a(e.instance, e.module);
      }
      function c(e) {
        return kb()
          .then(function (g) {
            return WebAssembly.instantiate(g, d);
          })
          .then(e, function (g) {
            u("failed to asynchronously prepare wasm: " + g);
            n(g);
          });
      }
      var d = { a: Fe };
      l || eb();
      if (f.instantiateWasm)
        try {
          return f.instantiateWasm(d, a);
        } catch (e) {
          return (
            u("Module.instantiateWasm callback failed with error: " + e), !1
          );
        }
      (function () {
        return Ba ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          ib() ||
          gb("file://") ||
          "function" !== typeof fetch
          ? c(b)
          : fetch(hb, { credentials: "same-origin" }).then(function (e) {
              return WebAssembly.instantiateStreaming(e, d).then(
                b,
                function (g) {
                  u("wasm streaming compile failed: " + g);
                  u("falling back to ArrayBuffer instantiation");
                  return c(b);
                }
              );
            });
      })().catch(ca);
      return {};
    })();
    var le = (f.___wasm_call_ctors = function () {
        return (le = f.___wasm_call_ctors = f.asm.Sd).apply(null, arguments);
      }),
      zb = (f._free = function () {
        return (zb = f._free = f.asm.Td).apply(null, arguments);
      }),
      Ma = (f._malloc = function () {
        return (Ma = f._malloc = f.asm.Ud).apply(null, arguments);
      }),
      Fb = (f.___errno_location = function () {
        return (Fb = f.___errno_location = f.asm.Vd).apply(null, arguments);
      }),
      qc = (f._memset = function () {
        return (qc = f._memset = f.asm.Wd).apply(null, arguments);
      });
    f._fflush = function () {
      return (f._fflush = f.asm.Xd).apply(null, arguments);
    };
    var vc = (f._memalign = function () {
        return (vc = f._memalign = f.asm.Yd).apply(null, arguments);
      }),
      Nc = (f._ntohs = function () {
        return (Nc = f._ntohs = f.asm.Zd).apply(null, arguments);
      }),
      Fc = (f._htons = function () {
        return (Fc = f._htons = f.asm._d).apply(null, arguments);
      }),
      me = (f._main = function () {
        return (me = f._main = f.asm.$d).apply(null, arguments);
      }),
      Vd = (f._emscripten_get_global_libc = function () {
        return (Vd = f._emscripten_get_global_libc = f.asm.ae).apply(
          null,
          arguments
        );
      });
    f.___em_js__initPthreadsJS = function () {
      return (f.___em_js__initPthreadsJS = f.asm.be).apply(null, arguments);
    };
    var Ud = (f._htonl = function () {
        return (Ud = f._htonl = f.asm.ce).apply(null, arguments);
      }),
      Mb = (f.__get_tzname = function () {
        return (Mb = f.__get_tzname = f.asm.de).apply(null, arguments);
      }),
      Lb = (f.__get_daylight = function () {
        return (Lb = f.__get_daylight = f.asm.ee).apply(null, arguments);
      }),
      Kb = (f.__get_timezone = function () {
        return (Kb = f.__get_timezone = f.asm.fe).apply(null, arguments);
      }),
      A = (f.stackSave = function () {
        return (A = f.stackSave = f.asm.ge).apply(null, arguments);
      }),
      D = (f.stackRestore = function () {
        return (D = f.stackRestore = f.asm.he).apply(null, arguments);
      }),
      Ha = (f.stackAlloc = function () {
        return (Ha = f.stackAlloc = f.asm.ie).apply(null, arguments);
      }),
      Z = (f._setThrew = function () {
        return (Z = f._setThrew = f.asm.je).apply(null, arguments);
      });
    f._emscripten_main_browser_thread_id = function () {
      return (f._emscripten_main_browser_thread_id = f.asm.ke).apply(
        null,
        arguments
      );
    };
    var yb = (f.___pthread_tsd_run_dtors = function () {
        return (yb = f.___pthread_tsd_run_dtors = f.asm.le).apply(
          null,
          arguments
        );
      }),
      Ab = (f._emscripten_main_thread_process_queued_calls = function () {
        return (Ab = f._emscripten_main_thread_process_queued_calls =
          f.asm.me).apply(null, arguments);
      });
    f._emscripten_current_thread_process_queued_calls = function () {
      return (f._emscripten_current_thread_process_queued_calls =
        f.asm.ne).apply(null, arguments);
    };
    var wb = (f._emscripten_register_main_browser_thread_id = function () {
        return (wb = f._emscripten_register_main_browser_thread_id =
          f.asm.oe).apply(null, arguments);
      }),
      lb = (f._do_emscripten_dispatch_to_thread = function () {
        return (lb = f._do_emscripten_dispatch_to_thread = f.asm.pe).apply(
          null,
          arguments
        );
      });
    f._emscripten_async_run_in_main_thread = function () {
      return (f._emscripten_async_run_in_main_thread = f.asm.qe).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread = function () {
      return (f._emscripten_sync_run_in_main_thread = f.asm.re).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_0 = function () {
      return (f._emscripten_sync_run_in_main_thread_0 = f.asm.se).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_1 = function () {
      return (f._emscripten_sync_run_in_main_thread_1 = f.asm.te).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_2 = function () {
      return (f._emscripten_sync_run_in_main_thread_2 = f.asm.ue).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_xprintf_varargs = function () {
      return (f._emscripten_sync_run_in_main_thread_xprintf_varargs =
        f.asm.ve).apply(null, arguments);
    };
    f._emscripten_sync_run_in_main_thread_3 = function () {
      return (f._emscripten_sync_run_in_main_thread_3 = f.asm.we).apply(
        null,
        arguments
      );
    };
    var Ee = (f._emscripten_sync_run_in_main_thread_4 = function () {
      return (Ee = f._emscripten_sync_run_in_main_thread_4 = f.asm.xe).apply(
        null,
        arguments
      );
    });
    f._emscripten_sync_run_in_main_thread_5 = function () {
      return (f._emscripten_sync_run_in_main_thread_5 = f.asm.ye).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_6 = function () {
      return (f._emscripten_sync_run_in_main_thread_6 = f.asm.ze).apply(
        null,
        arguments
      );
    };
    f._emscripten_sync_run_in_main_thread_7 = function () {
      return (f._emscripten_sync_run_in_main_thread_7 = f.asm.Ae).apply(
        null,
        arguments
      );
    };
    var Ad = (f._emscripten_run_in_main_runtime_thread_js = function () {
        return (Ad = f._emscripten_run_in_main_runtime_thread_js =
          f.asm.Be).apply(null, arguments);
      }),
      Gd = (f.__emscripten_call_on_thread = function () {
        return (Gd = f.__emscripten_call_on_thread = f.asm.Ce).apply(
          null,
          arguments
        );
      });
    f._proxy_main = function () {
      return (f._proxy_main = f.asm.De).apply(null, arguments);
    };
    f._emscripten_tls_init = function () {
      return (f._emscripten_tls_init = f.asm.Ee).apply(null, arguments);
    };
    f.dynCall_ijiii = function () {
      return (f.dynCall_ijiii = f.asm.Fe).apply(null, arguments);
    };
    var Ge = (f.dynCall_vijjjid = function () {
        return (Ge = f.dynCall_vijjjid = f.asm.Ge).apply(null, arguments);
      }),
      He = (f.dynCall_iiiijj = function () {
        return (He = f.dynCall_iiiijj = f.asm.He).apply(null, arguments);
      });
    f.dynCall_iiijiii = function () {
      return (f.dynCall_iiijiii = f.asm.Ie).apply(null, arguments);
    };
    f.dynCall_jiiii = function () {
      return (f.dynCall_jiiii = f.asm.Je).apply(null, arguments);
    };
    f.dynCall_jii = function () {
      return (f.dynCall_jii = f.asm.Ke).apply(null, arguments);
    };
    var Ie = (f.dynCall_iij = function () {
      return (Ie = f.dynCall_iij = f.asm.Le).apply(null, arguments);
    });
    f.dynCall_viiijj = function () {
      return (f.dynCall_viiijj = f.asm.Me).apply(null, arguments);
    };
    f.dynCall_jij = function () {
      return (f.dynCall_jij = f.asm.Ne).apply(null, arguments);
    };
    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.Oe).apply(null, arguments);
    };
    f.dynCall_iiiji = function () {
      return (f.dynCall_iiiji = f.asm.Pe).apply(null, arguments);
    };
    f.dynCall_iiiiij = function () {
      return (f.dynCall_iiiiij = f.asm.Qe).apply(null, arguments);
    };
    f.dynCall_jiiij = function () {
      return (f.dynCall_jiiij = f.asm.Re).apply(null, arguments);
    };
    f.dynCall_iiijjji = function () {
      return (f.dynCall_iiijjji = f.asm.Se).apply(null, arguments);
    };
    f.dynCall_iiiiiij = function () {
      return (f.dynCall_iiiiiij = f.asm.Te).apply(null, arguments);
    };
    f.dynCall_jiiji = function () {
      return (f.dynCall_jiiji = f.asm.Ue).apply(null, arguments);
    };
    f.dynCall_viiiiijji = function () {
      return (f.dynCall_viiiiijji = f.asm.Ve).apply(null, arguments);
    };
    f.dynCall_viiiji = function () {
      return (f.dynCall_viiiji = f.asm.We).apply(null, arguments);
    };
    f.dynCall_jiiiii = function () {
      return (f.dynCall_jiiiii = f.asm.Xe).apply(null, arguments);
    };
    f.dynCall_jiii = function () {
      return (f.dynCall_jiii = f.asm.Ye).apply(null, arguments);
    };
    f.dynCall_jiiiiii = function () {
      return (f.dynCall_jiiiiii = f.asm.Ze).apply(null, arguments);
    };
    f._ff_h264_cabac_tables = 2115942;
    var xb = (f._main_thread_futex = 16983448);
    function pe(a, b, c) {
      var d = A();
      try {
        return H.get(a)(b, c);
      } catch (e) {
        D(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        Z(1, 0);
      }
    }
    function we(a, b) {
      var c = A();
      try {
        H.get(a)(b);
      } catch (d) {
        D(c);
        if (d !== d + 0 && "longjmp" !== d) throw d;
        Z(1, 0);
      }
    }
    function ze(a, b, c, d, e) {
      var g = A();
      try {
        H.get(a)(b, c, d, e);
      } catch (k) {
        D(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        Z(1, 0);
      }
    }
    function xe(a, b, c) {
      var d = A();
      try {
        H.get(a)(b, c);
      } catch (e) {
        D(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        Z(1, 0);
      }
    }
    function oe(a, b) {
      var c = A();
      try {
        return H.get(a)(b);
      } catch (d) {
        D(c);
        if (d !== d + 0 && "longjmp" !== d) throw d;
        Z(1, 0);
      }
    }
    function re(a, b, c, d, e) {
      var g = A();
      try {
        return H.get(a)(b, c, d, e);
      } catch (k) {
        D(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        Z(1, 0);
      }
    }
    function te(a, b, c, d, e, g, k, m, r) {
      var q = A();
      try {
        return H.get(a)(b, c, d, e, g, k, m, r);
      } catch (t) {
        D(q);
        if (t !== t + 0 && "longjmp" !== t) throw t;
        Z(1, 0);
      }
    }
    function ye(a, b, c, d) {
      var e = A();
      try {
        H.get(a)(b, c, d);
      } catch (g) {
        D(e);
        if (g !== g + 0 && "longjmp" !== g) throw g;
        Z(1, 0);
      }
    }
    function ne(a) {
      var b = A();
      try {
        return H.get(a)();
      } catch (c) {
        D(b);
        if (c !== c + 0 && "longjmp" !== c) throw c;
        Z(1, 0);
      }
    }
    function Ae(a, b, c, d, e, g) {
      var k = A();
      try {
        H.get(a)(b, c, d, e, g);
      } catch (m) {
        D(k);
        if (m !== m + 0 && "longjmp" !== m) throw m;
        Z(1, 0);
      }
    }
    function qe(a, b, c, d) {
      var e = A();
      try {
        return H.get(a)(b, c, d);
      } catch (g) {
        D(e);
        if (g !== g + 0 && "longjmp" !== g) throw g;
        Z(1, 0);
      }
    }
    function se(a, b, c, d, e, g) {
      var k = A();
      try {
        return H.get(a)(b, c, d, e, g);
      } catch (m) {
        D(k);
        if (m !== m + 0 && "longjmp" !== m) throw m;
        Z(1, 0);
      }
    }
    function Ce(a, b, c, d, e, g, k, m, r) {
      var q = A();
      try {
        H.get(a)(b, c, d, e, g, k, m, r);
      } catch (t) {
        D(q);
        if (t !== t + 0 && "longjmp" !== t) throw t;
        Z(1, 0);
      }
    }
    function Be(a, b, c, d, e, g, k) {
      var m = A();
      try {
        H.get(a)(b, c, d, e, g, k);
      } catch (r) {
        D(m);
        if (r !== r + 0 && "longjmp" !== r) throw r;
        Z(1, 0);
      }
    }
    function De(a, b, c, d, e, g, k, m, r, q) {
      var t = A();
      try {
        Ge(a, b, c, d, e, g, k, m, r, q);
      } catch (w) {
        D(t);
        if (w !== w + 0 && "longjmp" !== w) throw w;
        Z(1, 0);
      }
    }
    function ue(a, b, c, d, e, g, k, m) {
      var r = A();
      try {
        return He(a, b, c, d, e, g, k, m);
      } catch (q) {
        D(r);
        if (q !== q + 0 && "longjmp" !== q) throw q;
        Z(1, 0);
      }
    }
    function ve(a, b, c, d) {
      var e = A();
      try {
        return Ie(a, b, c, d);
      } catch (g) {
        D(e);
        if (g !== g + 0 && "longjmp" !== g) throw g;
        Z(1, 0);
      }
    }
    f.ccall = Ga;
    f.cwrap = function (a, b, c, d) {
      c = c || [];
      var e = c.every(function (g) {
        return "number" === g;
      });
      return "string" !== b && e && !d
        ? Fa(a)
        : function () {
            return Ga(a, b, c, arguments, d);
          };
    };
    f.setValue = function (a, b, c) {
      c = c || "i8";
      "*" === c.charAt(c.length - 1) && (c = "i32");
      switch (c) {
        case "i1":
          y[a >> 0] = b;
          break;
        case "i8":
          y[a >> 0] = b;
          break;
        case "i16":
          Qa[a >> 1] = b;
          break;
        case "i32":
          E[a >> 2] = b;
          break;
        case "i64":
          L = [
            b >>> 0,
            ((J = b),
            1 <= +Math.abs(J)
              ? 0 < J
                ? (Math.min(+Math.floor(J / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((J - +(~~J >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          E[a >> 2] = L[0];
          E[(a + 4) >> 2] = L[1];
          break;
        case "float":
          G[a >> 2] = b;
          break;
        case "double":
          Sa[a >> 3] = b;
          break;
        default:
          n("invalid type for setValue: " + c);
      }
    };
    f.writeAsciiToMemory = Pa;
    f.FS = O;
    f.PThread = M;
    f.PThread = M;
    f._pthread_self = Wd;
    f.wasmMemory = Ca;
    f.ExitStatus = wa;
    var Je;
    function wa(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    cb = function Ke() {
      Je || Le();
      Je || (cb = Ke);
    };
    function Le(a) {
      function b() {
        if (!Je && ((Je = !0), (f.calledRun = !0), !Ea)) {
          f.noFSInit || O.fg.Sg || O.fg();
          R.root = O.hf(R, {}, null);
          nb(Wa);
          l || ((O.Ah = !1), nb(Xa));
          ba(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (Me) {
            var c = a;
            c = c || [];
            var d = c.length + 1,
              e = Ha(4 * (d + 1));
            E[e >> 2] = Na(ha);
            for (var g = 1; g < d; g++) E[(e >> 2) + g] = Na(c[g - 1]);
            E[(e >> 2) + d] = 0;
            f._proxy_main(d, e);
          }
          if (!l) {
            if (f.postRun)
              for (
                "function" == typeof f.postRun && (f.postRun = [f.postRun]);
                f.postRun.length;

              )
                (c = f.postRun.shift()), Za.unshift(c);
            nb(Za);
          }
        }
      }
      a = a || fa;
      if (!(0 < ab)) {
        if (!l) {
          if (f.preRun)
            for (
              "function" == typeof f.preRun && (f.preRun = [f.preRun]);
              f.preRun.length;

            )
              $a();
          nb(Va);
        }
        0 < ab ||
          (f.setStatus
            ? (f.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  f.setStatus("");
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    f.run = Le;
    function Cb(a) {
      if (!noExitRuntime) {
        M.Ni();
        l || (nb(Ya), O.quit(), M.dh());
        if (f.onExit) f.onExit(a);
        Ea = !0;
      }
      ja(a, new wa(a));
    }
    if (f.preInit)
      for (
        "function" == typeof f.preInit && (f.preInit = [f.preInit]);
        0 < f.preInit.length;

      )
        f.preInit.pop()();
    var Me = !1;
    f.noInitialRun && (Me = !1);
    l ? M.pi() : Le();

    return createFFmpegCore.ready;
  };
})();
if (typeof exports === "object" && typeof module === "object")
  module.exports = createFFmpegCore;
else if (typeof define === "function" && define["amd"])
  define([], function () {
    return createFFmpegCore;
  });
else if (typeof exports === "object")
  exports["createFFmpegCore"] = createFFmpegCore;
