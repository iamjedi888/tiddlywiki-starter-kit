/*\
title: $:/plugins/tiddlywiki/markdown/markdown-it-abbr.js
type: application/javascript
module-type: library
hide-body: yes

\*/
/*! markdown-it-abbr 1.0.4 https://github.com//markdown-it/markdown-it-abbr @license MIT */
!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = e();
  else if ('function' == typeof define && define.amd) define([], e);
  else {
    var n;
    (n =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this),
      (n.markdownitAbbr = e());
  }
})(function () {
  return (function e(n, t, r) {
    function i(a, s) {
      if (!t[a]) {
        if (!n[a]) {
          var f = 'function' == typeof require && require;
          if (!s && f) return f(a, !0);
          if (o) return o(a, !0);
          var u = new Error("Cannot find module '" + a + "'");
          throw ((u.code = 'MODULE_NOT_FOUND'), u);
        }
        var c = (t[a] = { exports: {} });
        n[a][0].call(
          c.exports,
          function (e) {
            var t = n[a][1][e];
            return i(t ? t : e);
          },
          c,
          c.exports,
          e,
          n,
          t,
          r,
        );
      }
      return t[a].exports;
    }
    for (
      var o = 'function' == typeof require && require, a = 0;
      a < r.length;
      a++
    )
      i(r[a]);
    return i;
  })(
    {
      1: [
        function (e, n, t) {
          'use strict';
          n.exports = function (e) {
            function n(e, n, t, r) {
              var i,
                o,
                a,
                s,
                f,
                u = e.bMarks[n] + e.tShift[n],
                c = e.eMarks[n];
              if (u + 2 >= c) return !1;
              if (42 !== e.src.charCodeAt(u++)) return !1;
              if (91 !== e.src.charCodeAt(u++)) return !1;
              for (s = u; u < c; u++) {
                if (((a = e.src.charCodeAt(u)), 91 === a)) return !1;
                if (93 === a) {
                  f = u;
                  break;
                }
                92 === a && u++;
              }
              return (
                !(f < 0 || 58 !== e.src.charCodeAt(f + 1)) &&
                (!!r ||
                  ((i = e.src.slice(s, f).replace(/\\(.)/g, '$1')),
                  (o = e.src.slice(f + 2, c).trim()),
                  0 !== i.length &&
                    0 !== o.length &&
                    (e.env.abbreviations || (e.env.abbreviations = {}),
                    'undefined' == typeof e.env.abbreviations[':' + i] &&
                      (e.env.abbreviations[':' + i] = o),
                    (e.line = n + 1),
                    !0)))
              );
            }
            function t(e) {
              var n,
                t,
                f,
                u,
                c,
                l,
                b,
                p,
                d,
                h,
                v,
                g,
                x,
                y = e.tokens;
              if (e.env.abbreviations)
                for (
                  g = new RegExp(
                    '(?:' +
                      Object.keys(e.env.abbreviations)
                        .map(function (e) {
                          return e.substr(1);
                        })
                        .sort(function (e, n) {
                          return n.length - e.length;
                        })
                        .map(r)
                        .join('|') +
                      ')',
                  ),
                    v =
                      '(^|' +
                      a +
                      '|' +
                      s +
                      '|[' +
                      o.split('').map(r).join('') +
                      '])(' +
                      Object.keys(e.env.abbreviations)
                        .map(function (e) {
                          return e.substr(1);
                        })
                        .sort(function (e, n) {
                          return n.length - e.length;
                        })
                        .map(r)
                        .join('|') +
                      ')($|' +
                      a +
                      '|' +
                      s +
                      '|[' +
                      o.split('').map(r).join('') +
                      '])',
                    d = new RegExp(v, 'g'),
                    t = 0,
                    f = y.length;
                  t < f;
                  t++
                )
                  if ('inline' === y[t].type)
                    for (u = y[t].children, n = u.length - 1; n >= 0; n--)
                      if (
                        ((x = u[n]),
                        'text' === x.type &&
                          ((p = 0),
                          (l = x.content),
                          (d.lastIndex = 0),
                          (b = []),
                          g.test(l)))
                      ) {
                        for (; (h = d.exec(l)); )
                          (h.index > 0 || h[1].length > 0) &&
                            ((c = new e.Token('text', '', 0)),
                            (c.content = l.slice(p, h.index + h[1].length)),
                            b.push(c)),
                            (c = new e.Token('abbr_open', 'abbr', 1)),
                            (c.attrs = [
                              ['title', e.env.abbreviations[':' + h[2]]],
                            ]),
                            b.push(c),
                            (c = new e.Token('text', '', 0)),
                            (c.content = h[2]),
                            b.push(c),
                            (c = new e.Token('abbr_close', 'abbr', -1)),
                            b.push(c),
                            (d.lastIndex -= h[3].length),
                            (p = d.lastIndex);
                        b.length &&
                          (p < l.length &&
                            ((c = new e.Token('text', '', 0)),
                            (c.content = l.slice(p)),
                            b.push(c)),
                          (y[t].children = u = i(u, n, b)));
                        // Set cursor pointer to help for each abbr element
                        u.forEach(token => {
                          if (token.type === 'abbr_open') {
                            token.attrPush(['style', 'cursor: help']);
                          }
                        });
                      }
            }
            var r = e.utils.escapeRE,
              i = e.utils.arrayReplaceAt,
              o = ' \r\n$+<=>^`|~',
              a = e.utils.lib.ucmicro.P.source,
              s = e.utils.lib.ucmicro.Z.source;
            e.block.ruler.before('reference', 'abbr_def', n, {
              alt: ['paragraph', 'reference'],
            }),
              e.core.ruler.after('linkify', 'abbr_replace', t);
          };
        },
        {},
      ],
    },
    {},
    [1],
  )(1);
});