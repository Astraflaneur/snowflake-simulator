var Main;
( () => {
    "use strict";
    var n = {
        d: (e, t) => {
            for (var r in t)
                n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                    enumerable: !0,
                    get: t[r]
                })
        }
        ,
        o: (n, e) => Object.prototype.hasOwnProperty.call(n, e),
        r: n => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(n, "__esModule", {
                value: !0
            })
        }
    }
      , e = {};
    function t(n) {
        return {
            v: 0,
            d: n
        }
    }
    function r(n) {
        return {
            v: 1,
            d: n
        }
    }
    function a(n, e, t) {
        switch (n.v) {
        case 0:
            return e(n.d);
        case 1:
            return t(n.d)
        }
    }
    function o(n) {
        return {
            v: 1,
            d: n
        }
    }
    function i(n, e, t) {
        switch (n.v) {
        case 0:
            return e();
        case 1:
            return t(n.d)
        }
    }
    function s(n, e) {
        switch (n.v) {
        case 0:
            return {
                v: 0
            };
        case 1:
            return o(e(n.d))
        }
    }
    function c(n, e) {
        return n ? o(e()) : {
            v: 0
        }
    }
    n.r(e),
    n.d(e, {
        main: () => ge
    });
    const l = 2 * Math.PI / 6
      , u = .002
      , h = [-1, -.75, -.5, -.25, 0, .25, .5, .75, 1];
    function g(n, e) {
        return (n % e + e) % e
    }
    function d(n, e, t) {
        return (1 - t) * n + t * e
    }
    function f(n) {
        return n % 1
    }
    function p(n) {
        return [n(), n(), n(), n(), n(), n()]
    }
    function v(n, e) {
        return Math.floor(Math.random() * (e - n + 1) + n)
    }
    function w(n) {
        if (void 0 === n.toString)
            return t(`non-integer, '${n}'`);
        const e = n.toString()
          , a = [];
        for (let r = 0; r < e.length; ++r) {
            const o = parseInt(e[r], 10);
            if (Number.isNaN(o))
                return t(`string containing a digit other than 1 through 9, '${n}'`);
            if (0 === o)
                return t(`string containing the digit zero, '${n}'`);
            const i = o - 1;
            a.push(i)
        }
        return 0 === a.length ? t(`empty snowflake ID, '${n}'`) : r(a)
    }
    const m = n => new Float64Array(n);
    function C(n, e, t) {
        return void 0 === n.installation ? t() : e(n.installation)
    }
    function k(n, e) {
        C(n, e, ( () => {}
        ))
    }
    function b() {
        let n = [0];
        for (let e = 1; e < 16; e++)
            n[e] = Math.floor(9 * Math.random());
        return n[0] = Math.floor(4 * Math.random()),
        n
    }
    function x(n) {
        return () => {
            void 0 !== n.installation && (n.installation.handleBeingDragged = void 0,
            n.installation.graphMouse = void 0)
        }
    }
    function y(n, e) {
        if (void 0 !== n.installation)
            return void console.error("attempt to install graph twice");
        const t = document.createElement("canvas");
        t.width = e.canvasWidth,
        t.height = e.canvasHeight;
        const r = t.getContext("2d");
        if (null === r)
            return;
        function a(e) {
            void 0 !== n.installation && (n.installation.graphMouse = {
                x: e.offsetX,
                y: e.offsetY
            })
        }
        function o() {
            void 0 !== n.installation && (n.installation.handleBeingDragged = "needs lookup")
        }
        function i() {
            void 0 !== n.installation && (n.installation.mouseRecentlyExitedGraph = !0)
        }
        const s = x(n);
        t.addEventListener("mousemove", a),
        t.addEventListener("mousedown", o),
        t.addEventListener("mouseleave", i),
        e.mouseUpEventListenerNode.addEventListener("mouseup", s),
        n.installation = {
            options: e,
            canvas: t,
            ctx: r,
            handleBeingDragged: void 0,
            mouseRecentlyExitedGraph: !1,
            graphMouse: void 0,
            graphMargin: 10,
            writableGraphWidth: t.width - 20,
            writableGraphHeight: t.height,
            removeEventListeners: function() {
                t.removeEventListener("mousemove", a),
                t.removeEventListener("mousedown", o),
                t.removeEventListener("mouseleave", i),
                e.mouseUpEventListenerNode.removeEventListener("mouseup", s)
            }
        }
    }
    function S(n, e, t, r, a, o) {
        const i = e.ctx.fillStyle
          , s = e.ctx.strokeStyle
          , c = e.ctx.getLineDash()
          , l = n.options.foregroundColor
          , u = a ? 8 : 5
          , h = o ? [2, 2] : [];
        e.ctx.beginPath(),
        e.ctx.arc(t, r, 3, 0, 2 * Math.PI),
        e.ctx.closePath(),
        e.ctx.fillStyle = l,
        e.ctx.fill(),
        e.ctx.closePath(),
        e.ctx.beginPath(),
        e.ctx.arc(t, r, u, 0, 2 * Math.PI),
        e.ctx.strokeStyle = l,
        e.ctx.setLineDash(h),
        e.ctx.stroke(),
        e.ctx.fillStyle = i,
        e.ctx.strokeStyle = s,
        e.ctx.setLineDash(c)
    }
    function T(n, e) {
        let t = d(0, n.growthInput.length - 1, e)
          , r = f(t)
          , a = d(h[n.growthInput[Math.floor(t)]], h[n.growthInput[Math.ceil(t)]], r);
        return {
            scale: Math.abs(a),
            growthType: a > 0 ? "branching" : "faceting"
        }
    }
    function M(n, e, t) {
        const {writableGraphWidth: r, writableGraphHeight: a, graphMargin: o} = e;
        return {
            x: r / (n.growthInput.length - 1) * t + o,
            y: 4 * h[n.growthInput[t]] * (a / h.length) + .5 * a
        }
    }
    function G(n, e, t) {
        let r = 1 / 0
          , a = 0;
        for (let o = 0; o < n.growthInput.length; o += 1) {
            const i = M(n, e, o).x - t.x
              , s = i * i;
            s < r && (r = s,
            a = o)
        }
        return a
    }
    function E(n, e) {
        if (void 0 !== e.handleBeingDragged || e.mouseRecentlyExitedGraph) {
            e.mouseRecentlyExitedGraph = !1;
            const a = "needs lookup" === e.handleBeingDragged && void 0 !== e.graphMouse ? G(n, e, e.graphMouse) : e.handleBeingDragged;
            if ("needs lookup" === e.handleBeingDragged && (e.handleBeingDragged = a),
            void 0 !== e.graphMouse && "needs lookup" !== a) {
                const o = e.writableGraphHeight / h.length
                  , i = Math.floor(e.graphMouse.y / o);
                void 0 !== a && (n.growthInput[a] = (t = i,
                r = h.length - 1,
                Math.min(Math.max(t, 0), r)))
            }
        }
        var t, r;
        let a = void 0 !== e.handleBeingDragged ? "none" : "auto"
          , o = n => n.setAttribute("style", `user-select: ${a}`);
        Array.from(document.getElementsByClassName("graphLabel")).forEach(o),
        Array.from(document.getElementsByClassName("control")).forEach(o);
        let i = document.getElementById("controlContainer");
        null !== i && o(i)
    }
    function F(n, e, t) {
        const {writableGraphWidth: r, writableGraphHeight: a, graphMargin: o} = e;
        e.ctx.fillStyle = n.options.backgroundColor,
        e.ctx.fillRect(0, 0, e.canvas.width, e.canvas.height);
        const i = e.ctx.fillStyle;
        e.ctx.fillStyle = n.options.progressColor,
        e.ctx.fillRect(o, 0, r * t, a),
        e.ctx.fillStyle = i,
        e.ctx.beginPath();
        {
            const t = M(n, e, 0);
            e.ctx.moveTo(t.x, t.y)
        }
        for (let t = 1; t < n.growthInput.length; t += 1) {
            const r = M(n, e, t);
            e.ctx.lineTo(r.x, r.y)
        }
        e.ctx.strokeStyle = n.options.foregroundColor,
        e.ctx.stroke();
        for (let t = 0; t < n.growthInput.length; t += 1) {
            const r = M(n, e, t);
            if (void 0 !== e.graphMouse) {
                const a = G(n, e, e.graphMouse);
                S(n, e, r.x, r.y, t === a, t === e.handleBeingDragged)
            } else
                S(n, e, r.x, r.y, !1, !1)
        }
        e.ctx.beginPath();
        const s = r * t + o;
        e.ctx.moveTo(s, 0),
        e.ctx.lineTo(s, a),
        e.ctx.strokeStyle = n.options.progressLineColor,
        e.ctx.stroke(),
        e.ctx.beginPath();
        const c = .5 * a;
        e.ctx.moveTo(o, c),
        e.ctx.lineTo(r + o, c),
        e.ctx.strokeStyle = n.options.foregroundColor,
        e.ctx.setLineDash([2, 2]),
        e.ctx.stroke(),
        e.ctx.setLineDash([])
    }
    function P(n) {
        const e = document.createElement("canvas")
          , t = e.getContext("2d");
        if (null !== t)
            return t.canvas.width = n,
            t.canvas.height = n,
            e.style.width = `${n}px`,
            e.style.height = `${n}px`,
            {
                sizePX: n,
                canvas: e,
                ctx: t
            }
    }
    const B = [0 * l, 1 * l, 2 * l, 3 * l, 4 * l, 5 * l]
      , I = [Math.cos(B[0]), Math.cos(B[1]), Math.cos(B[2]), Math.cos(B[3]), Math.cos(B[4]), Math.cos(B[5])]
      , L = [Math.sin(B[0]), Math.sin(B[1]), Math.sin(B[2]), Math.sin(B[3]), Math.sin(B[4]), Math.sin(B[5])];
    function U(n, e, t) {
        return n * (1 - t) + e * t
    }
    function z(n, e, t) {
        return n * I[t] - e * L[t]
    }
    function X(n, e, t) {
        return n * L[t] + e * I[t]
    }
    function $(n, e) {
        const t = n.sizePX;
        return e * t * .5 + .5 * t
    }
    function D(n, e) {
        const t = n.sizePX;
        return e * -t * .5 + .5 * t
    }
    function N(n, e) {
        return e < 0 || e > n.sizePX
    }
    const j = .0025;
    function W() {
        return {
            center: {
                x: 0,
                y: 0
            },
            size: j,
            isFirstFace: !0,
            direction: 0,
            growthScale: 1,
            growing: !0
        }
    }
    function H(n, e, t) {
        return n + e * I[t]
    }
    function O(n, e, t) {
        return n + e * L[t]
    }
    function R(n, e) {
        return H(n.center.x, n.size, e)
    }
    function A(n, e) {
        return O(n.center.y, n.size, e)
    }
    function q(n, e) {
        const t = e.direction
          , r = $(n, R(e, (t + 0) % 6))
          , a = D(n, A(e, (t + 0) % 6))
          , o = $(n, R(e, (t + 1) % 6))
          , i = D(n, A(e, (t + 1) % 6))
          , s = $(n, R(e, (t + 2) % 6))
          , c = D(n, A(e, (t + 2) % 6))
          , l = $(n, R(e, (t + 3) % 6))
          , u = D(n, A(e, (t + 3) % 6))
          , h = $(n, R(e, (t + 4) % 6))
          , g = D(n, A(e, (t + 4) % 6))
          , d = $(n, R(e, (t + 5) % 6))
          , f = D(n, A(e, (t + 5) % 6));
        if (N(n, r) || N(n, o) || N(n, s) || N(n, l) || N(n, h) || N(n, d) || N(n, a) || N(n, i) || N(n, c) || N(n, u) || N(n, g) || N(n, f))
            return !0;
        const p = n.ctx;
        if (e.isFirstFace) {
            const t = $(n, e.center.x)
              , v = D(n, e.center.y);
            p.moveTo(r, a),
            p.lineTo(o, i),
            p.lineTo(s, c),
            p.lineTo(l, u),
            p.lineTo(h, g),
            p.lineTo(d, f),
            p.lineTo(r, a),
            p.moveTo(t, v),
            p.lineTo(r, a),
            p.moveTo(t, v),
            p.lineTo(o, i),
            p.moveTo(t, v),
            p.lineTo(s, c),
            p.moveTo(t, v),
            p.lineTo(l, u),
            p.moveTo(t, v),
            p.lineTo(h, g),
            p.moveTo(t, v),
            p.lineTo(d, f)
        } else {
            const n = U(l, o, .6)
              , e = U(u, i, .6)
              , t = U(l, r, .6)
              , v = U(u, a, .6)
              , w = U(l, d, .6)
              , m = U(u, f, .6)
              , C = U(h, d, .6)
              , k = U(g, f, .6)
              , b = U(s, o, .6)
              , x = U(c, i, .6);
            p.moveTo(C, k),
            p.lineTo(d, f),
            p.moveTo(b, x),
            p.lineTo(o, i),
            p.moveTo(d, f),
            p.lineTo(r, a),
            p.lineTo(o, i),
            p.moveTo(n, e),
            p.lineTo(o, i),
            p.moveTo(t, v),
            p.lineTo(r, a),
            p.moveTo(w, m),
            p.lineTo(d, f)
        }
        return !1
    }
    function _(n, e) {
        if (n.size += e * u * n.growthScale,
        !n.isFirstFace) {
            const t = e * u * Math.cos(B[n.direction]) * n.growthScale
              , r = e * u * Math.sin(B[n.direction]) * n.growthScale;
            n.center.x += t,
            n.center.y += r
        }
    }
    function Y() {
        return {
            start: {
                x: 0,
                y: 0
            },
            size: 0,
            length: 0,
            direction: 0,
            growthScale: 0,
            growing: !1
        }
    }
    function J(n) {
        return n.start.x + n.length * I[n.direction]
    }
    function K(n) {
        return n.start.y + n.length * L[n.direction]
    }
    function Q(n, e) {
        const t = g(e - n.direction, B.length);
        return H(5 === t || 0 === t || 1 === t ? J(n) : n.start.x, n.size, e)
    }
    function V(n, e) {
        const t = g(e - n.direction, B.length);
        return O(5 === t || 0 === t || 1 === t ? K(n) : n.start.y, n.size, e)
    }
    function Z(n, e) {
        const t = e.direction
          , r = $(n, Q(e, (t + 0) % 6))
          , a = D(n, V(e, (t + 0) % 6))
          , o = $(n, Q(e, (t + 1) % 6))
          , i = D(n, V(e, (t + 1) % 6))
          , s = $(n, Q(e, (t + 2) % 6))
          , c = D(n, V(e, (t + 2) % 6))
          , l = $(n, Q(e, (t + 3) % 6))
          , u = D(n, V(e, (t + 3) % 6))
          , h = $(n, Q(e, (t + 4) % 6))
          , g = D(n, V(e, (t + 4) % 6))
          , d = $(n, Q(e, (t + 5) % 6))
          , f = D(n, V(e, (t + 5) % 6));
        if (N(n, r) || N(n, o) || N(n, s) || N(n, l) || N(n, h) || N(n, d) || N(n, a) || N(n, i) || N(n, c) || N(n, u) || N(n, g) || N(n, f))
            return !0;
        const p = U(h, d, 0)
          , v = U(g, f, 0)
          , w = U(s, o, 0)
          , m = U(c, i, 0)
          , C = n.ctx;
        return C.moveTo(d, f),
        C.lineTo(r, a),
        C.lineTo(o, i),
        C.moveTo(p, v),
        C.lineTo(d, f),
        C.moveTo(w, m),
        C.lineTo(o, i),
        C.moveTo(r, a),
        C.lineTo(l, u),
        !1
    }
    function nn(n, e) {
        return R(n, (e + 1) % B.length)
    }
    function en(n, e) {
        return A(n, (e + 1) % B.length)
    }
    function tn(n, e) {
        return R(n, e)
    }
    function rn(n, e) {
        return A(n, e)
    }
    function an(n, e) {
        return Q(n, (e + 1) % B.length)
    }
    function on(n, e) {
        return V(n, (e + 1) % B.length)
    }
    function sn(n, e) {
        return Q(n, e)
    }
    function cn(n, e) {
        return V(n, e)
    }
    function ln(n, e, t, r, a, o) {
        const i = g(1 - o, B.length)
          , s = nn(a, o)
          , c = en(a, o)
          , l = tn(a, o)
          , u = rn(a, o);
        n[r] = z(s, c, i),
        e[r] = z(l, u, i),
        t[r] = X(s, c, i)
    }
    function un(n, e, t, r, a, o) {
        const i = g(1 - o, B.length)
          , s = an(a, o)
          , c = on(a, o)
          , l = sn(a, o)
          , u = cn(a, o);
        n[r] = z(s, c, i),
        e[r] = z(l, u, i),
        t[r] = X(s, c, i)
    }
    function hn(n, e, t, r, a) {
        for (let o = 0; o < B.length; ++o)
            ln(n[o], e[o], t[o], r, a, o)
    }
    function gn(n, e, t, r, a) {
        for (let o = 0; o < B.length; ++o)
            un(n[o], e[o], t[o], r, a, o)
    }
    const dn = 1e4
      , fn = 1e4;
    function pn(n, e, t, r, a, o, i, s) {
        if (n.numFaces < dn) {
            const c = n.faces[n.numFaces];
            return c.center.x = e,
            c.center.y = t,
            c.size = r,
            c.isFirstFace = a,
            c.direction = o,
            c.growthScale = i,
            c.growing = s,
            n.numFaces += 1,
            !1
        }
        return !0
    }
    function vn(n, e, t, r, a, o, i, s) {
        if (n.numBranches < fn) {
            const c = n.branches[n.numBranches];
            return c.start.x = e,
            c.start.y = t,
            c.size = r,
            c.length = a,
            c.direction = o,
            c.growthScale = i,
            c.growing = s,
            n.numBranches += 1,
            !1
        }
        return !0
    }
    const wn = [1, 0];
    function mn(n, e) {
        for (let t = n.numInitialGrownFaces; t < n.numFaces; ++t)
            n.faces[t].growing ? e(n.faces[t], t) : n.numInitialGrownFaces += wn[Math.min(1, t - n.numInitialGrownFaces)]
    }
    function Cn(n, e) {
        for (let t = n.numInitialGrownBranches; t < n.numBranches; ++t)
            n.branches[t].growing ? e(n.branches[t], t) : n.numInitialGrownBranches += wn[Math.min(1, t - n.numInitialGrownBranches)]
    }
    function kn(n, e) {
        let t = !1;
        return n.ctx.strokeStyle = "rgba(255, 255, 255, 0.08)",
        n.ctx.beginPath(),
        mn(e, ( (e, r) => t || (t = q(n, e)))),
        Cn(e, ( (e, r) => t || (t = Z(n, e)))),
        n.ctx.stroke(),
        t
    }
    function bn(n, e) {
        const t = [];
        for (let r = 0; r < n; ++r)
            t[r] = e();
        return t
    }
    function xn(n) {
        return () => m(n)
    }
    function yn() {
        const n = xn(dn)
          , e = xn(fn)
          , t = [p(n), p(n), p(n), p(e), p(e), p(e)];
        return {
            faces: bn(dn, W),
            branches: bn(fn, Y),
            numFaces: 1,
            numBranches: 0,
            sideCaches: t,
            numInitialGrownFaces: 0,
            numInitialGrownBranches: 0
        }
    }
    const Sn = [.5, .9, .5];
    function Tn(n, e) {
        const t = .01 * e.size
          , r = .001 + 1 * e.size * .99
          , a = e.center.x
          , o = e.center.y;
        if (e.isFirstFace) {
            const e = Sn[1];
            for (let i = 0; i < 6; ++i)
                vn(n, a + r * I[i], o + r * L[i], t, 0, i, e, !0)
        } else
            for (let i = -1; i < 2; ++i) {
                const s = e.growthScale * Sn[i + 1]
                  , c = g(e.direction + i, 6);
                vn(n, a + r * I[c], o + r * L[c], t, 0, c, s, !0)
            }
    }
    function Mn(n) {
        mn(n, ( (e, t) => {
            Tn(n, e),
            e.growing = !1
        }
        ))
    }
    function Gn(n, e) {
        pn(n, J(e), K(e), e.size, !1, e.direction, e.growthScale, !0)
    }
    function En(n) {
        Cn(n, ( (e, t) => {
            Gn(n, e),
            e.growing = !1
        }
        ))
    }
    function Fn(n) {
        mn(n, ( (e, t) => {
            hn(n.sideCaches[0], n.sideCaches[1], n.sideCaches[2], t, e)
        }
        )),
        Cn(n, ( (e, t) => {
            gn(n.sideCaches[3], n.sideCaches[4], n.sideCaches[5], t, e)
        }
        ))
    }
    function Pn(n, e, t, r, a, o, i, s, c, l) {
        const u = t[e]
          , h = r[e];
        for (let t = 0; t < c && n.growing; ++t) {
            const r = o[t]
              , c = i[t];
            if (r < h && u < c && s[t] - a[e] > 0 && (!l || t !== e)) {
                n.growing = !1;
                break
            }
        }
    }
    function Bn(n, e, t, r, a, o, i, s) {
        const c = s ? 0 : 3
          , l = n[c]
          , u = n[c + 1]
          , h = n[c + 2];
        for (let s = 0; s < 4; s += 3) {
            const g = 0 === s ? e : t
              , d = c === s
              , f = n[s]
              , p = n[s + 1]
              , v = n[s + 2];
            for (let n = 0; n < 2; ++n) {
                const e = 0 === n ? r : a;
                if (Pn(o, i, l[e], u[e], h[e], f[e], p[e], v[e], g, d),
                !o.growing)
                    return
            }
        }
    }

    const snowContent = ['&#10052', '&#10053', '&#10054']

    const random = (num) => {
        return Math.floor(Math.random() * num);
      }

      const getRandomStyles = () => {
        const top = random(100);
        const left = random(100);
        const dur = random(10) + 10;
        const size = random(25) + 25;
        return ` 
      top: -${top}%; 
      left: ${left}%; 
      font-size: ${size}px; 
      animation-duration: ${dur}s; 
      `;
      }

    
    function In(n, e, t, r, a, o) {
        const i = n.direction;
        Bn(t, r, a, i, g(i - 1, B.length), n, e, o)
    }
    function Ln(n) {
        mn(n, ( (e, t) => {
            In(e, t, n.sideCaches, n.numFaces, n.numBranches, !0)
        }
        ))
    }
    function Un(n) {
        Cn(n, ( (e, t) => {
            In(e, t, n.sideCaches, n.numFaces, n.numBranches, !1)
        }
        ))
    }
    function zn(n) {
        var e, t, r, a;
        (e = n.snowflake).numFaces = 1,
        (r = (t = e.faces[0]).center).x = 0,
        r.y = 0,
        t.size = j,
        t.isFirstFace = !0,
        t.direction = 0,
        t.growthScale = 1,
        t.growing = !0,
        e.numBranches = 0,
        e.numInitialGrownFaces = 0,
        e.numInitialGrownBranches = 0,
        n.currentGrowthType = void 0,
        n.growing = !0,
        n.updateBank = 0,
        n.updateCount = 0,
        n.currentMS = performance.now(),
        n.resetStartTime = performance.now(),
        void 0 !== n.graphic && (a = n.graphic).ctx.clearRect(0, 0, a.ctx.canvas.width, a.ctx.canvas.height),
        n.resetCallback(),
        jn(n)
    }
    function Xn(n, e) {
        return void 0 !== n.graphic && (n.graphic.sizePX = e,
        n.graphic.ctx.canvas.width = e,
        n.graphic.ctx.canvas.height = e,
        n.graphic.canvas.style.width = `${e}px`,
        n.graphic.canvas.style.height = `${e}px`,
        !0)
    }
    function $n(n, e) {
        const t = a(w(e), (n => {
            throw new Error("invalid snowflake ID")
        }
        ), (n => n));
        if (0 === t.length)
            throw new Error("parsing snowflake id gave zero length array");
        {
            const e = t;
            n.graph.growthInput = e
        }
    }
    function Dn(n, e) {
        if (void 0 !== n.graphic)
            throw new Error("snowflake already installed");
        n.graphic = P(e),
        void 0 === n.graphic ? n.installSnowflakeCanvasFailureCallback() : n.installSnowflakeCanvasCallback(n.graphic.canvas)
    }
    function Nn(n, e, t, r) {
        const a = {
            mouseUpEventListenerNode: r,
            canvasWidth: e,
            canvasHeight: t
        };
        y(n.graph, a),
        void 0 === n.graph.installation ? n.installGraphCanvasFailureCallback() : n.installGraphCanvasCallback(n.graph.installation.canvas)
    }
    function jn(n) {
        n.hasScheduledUpdate || (n.growing && n.playing ? (n.hasScheduledUpdate = !0,
        setTimeout(n.updateOnNextFrame, n.idealMSBetweenUpdates)) : n.hasScheduledUpdate = !1)
    }
    function Wn(n, e, t) {
        n.idealMSBetweenUpdates = Math.max(1e3 / t, e / n.maxUpdates)
    }
    function Hn() {
        const n = {
            graph: {
                options: {
                    progressColor: "rgba(255,255,255,0.5)",
                    progressLineColor: "rgba(255,255,255,1)",
                    backgroundColor: "rgba(0,0,0,1)",
                    foregroundColor: "rgba(255,255,255,1)"
                },
                growthInput: b(),
                installation: void 0
            },
            graphic: void 0,
            snowflake: yn(),
            currentGrowthType: void 0,
            growing: !0,
            updateBank: 0,
            updateCount: 0,
            currentMS: 0,
            idealMSBetweenUpdates: 0,
            maxUpdates: 500,
            resetStartTime: performance.now(),
            playing: !1,
            finishedGrowingCallback: () => {}
            ,
            resetCallback: () => {}
            ,
            installSnowflakeCanvasCallback: n => {}
            ,
            installSnowflakeCanvasFailureCallback: () => {}
            ,
            installGraphCanvasCallback: n => {}
            ,
            installGraphCanvasFailureCallback: () => {}
            ,
            graphMouseUpEventListenerNode: document,
            hasScheduledUpdate: !1,
            updateOnNextFrame: () => {
                requestAnimationFrame(n.doUpdate)
            }
            ,
            doUpdate: () => {
                Rn(n),
                n.hasScheduledUpdate = !1,
                jn(n)
            }
        };
        return jn(n),
        n
    }
    function On(n) {
        return n.updateCount / n.maxUpdates
    }
    function Rn(n) {
        const {snowflake: e, graph: t, graphic: r} = n
          , a = n.currentMS;
        n.currentMS = performance.now();
        const o = n.currentMS - a;
        let i = Math.min(n.maxUpdates - n.updateCount, o / n.idealMSBetweenUpdates + n.updateBank);
        function s() {
            const a = T(t, On(n));
            if (void 0 === n.currentGrowthType && (n.currentGrowthType = a.growthType),
            n.currentGrowthType !== a.growthType && (n.currentGrowthType = a.growthType,
            "branching" === n.currentGrowthType ? Mn(e) : En(e)),
            Fn(e),
            "branching" === n.currentGrowthType ? (Un(e),
            Cn(e, ( (n, e) => {
                return t = n,
                a.scale,
                t.size += 5e-4 * t.growthScale,
                void (t.length += .0015 * t.growthScale);
                var t
            }
            ))) : (Ln(e),
            mn(e, ( (n, e) => _(n, a.scale)))),
            void 0 !== r && kn(r, e)) {
                n.updateCount = n.maxUpdates,
                n.updateBank = 0;
                let e = window;
                void 0 === e.count && (e.count = 0),
                e.count += 1,
                console.log(`too large count = ${e.count}, ${n.graph.growthInput}`)
            }
        }
        n.updateBank = f(i),
        i = Math.floor(i);
        for (let e = 0; e < i; ++e)
            s(),
            n.updateCount += 1;
        n.updateCount >= n.maxUpdates && (n.finishedGrowingCallback(),
        n.growing = !1),
        k(t, (e => {
            E(t, e),
            e.ctx.clearRect(0, 0, e.canvas.width, e.canvas.height),
            F(t, e, On(n))
        }
        ))
    }
    function An(n) {
        return "function" == typeof n
    }
    function qn(n, e) {
        return An(n) && n.length === e
    }
    function _n(n) {
        return qn(n, 2)
    }
    function Yn(n, e, t) {
        return `${n}: expected ${e}, got '${t}'`
    }
    function Jn(n) {
        return e => Number.isSafeInteger(e) ? e < 0 ? o(Yn(n, "nonnegative integer", e)) : {
            v: 0
        } : o(Yn(n, "integer", e))
    }
    function Kn(n) {
        return e => c(!qn(e, 0), ( () => Yn(n, "function requiring zero arguments", e)))
    }
    function Qn(n) {
        return e => c(!qn(e, 1), ( () => Yn(n, "function requiring one argument", e)))
    }
    function Vn(n) {
        return e => {
            return c((t = e,
            !CSS.supports("color", t)), ( () => Yn(n, "valid css color", e)));
            var t
        }
    }
    const Zn = {
        snowflakeCanvasSizePX: Jn("snowflakeCanvasSizePX"),
        targetGrowthTimeMS: Jn("targetGrowthTimeMS"),
        upsCap: Jn("upsCap"),
        maxUpdates: Jn("maxUpdates"),
        playing: n => c(!("boolean" == typeof n), ( () => Yn("playing", "boolean", n))),
        finishedGrowingCallback: Kn("finishedGrowingCallback"),
        resetCallback: Kn("resetCallback"),
        installSnowflakeCanvasCallback: Qn("installSnowflakeCanvasCallback"),
        installSnowflakeCanvasFailureCallback: Kn("installSnowflakeCanvasFailureCallback"),
        installGraphCanvasCallback: Qn("installGraphCanvasCallback"),
        installGraphCanvasFailureCallback: Kn("installGraphCanvasFailureCallback"),
        snowflakeId: n => a(w(n), (n => o(Yn("snowflakeId", "snowflake ID", n))), (n => ({
            v: 0
        }))),
        graphCanvasWidthPX: Jn("graphCanvasWidthPX"),
        graphCanvasHeightPX: Jn("graphCanvasHeightPX"),
        graphProgressColor: Vn("graphProgressColor"),
        graphProgressLineColor: Vn("graphProgressLineColor"),
        graphBackgroundColor: Vn("graphBackgroundColor"),
        graphForegroundColor: Vn("graphForegroundColor"),
        graphMouseUpEventListenerNode: n => {
            return c(!(void 0 !== (e = n).addEventListener && void 0 !== e.removeEventListener && _n(e.addEventListener) && _n(e.removeEventListener)), ( () => Yn("graphMouseUpEventListenerNode", "html node with .addEventListener and .removeEventListener", n)));
            var e
        }
    };
    function ne(n) {
        const e = []
          , t = Zn;
        if ("object" != typeof (r = n) || Array.isArray(r) || null === r)
            return e.push(`expected config to be an object, but got: '${n}'`),
            e;
        var r;
        for (let[r,a] of Object.entries(t))
            r in n || e.push(`missing key in config: '${r}'`);
        if (e.length > 0)
            return e;
        for (let[r,a] of Object.entries(n)) {
            const n = t[r];
            void 0 === n ? e.push(`unexpected key in config: '${r}'`) : i(n(a), ( () => {}
            ), (n => e.push(n)))
        }
        return e
    }
    function ee(n) {
        const e = ne(n);
        return e.length > 0 ? (console.error("errors detected when validating snowflake configuration"),
        void e.forEach((n => console.error(n)))) : n
    }
    function te() {
        const n = [v(1, 4)];
        for (let e = 1; e < 16; e++)
            n.push(v(1, 9));
        const e = n.join("");
        return a(w(e), (n => {
            throw new Error(`randomSnowflakeId returned invalid ID: '${e}'`)
        }
        ), (n => e))
    }
    function re() {
        const n = ee({
            snowflakeCanvasSizePX: 800,
            targetGrowthTimeMS: 8e3,
            upsCap: 60,
            maxUpdates: 500,
            playing: !0,
            finishedGrowingCallback: () => {}
            ,
            resetCallback: () => {}
            ,
            installSnowflakeCanvasCallback: n => document.body.appendChild(n),
            installSnowflakeCanvasFailureCallback: () => {
                throw new Error("error installing snowflake canvas")
            }
            ,
            installGraphCanvasCallback: n => document.body.appendChild(n),
            installGraphCanvasFailureCallback: () => {
                throw new Error("error installing graph canvas")
            }
            ,
            snowflakeId: te(),
            graphCanvasWidthPX: 800,
            graphCanvasHeightPX: 300,
            graphProgressColor: "rgba(255,255,255,0.5)",
            graphProgressLineColor: "rgba(255,255,255,1)",
            graphBackgroundColor: "rgba(0,0,0,1)",
            graphForegroundColor: "rgba(255,255,255,1)",
            graphMouseUpEventListenerNode: document
        });
        if (void 0 === n)
            throw new Error("default config is invalid");
        return n
    }
    const ae = {
        snowflakeCanvasSizePX: (n, e, t, r) => i(r, ( () => Xn(e, t)), (n => t !== n && Xn(e, t))),
        targetGrowthTimeMS: (n, e, t, r) => (Wn(e, t, n.upsCap),
        !1),
        upsCap: (n, e, t, r) => (Wn(e, n.targetGrowthTimeMS, t),
        !1),
        maxUpdates: (n, e, t, r) => i(r, ( () => (e.maxUpdates = t,
        !0)), (n => t !== n && (e.maxUpdates = t,
        !0))),
        playing: (n, e, t, r) => {
            const a = i(r, ( () => !1), (n => t === n));
            return a || (e.playing = t,
            e.currentMS = performance.now(),
            jn(e)),
            !1
        }
        ,
        finishedGrowingCallback: (n, e, t, r) => (e.finishedGrowingCallback = t,
        !1),
        resetCallback: (n, e, t, r) => (e.resetCallback = t,
        !1),
        installSnowflakeCanvasCallback: (n, e, t, r) => (e.installSnowflakeCanvasCallback = t,
        !1),
        installSnowflakeCanvasFailureCallback: (n, e, t, r) => (e.installSnowflakeCanvasFailureCallback = t,
        !1),
        installGraphCanvasCallback: (n, e, t, r) => (e.installGraphCanvasCallback = t,
        !1),
        installGraphCanvasFailureCallback: (n, e, t, r) => (e.installGraphCanvasFailureCallback = t,
        !1),
        snowflakeId: (n, e, t, r) => {
            const a = i(r, ( () => !1), (n => t === n));
            return !a && ($n(e, t),
            !0)
        }
        ,
        graphCanvasWidthPX: (n, e, t, r) => {
            var a, o;
            return o = t,
            void 0 !== (a = e).graph.installation && (a.graph.installation.ctx.canvas.width = o,
            a.graph.installation.canvas.style.width = `${o}px`),
            !1
        }
        ,
        graphCanvasHeightPX: (n, e, t, r) => {
            var a, o;
            return o = t,
            void 0 !== (a = e).graph.installation && (a.graph.installation.ctx.canvas.height = o,
            a.graph.installation.canvas.style.height = `${o}px`),
            !1
        }
        ,
        graphProgressColor: (n, e, t, r) => (e.graph.options.progressColor = t,
        !1),
        graphProgressLineColor: (n, e, t, r) => (e.graph.options.progressLineColor = t,
        !1),
        graphBackgroundColor: (n, e, t, r) => (e.graph.options.backgroundColor = t,
        !1),
        graphForegroundColor: (n, e, t, r) => (e.graph.options.foregroundColor = t,
        !1),
        graphMouseUpEventListenerNode: (n, e, t, r) => !1
    };
    function oe(n) {
        const e = re();
        for (let[t,r] of Object.entries(n))
            e[t] = r;
        return e
    }
    function ie(n, e, t) {
        const r = ee(e);
        if (void 0 === r)
            return;
        const a = r
          , o = ae;
        let i = !1;
        for (let[e,r] of Object.entries(a)) {
            const c = s(n, (n => n[e]));
            i = o[e](a, t, r, c) || i
        }
        i && zn(t)
    }
    var se, ce, le = function(n, e, t, r, a) {
        if ("m" === r)
            throw new TypeError("Private method is not writable");
        if ("a" === r && !a)
            throw new TypeError("Private accessor was defined without a setter");
        if ("function" == typeof e ? n !== e || !a : !e.has(n))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === r ? a.call(n, t) : a ? a.value = t : e.set(n, t),
        t
    }, ue = function(n, e, t, r) {
        if ("a" === t && !r)
            throw new TypeError("Private accessor was defined without a getter");
        if ("function" == typeof e ? n !== e || !r : !e.has(n))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === t ? r : "a" === t ? r.call(n) : r ? r.value : e.get(n)
    };
    class he {
        constructor() {
            se.set(this, void 0),
            ce.set(this, void 0),
            le(this, se, Hn(), "f"),
            le(this, ce, re(), "f"),
            ie({
                v: 0
            }, ue(this, ce, "f"), ue(this, se, "f"))
        }
        defaultConfig() {
            return re()
        }
        configure(n) {
            ie(o(ue(this, ce, "f")), n, ue(this, se, "f")),
            le(this, ce, oe(n), "f")
        }
        installSnowflakeCanvas() {
            Dn(ue(this, se, "f"), ue(this, ce, "f").snowflakeCanvasSizePX)
        }
        installGraphCanvas() {
            Nn(ue(this, se, "f"), ue(this, ce, "f").graphCanvasWidthPX, ue(this, ce, "f").graphCanvasHeightPX, ue(this, ce, "f").graphMouseUpEventListenerNode)
        }
        reset() {
            zn(ue(this, se, "f"))
        }
        randomSnowflakeId() {
            return te()
        }
    }
    function ge() {
        return new he
    }
    se = new WeakMap,
    ce = new WeakMap,
    Main = e
}
)();
