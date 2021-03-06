var hljs = new function() {
    function m(p) {
        return p.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
    }
    function f(r, q, p) {
        return RegExp(q, "m" + (r.cI ? "i" : "") + (p ? "g" : ""))
    }
    function b(r) {
        for (var p = 0; p < r.childNodes.length; p++) {
            var q = r.childNodes[p];
            if (q.nodeName == "CODE") {
                return q
            }
            if (!(q.nodeType == 3 && q.nodeValue.match(/\s+/))) {
                break
            }
        }
    }
    function h(t, s) {
        var p = "";
        for (var r = 0; r < t.childNodes.length; r++) {
            if (t.childNodes[r].nodeType == 3) {
                var q = t.childNodes[r].nodeValue;
                if (s) {
                    q = q.replace(/\n/g, "")
                }
                p += q
            } else {
                if (t.childNodes[r].nodeName == "BR") {
                    p += "\n"
                } else {
                    p += h(t.childNodes[r])
                }
            }
        }
        if (/MSIE [678]/.test(navigator.userAgent)) {
            p = p.replace(/\r/g, "\n")
        }
        return p
    }
    function a(s) {
        var r = s.className.split(/\s+/);
        r = r.concat(s.parentNode.className.split(/\s+/));
        for (var q = 0; q < r.length; q++) {
            var p = r[q].replace(/^language-/, "");
            if (e[p]) {
                return p
            }
        }
    }
    function c(q) {
        var p = [];
        (function(s, t) {
            for (var r = 0; r < s.childNodes.length; r++) {
                if (s.childNodes[r].nodeType == 3) {
                    t += s.childNodes[r].nodeValue.length
                } else {
                    if (s.childNodes[r].nodeName == "BR") {
                        t += 1
                    } else {
                        if (s.childNodes[r].nodeType == 1) {
                            p.push({
                                event: "start",
                                offset: t,
                                node: s.childNodes[r]
                            });
                            t = arguments.callee(s.childNodes[r], t);
                            p.push({
                                event: "stop",
                                offset: t,
                                node: s.childNodes[r]
                            })
                        }
                    }
                }
            }
            return t
        })(q, 0);
        return p
    }
    function k(y, w, x) {
        var q = 0;
        var z = "";
        var s = [];
        function u() {
            if (y.length && w.length) {
                if (y[0].offset != w[0].offset) {
                    return (y[0].offset < w[0].offset) ? y : w
                } else {
                    return w[0].event == "start" ? y : w
                }
            } else {
                return y.length ? y : w
            }
        }
        function t(D) {
            var A = "<" + D.nodeName.toLowerCase();
            for (var B = 0; B < D.attributes.length; B++) {
                var C = D.attributes[B];
                A += " " + C.nodeName.toLowerCase();
                if (C.value !== undefined && C.value !== false && C.value !== null) {
                    A += '="' + m(C.value) + '"'
                }
            }
            return A + ">"
        }
        while (y.length || w.length) {
            var v = u().splice(0, 1)[0];
            z += m(x.substr(q, v.offset - q));
            q = v.offset;
            if (v.event == "start") {
                z += t(v.node);
                s.push(v.node)
            } else {
                if (v.event == "stop") {
                    var p, r = s.length;
                    do {
                        r--;
                        p = s[r];
                        z += ("</" + p.nodeName.toLowerCase() + ">")
                    } while (p != v.node);s.splice(r, 1);
                    while (r < s.length) {
                        z += t(s[r]);
                        r++
                    }
                }
            }
        }
        return z + m(x.substr(q))
    }
    function j() {
        function q(x, y, v) {
            if (x.compiled) {
                return
            }
            var u;
            var s = [];
            if (x.k) {
                x.lR = f(y, x.l || hljs.IR, true);
                for (var w in x.k) {
                    if (!x.k.hasOwnProperty(w)) {
                        continue
                    }
                    if (x.k[w]instanceof Object) {
                        u = x.k[w]
                    } else {
                        u = x.k;
                        w = "keyword"
                    }
                    for (var r in u) {
                        if (!u.hasOwnProperty(r)) {
                            continue
                        }
                        x.k[r] = [w, u[r]];
                        s.push(r)
                    }
                }
            }
            if (!v) {
                if (x.bWK) {
                    x.b = "\\b(" + s.join("|") + ")\\s"
                }
                x.bR = f(y, x.b ? x.b : "\\B|\\b");
                if (!x.e && !x.eW) {
                    x.e = "\\B|\\b"
                }
                if (x.e) {
                    x.eR = f(y, x.e)
                }
            }
            if (x.i) {
                x.iR = f(y, x.i)
            }
            if (x.r === undefined) {
                x.r = 1
            }
            if (!x.c) {
                x.c = []
            }
            x.compiled = true;
            for (var t = 0; t < x.c.length; t++) {
                if (x.c[t] == "self") {
                    x.c[t] = x
                }
                q(x.c[t], y, false)
            }
            if (x.starts) {
                q(x.starts, y, false)
            }
        }
        for (var p in e) {
            if (!e.hasOwnProperty(p)) {
                continue
            }
            q(e[p].dM, e[p], true)
        }
    }
    function d(B, C) {
        if (!j.called) {
            j();
            j.called = true
        }
        function q(r, M) {
            for (var L = 0; L < M.c.length; L++) {
                if ((M.c[L].bR.exec(r) || [null])[0] == r) {
                    return M.c[L]
                }
            }
        }
        function v(L, r) {
            if (D[L].e && D[L].eR.test(r)) {
                return 1
            }
            if (D[L].eW) {
                var M = v(L - 1, r);
                return M ? M + 1 : 0
            }
            return 0
        }
        function w(r, L) {
            return L.i && L.iR.test(r)
        }
        function K(N, O) {
            var M = [];
            for (var L = 0; L < N.c.length; L++) {
                M.push(N.c[L].b)
            }
            var r = D.length - 1;
            do {
                if (D[r].e) {
                    M.push(D[r].e)
                }
                r--
            } while (D[r + 1].eW);if (N.i) {
                M.push(N.i)
            }
            return f(O, M.join("|"), true)
        }
        function p(M, L) {
            var N = D[D.length - 1];
            if (!N.t) {
                N.t = K(N, E)
            }
            N.t.lastIndex = L;
            var r = N.t.exec(M);
            return r ? [M.substr(L, r.index - L), r[0], false] : [M.substr(L), "", true]
        }
        function z(N, r) {
            var L = E.cI ? r[0].toLowerCase() : r[0];
            var M = N.k[L];
            if (M && M instanceof Array) {
                return M
            }
            return false
        }
        function F(L, P) {
            L = m(L);
            if (!P.k) {
                return L
            }
            var r = "";
            var O = 0;
            P.lR.lastIndex = 0;
            var M = P.lR.exec(L);
            while (M) {
                r += L.substr(O, M.index - O);
                var N = z(P, M);
                if (N) {
                    x += N[1];
                    r += '<span class="' + N[0] + '">' + M[0] + "</span>"
                } else {
                    r += M[0]
                }
                O = P.lR.lastIndex;
                M = P.lR.exec(L)
            }
            return r + L.substr(O, L.length - O)
        }
        function J(L, M) {
            if (M.sL && e[M.sL]) {
                var r = d(M.sL, L);
                x += r.keyword_count;
                return r.value
            } else {
                return F(L, M)
            }
        }
        function I(M, r) {
            var L = M.cN ? '<span class="' + M.cN + '">' : "";
            if (M.rB) {
                y += L;
                M.buffer = ""
            } else {
                if (M.eB) {
                    y += m(r) + L;
                    M.buffer = ""
                } else {
                    y += L;
                    M.buffer = r
                }
            }
            D.push(M);
            A += M.r
        }
        function G(N, M, Q) {
            var R = D[D.length - 1];
            if (Q) {
                y += J(R.buffer + N, R);
                return false
            }
            var P = q(M, R);
            if (P) {
                y += J(R.buffer + N, R);
                I(P, M);
                return P.rB
            }
            var L = v(D.length - 1, M);
            if (L) {
                var O = R.cN ? "</span>" : "";
                if (R.rE) {
                    y += J(R.buffer + N, R) + O
                } else {
                    if (R.eE) {
                        y += J(R.buffer + N, R) + O + m(M)
                    } else {
                        y += J(R.buffer + N + M, R) + O
                    }
                }
                while (L > 1) {
                    O = D[D.length - 2].cN ? "</span>" : "";
                    y += O;
                    L--;
                    D.length--
                }
                var r = D[D.length - 1];
                D.length--;
                D[D.length - 1].buffer = "";
                if (r.starts) {
                    I(r.starts, "")
                }
                return R.rE
            }
            if (w(M, R)) {
                throw "Illegal"
            }
        }
        var E = e[B];
        var D = [E.dM];
        var A = 0;
        var x = 0;
        var y = "";
        try {
            var s, u = 0;
            E.dM.buffer = "";
            do {
                s = p(C, u);
                var t = G(s[0], s[1], s[2]);
                u += s[0].length;
                if (!t) {
                    u += s[1].length
                }
            } while (!s[2]);if (D.length > 1) {
                throw "Illegal"
            }
            return {
                r: A,
                keyword_count: x,
                value: y
            }
        } catch (H) {
            if (H == "Illegal") {
                return {
                    r: 0,
                    keyword_count: 0,
                    value: m(C)
                }
            } else {
                throw H
            }
        }
    }
    function g(t) {
        var p = {
            keyword_count: 0,
            r: 0,
            value: m(t)
        };
        var r = p;
        for (var q in e) {
            if (!e.hasOwnProperty(q)) {
                continue
            }
            var s = d(q, t);
            s.language = q;
            if (s.keyword_count + s.r > r.keyword_count + r.r) {
                r = s
            }
            if (s.keyword_count + s.r > p.keyword_count + p.r) {
                r = p;
                p = s
            }
        }
        if (r.language) {
            p.second_best = r
        }
        return p
    }
    function i(r, q, p) {
        if (q) {
            r = r.replace(/^((<[^>]+>|\t)+)/gm, function(t, w, v, u) {
                return w.replace(/\t/g, q)
            })
        }
        if (p) {
            r = r.replace(/\n/g, "<br>")
        }
        return r
    }
    function n(t, w, r) {
        var x = h(t, r);
        var v = a(t);
        var y, s;
        if (v) {
            y = d(v, x)
        } else {
            return
        }
        var q = c(t);
        if (q.length) {
            s = document.createElement("pre");
            s.innerHTML = y.value;
            y.value = k(q, c(s), x)
        }
        y.value = i(y.value, w, r);
        var u = t.className;
        if (!u.match("(\\s|^)(language-)?" + v + "(\\s|$)")) {
            u = u ? (u + " " + v) : v
        }
        if (/MSIE [678]/.test(navigator.userAgent) && t.tagName == "CODE" && t.parentNode.tagName == "PRE") {
            s = t.parentNode;
            var p = document.createElement("div");
            p.innerHTML = "<pre><code>" + y.value + "</code></pre>";
            t = p.firstChild.firstChild;
            p.firstChild.cN = s.cN;
            s.parentNode.replaceChild(p.firstChild, s)
        } else {
            t.innerHTML = y.value
        }
        t.className = u;
        t.result = {
            language: v,
            kw: y.keyword_count,
            re: y.r
        };
        if (y.second_best) {
            t.second_best = {
                language: y.second_best.language,
                kw: y.second_best.keyword_count,
                re: y.second_best.r
            }
        }
    }
    function o() {
        if (o.called) {
            return
        }
        o.called = true;
        var r = document.getElementsByTagName("pre");
        for (var p = 0; p < r.length; p++) {
            var q = b(r[p]);
            if (q) {
                n(q, hljs.tabReplace)
            }
        }
    }
    function l() {
        if (window.addEventListener) {
            window.addEventListener("DOMContentLoaded", o, false);
            window.addEventListener("load", o, false)
        } else {
            if (window.attachEvent) {
                window.attachEvent("onload", o)
            } else {
                window.onload = o
            }
        }
    }
    var e = {};
    this.LANGUAGES = e;
    this.highlight = d;
    this.highlightAuto = g;
    this.fixMarkup = i;
    this.highlightBlock = n;
    this.initHighlighting = o;
    this.initHighlightingOnLoad = l;
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    this.BNR = "\\b(0b[01]+)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.ER = "(?![\\s\\S])";
    this.BE = {
        b: "\\\\.",
        r: 0
    };
    this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE],
        r: 0
    };
    this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE],
        r: 0
    };
    this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    };
    this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    };
    this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    };
    this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    };
    this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    };
    this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    };
    this.inherit = function(r, s) {
        var p = {};
        for (var q in r) {
            p[q] = r[q]
        }
        if (s) {
            for (var q in s) {
                p[q] = s[q]
            }
        }
        return p
    }
}
();
hljs.LANGUAGES.bash = function() {
    var e = {
        "true": 1,
        "false": 1
    };
    var b = {
        cN: "variable",
        b: "\\$([a-zA-Z0-9_]+)\\b"
    };
    var a = {
        cN: "variable",
        b: "\\$\\{(([^}])|(\\\\}))+\\}",
        c: [hljs.CNM]
    };
    var f = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [hljs.BE, b, a],
        r: 0
    };
    var c = {
        cN: "string",
        b: "'",
        e: "'",
        c: [{
            b: "''"
        }],
        r: 0
    };
    var d = {
        cN: "test_condition",
        b: "",
        e: "",
        c: [f, c, b, a, hljs.CNM],
        k: {
            literal: e
        },
        r: 0
    };
    return {
        dM: {
            k: {
                keyword: {
                    "if": 1,
                    then: 1,
                    "else": 1,
                    fi: 1,
                    "for": 1,
                    "break": 1,
                    "continue": 1,
                    "while": 1,
                    "in": 1,
                    "do": 1,
                    done: 1,
                    echo: 1,
                    exit: 1,
                    "return": 1,
                    set: 1,
                    declare: 1
                },
                literal: e
            },
            c: [{
                cN: "shebang",
                b: "(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",
                r: 10
            }, b, a, hljs.HCM, hljs.CNM, f, c, hljs.inherit(d, {
                b: "\\[ ",
                e: " \\]",
                r: 0
            }), hljs.inherit(d, {
                b: "\\[\\[ ",
                e: " \\]\\]"
            })]
        }
    }
}();
hljs.LANGUAGES.cpp = function() {
    var a = {
        keyword: {
            "false": 1,
            "int": 1,
            "float": 1,
            "while": 1,
            "private": 1,
            "char": 1,
            "catch": 1,
            "export": 1,
            virtual: 1,
            operator: 2,
            sizeof: 2,
            dynamic_cast: 2,
            typedef: 2,
            const_cast: 2,
            "const": 1,
            struct: 1,
            "for": 1,
            static_cast: 2,
            union: 1,
            namespace: 1,
            unsigned: 1,
            "long": 1,
            "throw": 1,
            "volatile": 2,
            "static": 1,
            "protected": 1,
            bool: 1,
            template: 1,
            mutable: 1,
            "if": 1,
            "public": 1,
            friend: 2,
            "do": 1,
            "return": 1,
            "goto": 1,
            auto: 1,
            "void": 2,
            "enum": 1,
            "else": 1,
            "break": 1,
            "new": 1,
            extern: 1,
            using: 1,
            "true": 1,
            "class": 1,
            asm: 1,
            "case": 1,
            typeid: 1,
            "short": 1,
            reinterpret_cast: 2,
            "default": 1,
            "double": 1,
            register: 1,
            explicit: 1,
            signed: 1,
            typename: 1,
            "try": 1,
            "this": 1,
            "switch": 1,
            "continue": 1,
            wchar_t: 1,
            inline: 1,
            "delete": 1,
            alignof: 1,
            char16_t: 1,
            char32_t: 1,
            constexpr: 1,
            decltype: 1,
            noexcept: 1,
            nullptr: 1,
            static_assert: 1,
            thread_local: 1,
            restrict: 1,
            _Bool: 1,
            complex: 1
        },
        built_in: {
            std: 1,
            string: 1,
            cin: 1,
            cout: 1,
            cerr: 1,
            clog: 1,
            stringstream: 1,
            istringstream: 1,
            ostringstream: 1,
            auto_ptr: 1,
            deque: 1,
            list: 1,
            queue: 1,
            stack: 1,
            vector: 1,
            map: 1,
            set: 1,
            bitset: 1,
            multiset: 1,
            multimap: 1,
            unordered_set: 1,
            unordered_map: 1,
            unordered_multiset: 1,
            unordered_multimap: 1,
            array: 1,
            shared_ptr: 1
        }
    };
    return {
        dM: {
            k: a,
            i: "</",
            c: [hljs.CLCM, hljs.CBLCLM, hljs.QSM, {
                cN: "string",
                b: "'\\\\?.",
                e: "'",
                i: "."
            }, {
                cN: "number",
                b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
            }, hljs.CNM, {
                cN: "preprocessor",
                b: "#",
                e: "$"
            }, {
                cN: "stl_container",
                b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                e: ">",
                k: a,
                r: 10,
                c: ["self"]
            }]
        }
    }
}();
hljs.LANGUAGES.css = function() {
    var a = {
        cN: "function",
        b: hljs.IR + "\\(",
        e: "\\)",
        c: [{
            eW: true,
            eE: true,
            c: [hljs.NM, hljs.ASM, hljs.QSM]
        }]
    };
    return {
        cI: true,
        dM: {
            i: "[=/|']",
            c: [hljs.CBLCLM, {
                cN: "id",
                b: "\\#[A-Za-z0-9_-]+"
            }, {
                cN: "class",
                b: "\\.[A-Za-z0-9_-]+",
                r: 0
            }, {
                cN: "attr_selector",
                b: "\\[",
                e: "\\]",
                i: "$"
            }, {
                cN: "pseudo",
                b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
            }, {
                cN: "at_rule",
                b: "@(font-face|page)",
                l: "[a-z-]+",
                k: {
                    "font-face": 1,
                    page: 1
                }
            }, {
                cN: "at_rule",
                b: "@",
                e: "[{;]",
                eE: true,
                k: {
                    "import": 1,
                    page: 1,
                    media: 1,
                    charset: 1
                },
                c: [a, hljs.ASM, hljs.QSM, hljs.NM]
            }, {
                cN: "tag",
                b: hljs.IR,
                r: 0
            }, {
                cN: "rules",
                b: "{",
                e: "}",
                i: "[^\\s]",
                r: 0,
                c: [hljs.CBLCLM, {
                    cN: "rule",
                    b: "[^\\s]",
                    rB: true,
                    e: ";",
                    eW: true,
                    c: [{
                        cN: "attribute",
                        b: "[A-Z\\_\\.\\-]+",
                        e: ":",
                        eE: true,
                        i: "[^\\s]",
                        starts: {
                            cN: "value",
                            eW: true,
                            eE: true,
                            c: [a, hljs.NM, hljs.QSM, hljs.ASM, hljs.CBLCLM, {
                                cN: "hexcolor",
                                b: "\\#[0-9A-F]+"
                            }, {
                                cN: "important",
                                b: "!important"
                            }]
                        }
                    }]
                }]
            }]
        }
    }
}();
hljs.LANGUAGES.ini = {
    cI: true,
    dM: {
        i: "[^\\s]",
        c: [{
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "title",
            b: "^\\[",
            e: "\\]"
        }, {
            cN: "setting",
            b: "^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*",
            e: "$",
            c: [{
                cN: "value",
                eW: true,
                k: {
                    on: 1,
                    off: 1,
                    "true": 1,
                    "false": 1,
                    yes: 1,
                    no: 1
                },
                c: [hljs.QSM, hljs.NM]
            }]
        }]
    }
};
hljs.LANGUAGES.perl = function() {
    var d = {
        getpwent: 1,
        getservent: 1,
        quotemeta: 1,
        msgrcv: 1,
        scalar: 1,
        kill: 1,
        dbmclose: 1,
        undef: 1,
        lc: 1,
        ma: 1,
        syswrite: 1,
        tr: 1,
        send: 1,
        umask: 1,
        sysopen: 1,
        shmwrite: 1,
        vec: 1,
        qx: 1,
        utime: 1,
        local: 1,
        oct: 1,
        semctl: 1,
        localtime: 1,
        readpipe: 1,
        "do": 1,
        "return": 1,
        format: 1,
        read: 1,
        sprintf: 1,
        dbmopen: 1,
        pop: 1,
        getpgrp: 1,
        not: 1,
        getpwnam: 1,
        rewinddir: 1,
        qq: 1,
        fileno: 1,
        qw: 1,
        endprotoent: 1,
        wait: 1,
        sethostent: 1,
        bless: 1,
        s: 0,
        opendir: 1,
        "continue": 1,
        each: 1,
        sleep: 1,
        endgrent: 1,
        shutdown: 1,
        dump: 1,
        chomp: 1,
        connect: 1,
        getsockname: 1,
        die: 1,
        socketpair: 1,
        close: 1,
        flock: 1,
        exists: 1,
        index: 1,
        shmget: 1,
        sub: 1,
        "for": 1,
        endpwent: 1,
        redo: 1,
        lstat: 1,
        msgctl: 1,
        setpgrp: 1,
        abs: 1,
        exit: 1,
        select: 1,
        print: 1,
        ref: 1,
        gethostbyaddr: 1,
        unshift: 1,
        fcntl: 1,
        syscall: 1,
        "goto": 1,
        getnetbyaddr: 1,
        join: 1,
        gmtime: 1,
        symlink: 1,
        semget: 1,
        splice: 1,
        x: 0,
        getpeername: 1,
        recv: 1,
        log: 1,
        setsockopt: 1,
        cos: 1,
        last: 1,
        reverse: 1,
        gethostbyname: 1,
        getgrnam: 1,
        study: 1,
        formline: 1,
        endhostent: 1,
        times: 1,
        chop: 1,
        length: 1,
        gethostent: 1,
        getnetent: 1,
        pack: 1,
        getprotoent: 1,
        getservbyname: 1,
        rand: 1,
        mkdir: 1,
        pos: 1,
        chmod: 1,
        y: 0,
        substr: 1,
        endnetent: 1,
        printf: 1,
        next: 1,
        open: 1,
        msgsnd: 1,
        readdir: 1,
        use: 1,
        unlink: 1,
        getsockopt: 1,
        getpriority: 1,
        rindex: 1,
        wantarray: 1,
        hex: 1,
        system: 1,
        getservbyport: 1,
        endservent: 1,
        "int": 1,
        chr: 1,
        untie: 1,
        rmdir: 1,
        prototype: 1,
        tell: 1,
        listen: 1,
        fork: 1,
        shmread: 1,
        ucfirst: 1,
        setprotoent: 1,
        "else": 1,
        sysseek: 1,
        link: 1,
        getgrgid: 1,
        shmctl: 1,
        waitpid: 1,
        unpack: 1,
        getnetbyname: 1,
        reset: 1,
        chdir: 1,
        grep: 1,
        split: 1,
        require: 1,
        caller: 1,
        lcfirst: 1,
        until: 1,
        warn: 1,
        "while": 1,
        values: 1,
        shift: 1,
        telldir: 1,
        getpwuid: 1,
        my: 1,
        getprotobynumber: 1,
        "delete": 1,
        and: 1,
        sort: 1,
        uc: 1,
        defined: 1,
        srand: 1,
        accept: 1,
        "package": 1,
        seekdir: 1,
        getprotobyname: 1,
        semop: 1,
        our: 1,
        rename: 1,
        seek: 1,
        "if": 1,
        q: 0,
        chroot: 1,
        sysread: 1,
        setpwent: 1,
        no: 1,
        crypt: 1,
        getc: 1,
        chown: 1,
        sqrt: 1,
        write: 1,
        setnetent: 1,
        setpriority: 1,
        foreach: 1,
        tie: 1,
        sin: 1,
        msgget: 1,
        map: 1,
        stat: 1,
        getlogin: 1,
        unless: 1,
        elsif: 1,
        truncate: 1,
        exec: 1,
        keys: 1,
        glob: 1,
        tied: 1,
        closedir: 1,
        ioctl: 1,
        socket: 1,
        readlink: 1,
        "eval": 1,
        xor: 1,
        readline: 1,
        binmode: 1,
        setservent: 1,
        eof: 1,
        ord: 1,
        bind: 1,
        alarm: 1,
        pipe: 1,
        atan2: 1,
        getgrent: 1,
        exp: 1,
        time: 1,
        push: 1,
        setgrent: 1,
        gt: 1,
        lt: 1,
        or: 1,
        ne: 1,
        m: 0
    };
    var f = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: d,
        r: 10
    };
    var c = {
        cN: "variable",
        b: "\\$\\d"
    };
    var b = {
        cN: "variable",
        b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"
    };
    var h = [hljs.BE, f, c, b];
    var g = {
        b: "->",
        c: [{
            b: hljs.IR
        }, {
            b: "{",
            e: "}"
        }]
    };
    var e = {
        cN: "comment",
        b: "^(__END__|__DATA__)",
        e: "\\n$",
        r: 5
    };
    var a = [c, b, hljs.HCM, e, g, {
        cN: "string",
        b: "q[qwxr]?\\s*\\(",
        e: "\\)",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "q[qwxr]?\\s*\\[",
        e: "\\]",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "q[qwxr]?\\s*\\{",
        e: "\\}",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "q[qwxr]?\\s*\\|",
        e: "\\|",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "q[qwxr]?\\s*\\<",
        e: "\\>",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "qw\\s+q",
        e: "q",
        c: h,
        r: 5
    }, {
        cN: "string",
        b: "'",
        e: "'",
        c: [hljs.BE],
        r: 0
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: h,
        r: 0
    }, {
        cN: "string",
        b: "`",
        e: "`",
        c: [hljs.BE]
    }, {
        cN: "string",
        b: "{\\w+}",
        r: 0
    }, {
        cN: "string",
        b: "-?\\w+\\s*\\=\\>",
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(" + hljs.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: {
            split: 1,
            "return": 1,
            print: 1,
            reverse: 1,
            grep: 1
        },
        r: 0,
        c: [hljs.HCM, e, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [hljs.BE],
            r: 0
        }]
    }, {
        cN: "sub",
        b: "\\bsub\\b",
        e: "(\\s*\\(.*?\\))?[;{]",
        k: {
            sub: 1
        },
        r: 5
    }, {
        cN: "operator",
        b: "-\\w\\b",
        r: 0
    }, {
        cN: "pod",
        b: "\\=\\w",
        e: "\\=cut"
    }];
    f.c = a;
    g.c[1].c = a;
    return {
        dM: {
            k: d,
            c: a
        }
    }
}();
hljs.LANGUAGES.python = function() {
    var b = [{
        cN: "string",
        b: "(u|b)?r?'''",
        e: "'''",
        r: 10
    }, {
        cN: "string",
        b: '(u|b)?r?"""',
        e: '"""',
        r: 10
    }, {
        cN: "string",
        b: "(u|r|ur)'",
        e: "'",
        c: [hljs.BE],
        r: 10
    }, {
        cN: "string",
        b: '(u|r|ur)"',
        e: '"',
        c: [hljs.BE],
        r: 10
    }, {
        cN: "string",
        b: "(b|br)'",
        e: "'",
        c: [hljs.BE]
    }, {
        cN: "string",
        b: '(b|br)"',
        e: '"',
        c: [hljs.BE]
    }].concat([hljs.ASM, hljs.QSM]);
    var d = {
        cN: "title",
        b: hljs.UIR
    };
    var c = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: b.concat([hljs.CNM])
    };
    var a = {
        bWK: true,
        e: ":",
        i: "[${]",
        c: [d, c],
        r: 10
    };
    return {
        dM: {
            k: {
                keyword: {
                    and: 1,
                    elif: 1,
                    is: 1,
                    global: 1,
                    as: 1,
                    "in": 1,
                    "if": 1,
                    from: 1,
                    raise: 1,
                    "for": 1,
                    except: 1,
                    "finally": 1,
                    print: 1,
                    "import": 1,
                    pass: 1,
                    "return": 1,
                    exec: 1,
                    "else": 1,
                    "break": 1,
                    not: 1,
                    "with": 1,
                    "class": 1,
                    assert: 1,
                    yield: 1,
                    "try": 1,
                    "while": 1,
                    "continue": 1,
                    del: 1,
                    or: 1,
                    def: 1,
                    lambda: 1,
                    nonlocal: 10
                },
                built_in: {
                    None: 1,
                    True: 1,
                    False: 1,
                    Ellipsis: 1,
                    NotImplemented: 1
                }
            },
            i: "(</|->|\\?)",
            c: b.concat([hljs.HCM, hljs.inherit(a, {
                cN: "function",
                k: {
                    def: 1
                }
            }), hljs.inherit(a, {
                cN: "class",
                k: {
                    "class": 1
                }
            }), hljs.CNM, {
                cN: "decorator",
                b: "@",
                e: "$"
            }])
        }
    }
}();
hljs.LANGUAGES.r = {
    dM: {
        c: [hljs.HCM, {
            cN: "number",
            b: "\\b0[xX][0-9a-fA-F]+[Li]?\\b",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "number",
            b: "\\b\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "number",
            b: "\\b\\d+\\.(?!\\d)(?:i\\b)?",
            e: hljs.IMMEDIATE_RE,
            r: 1
        }, {
            cN: "number",
            b: "\\b\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "number",
            b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
            e: hljs.IMMEDIATE_RE,
            r: 1
        }, {
            cN: "keyword",
            b: "(?:tryCatch|library|setGeneric|setGroupGeneric)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "keyword",
            b: "\\.\\.\\.",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "keyword",
            b: "\\.\\.\\d+(?![\\w.])",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "keyword",
            b: "\\b(?:function)",
            e: hljs.IMMEDIATE_RE,
            r: 2
        }, {
            cN: "keyword",
            b: "(?:if|in|break|next|repeat|else|for|return|switch|while|try|stop|warning|require|attach|detach|source|setMethod|setClass)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 1
        }, {
            cN: "literal",
            b: "(?:NA|NA_integer_|NA_real_|NA_character_|NA_complex_)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "literal",
            b: "(?:NULL|TRUE|FALSE|T|F|Inf|NaN)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 1
        }, {
            cN: "identifier",
            b: "[a-zA-Z.][a-zA-Z0-9._]*\\b",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "operator",
            b: "<\\-(?!\\s*\\d)",
            e: hljs.IMMEDIATE_RE,
            r: 2
        }, {
            cN: "operator",
            b: "\\->|<\\-",
            e: hljs.IMMEDIATE_RE,
            r: 1
        }, {
            cN: "operator",
            b: "%%|~",
            e: hljs.IMMEDIATE_RE
        }, {
            cN: "operator",
            b: ">=|<=|==|!=|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||\\$|:",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "operator",
            b: "%",
            e: "%",
            i: "\\n",
            r: 1
        }, {
            cN: "identifier",
            b: "`",
            e: "`",
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: '"',
            c: [hljs.BE],
            r: 0
        }, {
            cN: "string",
            b: "'",
            e: "'",
            c: [hljs.BE],
            r: 0
        }, {
            cN: "paren",
            b: "[[({\\])}]",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }]
    }
};
hljs.LANGUAGES.ruby = function() {
    var a = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?";
    var j = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
    var f = {
        keyword: {
            and: 1,
            "false": 1,
            then: 1,
            defined: 1,
            module: 1,
            "in": 1,
            "return": 1,
            redo: 1,
            "if": 1,
            BEGIN: 1,
            retry: 1,
            end: 1,
            "for": 1,
            "true": 1,
            self: 1,
            when: 1,
            next: 1,
            until: 1,
            "do": 1,
            begin: 1,
            unless: 1,
            END: 1,
            rescue: 1,
            nil: 1,
            "else": 1,
            "break": 1,
            undef: 1,
            not: 1,
            "super": 1,
            "class": 1,
            "case": 1,
            require: 1,
            yield: 1,
            alias: 1,
            "while": 1,
            ensure: 1,
            elsif: 1,
            or: 1,
            def: 1
        },
        keymethods: {
            __id__: 1,
            __send__: 1,
            abort: 1,
            abs: 1,
            "all?": 1,
            allocate: 1,
            ancestors: 1,
            "any?": 1,
            arity: 1,
            assoc: 1,
            at: 1,
            at_exit: 1,
            autoload: 1,
            "autoload?": 1,
            "between?": 1,
            binding: 1,
            binmode: 1,
            "block_given?": 1,
            call: 1,
            callcc: 1,
            caller: 1,
            capitalize: 1,
            "capitalize!": 1,
            casecmp: 1,
            "catch": 1,
            ceil: 1,
            center: 1,
            chomp: 1,
            "chomp!": 1,
            chop: 1,
            "chop!": 1,
            chr: 1,
            "class": 1,
            class_eval: 1,
            "class_variable_defined?": 1,
            class_variables: 1,
            clear: 1,
            clone: 1,
            close: 1,
            close_read: 1,
            close_write: 1,
            "closed?": 1,
            coerce: 1,
            collect: 1,
            "collect!": 1,
            compact: 1,
            "compact!": 1,
            concat: 1,
            "const_defined?": 1,
            const_get: 1,
            const_missing: 1,
            const_set: 1,
            constants: 1,
            count: 1,
            crypt: 1,
            "default": 1,
            default_proc: 1,
            "delete": 1,
            "delete!": 1,
            delete_at: 1,
            delete_if: 1,
            detect: 1,
            display: 1,
            div: 1,
            divmod: 1,
            downcase: 1,
            "downcase!": 1,
            downto: 1,
            dump: 1,
            dup: 1,
            each: 1,
            each_byte: 1,
            each_index: 1,
            each_key: 1,
            each_line: 1,
            each_pair: 1,
            each_value: 1,
            each_with_index: 1,
            "empty?": 1,
            entries: 1,
            eof: 1,
            "eof?": 1,
            "eql?": 1,
            "equal?": 1,
            "eval": 1,
            exec: 1,
            exit: 1,
            "exit!": 1,
            extend: 1,
            fail: 1,
            fcntl: 1,
            fetch: 1,
            fileno: 1,
            fill: 1,
            find: 1,
            find_all: 1,
            first: 1,
            flatten: 1,
            "flatten!": 1,
            floor: 1,
            flush: 1,
            for_fd: 1,
            foreach: 1,
            fork: 1,
            format: 1,
            freeze: 1,
            "frozen?": 1,
            fsync: 1,
            getc: 1,
            gets: 1,
            global_variables: 1,
            grep: 1,
            gsub: 1,
            "gsub!": 1,
            "has_key?": 1,
            "has_value?": 1,
            hash: 1,
            hex: 1,
            id: 1,
            include: 1,
            "include?": 1,
            included_modules: 1,
            index: 1,
            indexes: 1,
            indices: 1,
            induced_from: 1,
            inject: 1,
            insert: 1,
            inspect: 1,
            instance_eval: 1,
            instance_method: 1,
            instance_methods: 1,
            "instance_of?": 1,
            "instance_variable_defined?": 1,
            instance_variable_get: 1,
            instance_variable_set: 1,
            instance_variables: 1,
            "integer?": 1,
            intern: 1,
            invert: 1,
            ioctl: 1,
            "is_a?": 1,
            isatty: 1,
            "iterator?": 1,
            join: 1,
            "key?": 1,
            keys: 1,
            "kind_of?": 1,
            lambda: 1,
            last: 1,
            length: 1,
            lineno: 1,
            ljust: 1,
            load: 1,
            local_variables: 1,
            loop: 1,
            lstrip: 1,
            "lstrip!": 1,
            map: 1,
            "map!": 1,
            match: 1,
            max: 1,
            "member?": 1,
            merge: 1,
            "merge!": 1,
            method: 1,
            "method_defined?": 1,
            method_missing: 1,
            methods: 1,
            min: 1,
            module_eval: 1,
            modulo: 1,
            name: 1,
            nesting: 1,
            "new": 1,
            next: 1,
            "next!": 1,
            "nil?": 1,
            nitems: 1,
            "nonzero?": 1,
            object_id: 1,
            oct: 1,
            open: 1,
            pack: 1,
            partition: 1,
            pid: 1,
            pipe: 1,
            pop: 1,
            popen: 1,
            pos: 1,
            prec: 1,
            prec_f: 1,
            prec_i: 1,
            print: 1,
            printf: 1,
            private_class_method: 1,
            private_instance_methods: 1,
            "private_method_defined?": 1,
            private_methods: 1,
            proc: 1,
            protected_instance_methods: 1,
            "protected_method_defined?": 1,
            protected_methods: 1,
            public_class_method: 1,
            public_instance_methods: 1,
            "public_method_defined?": 1,
            public_methods: 1,
            push: 1,
            putc: 1,
            puts: 1,
            quo: 1,
            raise: 1,
            rand: 1,
            rassoc: 1,
            read: 1,
            read_nonblock: 1,
            readchar: 1,
            readline: 1,
            readlines: 1,
            readpartial: 1,
            rehash: 1,
            reject: 1,
            "reject!": 1,
            remainder: 1,
            reopen: 1,
            replace: 1,
            require: 1,
            "respond_to?": 1,
            reverse: 1,
            "reverse!": 1,
            reverse_each: 1,
            rewind: 1,
            rindex: 1,
            rjust: 1,
            round: 1,
            rstrip: 1,
            "rstrip!": 1,
            scan: 1,
            seek: 1,
            select: 1,
            send: 1,
            set_trace_func: 1,
            shift: 1,
            singleton_method_added: 1,
            singleton_methods: 1,
            size: 1,
            sleep: 1,
            slice: 1,
            "slice!": 1,
            sort: 1,
            "sort!": 1,
            sort_by: 1,
            split: 1,
            sprintf: 1,
            squeeze: 1,
            "squeeze!": 1,
            srand: 1,
            stat: 1,
            step: 1,
            store: 1,
            strip: 1,
            "strip!": 1,
            sub: 1,
            "sub!": 1,
            succ: 1,
            "succ!": 1,
            sum: 1,
            superclass: 1,
            swapcase: 1,
            "swapcase!": 1,
            sync: 1,
            syscall: 1,
            sysopen: 1,
            sysread: 1,
            sysseek: 1,
            system: 1,
            syswrite: 1,
            taint: 1,
            "tainted?": 1,
            tell: 1,
            test: 1,
            "throw": 1,
            times: 1,
            to_a: 1,
            to_ary: 1,
            to_f: 1,
            to_hash: 1,
            to_i: 1,
            to_int: 1,
            to_io: 1,
            to_proc: 1,
            to_s: 1,
            to_str: 1,
            to_sym: 1,
            tr: 1,
            "tr!": 1,
            tr_s: 1,
            "tr_s!": 1,
            trace_var: 1,
            transpose: 1,
            trap: 1,
            truncate: 1,
            "tty?": 1,
            type: 1,
            ungetc: 1,
            uniq: 1,
            "uniq!": 1,
            unpack: 1,
            unshift: 1,
            untaint: 1,
            untrace_var: 1,
            upcase: 1,
            "upcase!": 1,
            update: 1,
            upto: 1,
            "value?": 1,
            values: 1,
            values_at: 1,
            warn: 1,
            write: 1,
            write_nonblock: 1,
            "zero?": 1,
            zip: 1
        }
    };
    var c = {
        cN: "yardoctag",
        b: "@[A-Za-z]+"
    };
    var k = [{
        cN: "comment",
        b: "#",
        e: "$",
        c: [c]
    }, {
        cN: "comment",
        b: "^\\=begin",
        e: "^\\=end",
        c: [c],
        r: 10
    }, {
        cN: "comment",
        b: "^__END__",
        e: "\\n$"
    }];
    var d = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        l: a,
        k: f
    };
    var i = [hljs.BE, d];
    var b = [{
        cN: "string",
        b: "'",
        e: "'",
        c: i,
        r: 0
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: i,
        r: 0
    }, {
        cN: "string",
        b: "%[qw]?\\(",
        e: "\\)",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?\\[",
        e: "\\]",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?{",
        e: "}",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?<",
        e: ">",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?/",
        e: "/",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?%",
        e: "%",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?-",
        e: "-",
        c: i,
        r: 10
    }, {
        cN: "string",
        b: "%[qw]?\\|",
        e: "\\|",
        c: i,
        r: 10
    }];
    var h = {
        cN: "function",
        b: "\\bdef\\s+",
        e: " |$|;",
        l: a,
        k: f,
        c: [{
            cN: "title",
            b: j,
            l: a,
            k: f
        }, {
            cN: "params",
            b: "\\(",
            e: "\\)",
            l: a,
            k: f
        }].concat(k)
    };
    var g = {
        cN: "identifier",
        b: a,
        l: a,
        k: f,
        r: 0
    };
    var e = k.concat(b.concat([{
        cN: "class",
        b: "\\b(class|module)\\b",
        e: "$|;",
        k: {
            "class": 1,
            module: 1
        },
        c: [{
            cN: "title",
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",
            r: 0
        }, {
            cN: "inheritance",
            b: "<\\s*",
            c: [{
                cN: "parent",
                b: "(" + hljs.IR + "::)?" + hljs.IR
            }]
        }].concat(k)
    }, h, {
        cN: "constant",
        b: "(::)?([A-Z]\\w*(::)?)+",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: b.concat([g]),
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "number",
        b: "\\?\\w"
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, g, {
        b: "(" + hljs.RSR + ")\\s*",
        c: k.concat([{
            cN: "regexp",
            b: "/",
            e: "/[a-z]*",
            i: "\\n",
            c: [hljs.BE]
        }]),
        r: 0
    }]));
    d.c = e;
    h.c[1].c = e;
    return {
        dM: {
            l: a,
            k: f,
            c: e
        }
    }
}();
hljs.LANGUAGES.scala = function() {
    var b = {
        cN: "annotation",
        b: "@[A-Za-z]+"
    };
    var a = {
        cN: "string",
        b: 'u?r?"""',
        e: '"""',
        r: 10
    };
    return {
        dM: {
            k: {
                type: 1,
                yield: 1,
                lazy: 1,
                override: 1,
                def: 1,
                "with": 1,
                val: 1,
                "var": 1,
                "false": 1,
                "true": 1,
                sealed: 1,
                "abstract": 1,
                "private": 1,
                trait: 1,
                object: 1,
                "null": 1,
                "if": 1,
                "for": 1,
                "while": 1,
                "throw": 1,
                "finally": 1,
                "protected": 1,
                "extends": 1,
                "import": 1,
                "final": 1,
                "return": 1,
                "else": 1,
                "break": 1,
                "new": 1,
                "catch": 1,
                "super": 1,
                "class": 1,
                "case": 1,
                "package": 1,
                "default": 1,
                "try": 1,
                "this": 1,
                match: 1,
                "continue": 1,
                "throws": 1
            },
            c: [{
                cN: "javadoc",
                b: "/\\*\\*",
                e: "\\*/",
                c: [{
                    cN: "javadoctag",
                    b: "@[A-Za-z]+"
                }],
                r: 10
            }, hljs.CLCM, hljs.CBLCLM, hljs.ASM, hljs.QSM, a, {
                cN: "class",
                b: "((case )?class |object |trait )",
                e: "({|$)",
                i: ":",
                k: {
                    "case": 1,
                    "class": 1,
                    trait: 1,
                    object: 1
                },
                c: [{
                    bWK: true,
                    k: {
                        "extends": 1,
                        "with": 1
                    },
                    r: 10
                }, {
                    cN: "title",
                    b: hljs.UIR
                }, {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    c: [hljs.ASM, hljs.QSM, a, b]
                }]
            }, hljs.CNM, b]
        }
    }
}();
hljs.LANGUAGES.sql = {
    cI: true,
    dM: {
        i: "[^\\s]",
        c: [{
            cN: "operator",
            b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b",
            e: ";|" + hljs.ER,
            k: {
                keyword: {
                    all: 1,
                    partial: 1,
                    global: 1,
                    month: 1,
                    current_timestamp: 1,
                    using: 1,
                    go: 1,
                    revoke: 1,
                    smallint: 1,
                    indicator: 1,
                    "end-exec": 1,
                    disconnect: 1,
                    zone: 1,
                    "with": 1,
                    character: 1,
                    assertion: 1,
                    to: 1,
                    add: 1,
                    current_user: 1,
                    usage: 1,
                    input: 1,
                    local: 1,
                    alter: 1,
                    match: 1,
                    collate: 1,
                    real: 1,
                    then: 1,
                    rollback: 1,
                    get: 1,
                    read: 1,
                    timestamp: 1,
                    session_user: 1,
                    not: 1,
                    integer: 1,
                    bit: 1,
                    unique: 1,
                    day: 1,
                    minute: 1,
                    desc: 1,
                    insert: 1,
                    execute: 1,
                    like: 1,
                    ilike: 2,
                    level: 1,
                    decimal: 1,
                    drop: 1,
                    "continue": 1,
                    isolation: 1,
                    found: 1,
                    where: 1,
                    constraints: 1,
                    domain: 1,
                    right: 1,
                    national: 1,
                    some: 1,
                    module: 1,
                    transaction: 1,
                    relative: 1,
                    second: 1,
                    connect: 1,
                    escape: 1,
                    close: 1,
                    system_user: 1,
                    "for": 1,
                    deferred: 1,
                    section: 1,
                    cast: 1,
                    current: 1,
                    sqlstate: 1,
                    allocate: 1,
                    intersect: 1,
                    deallocate: 1,
                    numeric: 1,
                    "public": 1,
                    preserve: 1,
                    full: 1,
                    "goto": 1,
                    initially: 1,
                    asc: 1,
                    no: 1,
                    key: 1,
                    output: 1,
                    collation: 1,
                    group: 1,
                    by: 1,
                    union: 1,
                    session: 1,
                    both: 1,
                    last: 1,
                    language: 1,
                    constraint: 1,
                    column: 1,
                    of: 1,
                    space: 1,
                    foreign: 1,
                    deferrable: 1,
                    prior: 1,
                    connection: 1,
                    unknown: 1,
                    action: 1,
                    commit: 1,
                    view: 1,
                    or: 1,
                    first: 1,
                    into: 1,
                    "float": 1,
                    year: 1,
                    primary: 1,
                    cascaded: 1,
                    except: 1,
                    restrict: 1,
                    set: 1,
                    references: 1,
                    names: 1,
                    table: 1,
                    outer: 1,
                    open: 1,
                    select: 1,
                    size: 1,
                    are: 1,
                    rows: 1,
                    from: 1,
                    prepare: 1,
                    distinct: 1,
                    leading: 1,
                    create: 1,
                    only: 1,
                    next: 1,
                    inner: 1,
                    authorization: 1,
                    schema: 1,
                    corresponding: 1,
                    option: 1,
                    declare: 1,
                    precision: 1,
                    immediate: 1,
                    "else": 1,
                    timezone_minute: 1,
                    external: 1,
                    varying: 1,
                    translation: 1,
                    "true": 1,
                    "case": 1,
                    exception: 1,
                    join: 1,
                    hour: 1,
                    "default": 1,
                    "double": 1,
                    scroll: 1,
                    value: 1,
                    cursor: 1,
                    descriptor: 1,
                    values: 1,
                    dec: 1,
                    fetch: 1,
                    procedure: 1,
                    "delete": 1,
                    and: 1,
                    "false": 1,
                    "int": 1,
                    is: 1,
                    describe: 1,
                    "char": 1,
                    as: 1,
                    at: 1,
                    "in": 1,
                    varchar: 1,
                    "null": 1,
                    trailing: 1,
                    any: 1,
                    absolute: 1,
                    current_time: 1,
                    end: 1,
                    grant: 1,
                    privileges: 1,
                    when: 1,
                    cross: 1,
                    check: 1,
                    write: 1,
                    current_date: 1,
                    pad: 1,
                    begin: 1,
                    temporary: 1,
                    exec: 1,
                    time: 1,
                    update: 1,
                    catalog: 1,
                    user: 1,
                    sql: 1,
                    date: 1,
                    on: 1,
                    identity: 1,
                    timezone_hour: 1,
                    natural: 1,
                    whenever: 1,
                    interval: 1,
                    work: 1,
                    order: 1,
                    cascade: 1,
                    diagnostics: 1,
                    nchar: 1,
                    having: 1,
                    left: 1,
                    call: 1,
                    "do": 1,
                    handler: 1,
                    load: 1,
                    replace: 1,
                    truncate: 1,
                    start: 1,
                    lock: 1,
                    show: 1,
                    pragma: 1
                },
                aggregate: {
                    count: 1,
                    sum: 1,
                    min: 1,
                    max: 1,
                    avg: 1
                }
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [hljs.BE, {
                    b: "''"
                }],
                r: 0
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [hljs.BE, {
                    b: '""'
                }],
                r: 0
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [hljs.BE]
            }, hljs.CNM]
        }, hljs.CBLCLM, {
            cN: "comment",
            b: "--",
            e: "$"
        }]
    }
};
hljs.LANGUAGES.stan = {
    dM: {
        c: [hljs.HCM, hljs.CLCM, hljs.QSM, hljs.CNM, {
            cN: "operator",
            b: "(?:<-|~|\\|\\||&&|==|!=|<=?|>=?|\\+|-|\\.?/|\\\\|\\^|\\^|!|'|%|:|,|;|=)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "paren",
            b: "[[({\\])}]",
            e: hljs.IMMEDIATE_RE,
            r: 0
        }, {
            cN: "function",
            b: "(?:Phi|Phi_approx|abs|acos|acosh|append_col|append_row|asin|asinh|atan|atan2|atanh|bernoulli_ccdf_log|bernoulli_cdf|bernoulli_cdf_log|bernoulli_log|bernoulli_logit_log|bernoulli_rng|bessel_first_kind|bessel_second_kind|beta_binomial_ccdf_log|beta_binomial_cdf|beta_binomial_cdf_log|beta_binomial_log|beta_binomial_rng|beta_ccdf_log|beta_cdf|beta_cdf_log|beta_log|beta_rng|binary_log_loss|binomial_ccdf_log|binomial_cdf|binomial_cdf_log|binomial_coefficient_log|binomial_log|binomial_logit_log|binomial_rng|block|categorical_log|categorical_logit_log|categorical_rng|cauchy_ccdf_log|cauchy_cdf|cauchy_cdf_log|cauchy_log|cauchy_rng|cbrt|ceil|chi_square_ccdf_log|chi_square_cdf|chi_square_cdf_log|chi_square_log|chi_square_rng|cholesky_decompose|col|cols|columns_dot_product|columns_dot_self|cos|cosh|crossprod|csr_extract_u|csr_extract_v|csr_extract_w|csr_matrix_times_vector|csr_to_dense_matrix|cumulative_sum|determinant|diag_matrix|diag_post_multiply|diag_pre_multiply|diagonal|digamma|dims|dirichlet_log|dirichlet_rng|distance|dot_product|dot_self|double_exponential_ccdf_log|double_exponential_cdf|double_exponential_cdf_log|double_exponential_log|double_exponential_rng|e|eigenvalues_sym|eigenvectors_sym|erf|erfc|exp|exp2|exp_mod_normal_ccdf_log|exp_mod_normal_cdf|exp_mod_normal_cdf_log|exp_mod_normal_log|exp_mod_normal_rng|expm1|exponential_ccdf_log|exponential_cdf|exponential_cdf_log|exponential_log|exponential_rng|fabs|falling_factorial|fdim|floor|fma|fmax|fmin|fmod|frechet_ccdf_log|frechet_cdf|frechet_cdf_log|frechet_log|frechet_rng|gamma_ccdf_log|gamma_cdf|gamma_cdf_log|gamma_log|gamma_p|gamma_q|gamma_rng|gaussian_dlm_obs_log|get_lp|gumbel_ccdf_log|gumbel_cdf|gumbel_cdf_log|gumbel_log|gumbel_rng|head|hypergeometric_log|hypergeometric_rng|hypot|if_else|int_step|inv|inv_chi_square_ccdf_log|inv_chi_square_cdf|inv_chi_square_cdf_log|inv_chi_square_log|inv_chi_square_rng|inv_cloglog|inv_gamma_ccdf_log|inv_gamma_cdf|inv_gamma_cdf_log|inv_gamma_log|inv_gamma_rng|inv_logit|inv_phi|inv_sqrt|inv_square|inv_wishart_log|inv_wishart_rng|inverse|inverse_spd|is_inf|is_nan|lbeta|lgamma|lkj_corr_cholesky_log|lkj_corr_cholesky_rng|lkj_corr_log|lkj_corr_rng|lmgamma|log|log10|log1m|log1m_exp|log1m_inv_logit|log1p|log1p_exp|log2|log_determinant|log_diff_exp|log_falling_factorial|log_inv_logit|log_mix|log_rising_factorial|log_softmax|log_sum_exp|logistic_ccdf_log|logistic_cdf|logistic_cdf_log|logistic_log|logistic_rng|logit|lognormal_ccdf_log|lognormal_cdf|lognormal_cdf_log|lognormal_log|lognormal_rng|machine_precision|max|mdivide_left_tri_low|mdivide_right_tri_low|mean|min|modified_bessel_first_kind|modified_bessel_second_kind|multi_gp_cholesky_log|multi_gp_log|multi_normal_cholesky_log|multi_normal_cholesky_rng|multi_normal_log|multi_normal_prec_log|multi_normal_rng|multi_student_t_log|multi_student_t_rng|multinomial_log|multinomial_rng|multiply_log|multiply_lower_tri_self_transpose|neg_binomial_2_ccdf_log|neg_binomial_2_cdf|neg_binomial_2_cdf_log|neg_binomial_2_log|neg_binomial_2_log_log|neg_binomial_2_log_rng|neg_binomial_2_rng|neg_binomial_ccdf_log|neg_binomial_cdf|neg_binomial_cdf_log|neg_binomial_log|neg_binomial_rng|negative_infinity|normal_ccdf_log|normal_cdf|normal_cdf_log|normal_log|normal_rng|not_a_number|num_elements|ordered_logistic_log|ordered_logistic_rng|owens_t|pareto_ccdf_log|pareto_cdf|pareto_cdf_log|pareto_log|pareto_rng|pareto_type_2_ccdf_log|pareto_type_2_cdf|pareto_type_2_cdf_log|pareto_type_2_log|pareto_type_2_rng|pi|poisson_ccdf_log|poisson_cdf|poisson_cdf_log|poisson_log|poisson_log_log|poisson_log_rng|poisson_rng|positive_infinity|pow|prod|qr_Q|qr_R|quad_form|quad_form_diag|quad_form_sym|rank|rayleigh_ccdf_log|rayleigh_cdf|rayleigh_cdf_log|rayleigh_log|rayleigh_rng|rep_array|rep_matrix|rep_row_vector|rep_vector|rising_factorial|round|row|rows|rows_dot_product|rows_dot_self|scaled_inv_chi_square_ccdf_log|scaled_inv_chi_square_cdf|scaled_inv_chi_square_cdf_log|scaled_inv_chi_square_log|scaled_inv_chi_square_rng|sd|segment|sin|singular_values|sinh|size|skew_normal_ccdf_log|skew_normal_cdf|skew_normal_cdf_log|skew_normal_log|skew_normal_rng|softmax|sort_asc|sort_desc|sort_indices_asc|sort_indices_desc|sqrt|sqrt2|square|squared_distance|step|student_t_ccdf_log|student_t_cdf|student_t_cdf_log|student_t_log|student_t_rng|sub_col|sub_row|sum|tail|tan|tanh|tcrossprod|tgamma|to_array_1d|to_array_2d|to_matrix|to_row_vector|to_vector|trace|trace_gen_quad_form|trace_quad_form|trigamma|trunc|uniform_ccdf_log|uniform_cdf|uniform_cdf_log|uniform_log|uniform_rng|variance|von_mises_log|von_mises_rng|weibull_ccdf_log|weibull_cdf|weibull_cdf_log|weibull_log|weibull_rng|wiener_log|wishart_log|wishart_rng)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "function",
            b: "(?:bernoulli|bernoulli_logit|beta|beta_binomial|binomial|binomial_logit|categorical|categorical_logit|cauchy|chi_square|dirichlet|double_exponential|exp_mod_normal|exponential|frechet|gamma|gaussian_dlm_obs|gumbel|hypergeometric|inv_chi_square|inv_gamma|inv_wishart|lkj_corr|lkj_corr_cholesky|logistic|lognormal|multi_gp|multi_gp_cholesky|multi_normal|multi_normal_cholesky|multi_normal_prec|multi_student_t|multinomial|neg_binomial|neg_binomial_2|neg_binomial_2_log|normal|ordered_logistic|pareto|pareto_type_2|poisson|poisson_log|rayleigh|scaled_inv_chi_square|skew_normal|student_t|uniform|von_mises|weibull|wiener|wishart)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "keyword",
            b: "(?:for|in|while|if|then|else|return|lower|upper|print|increment_log_prob|integrate_ode|reject)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 10
        }, {
            cN: "keyword",
            b: "(?:int|real|vector|simplex|unit_vector|ordered|positive_ordered|row_vector|matrix|cholesky_factor_cov|cholesky_factor_corr|corr_matrix|cov_matrix|void)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 5
        }, {
            cN: "keyword",
            b: "(?:functions|data|transformed\\s+data|parameters|transformed\\s+parameters|model|generated\\s+quantities)\\b",
            e: hljs.IMMEDIATE_RE,
            r: 5
        }]
    }
};
hljs.LANGUAGES.xml = function() {
    var b = "[A-Za-z0-9\\._:-]+";
    var a = {
        eW: true,
        c: [{
            cN: "attribute",
            b: b,
            r: 0
        }, {
            b: '="',
            rB: true,
            e: '"',
            c: [{
                cN: "value",
                b: '"',
                eW: true
            }]
        }, {
            b: "='",
            rB: true,
            e: "'",
            c: [{
                cN: "value",
                b: "'",
                eW: true
            }]
        }, {
            b: "=",
            c: [{
                cN: "value",
                b: "[^\\s/>]+"
            }]
        }]
    };
    return {
        cI: true,
        dM: {
            c: [{
                cN: "pi",
                b: "<\\?",
                e: "\\?>",
                r: 10
            }, {
                cN: "doctype",
                b: "<!DOCTYPE",
                e: ">",
                r: 10,
                c: [{
                    b: "\\[",
                    e: "\\]"
                }]
            }, {
                cN: "comment",
                b: "<!--",
                e: "-->",
                r: 10
            }, {
                cN: "cdata",
                b: "<\\!\\[CDATA\\[",
                e: "\\]\\]>",
                r: 10
            }, {
                cN: "tag",
                b: "<style(?=\\s|>|$)",
                e: ">",
                k: {
                    title: {
                        style: 1
                    }
                },
                c: [a],
                starts: {
                    cN: "css",
                    e: "</style>",
                    rE: true,
                    sL: "css"
                }
            }, {
                cN: "tag",
                b: "<script(?=\\s|>|$)",
                e: ">",
                k: {
                    title: {
                        script: 1
                    }
                },
                c: [a],
                starts: {
                    cN: "javascript",
                    e: "<\/script>",
                    rE: true,
                    sL: "javascript"
                }
            }, {
                cN: "vbscript",
                b: "<%",
                e: "%>",
                sL: "vbscript"
            }, {
                cN: "tag",
                b: "</?",
                e: "/?>",
                c: [{
                    cN: "title",
                    b: "[^ />]+"
                }, a]
            }]
        }
    }
}();
hljs.initHighlightingOnLoad();

