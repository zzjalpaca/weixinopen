"use strict";

function init() {
    var e = require("glob"),
        r = require("fs"),
        n = require("path"),
        t = require("../../common/log/log.js");
    _exports = function(f, u, i) {
        var c = 0,
            o = 1,
            a = 2,
            B = 3,
            w = 4,
            l = [new Buffer(1), new Buffer(4), new Buffer(4), new Buffer(4), new Buffer(1)];
        l[c].writeIntLE(190), l[o].writeInt32BE(1), l[w].writeIntLE(237);
        var s = 0,
            v = [],
            h = [],
            g = [],
            p = [],
            E = [];
        e(f + "/**", { nodir: !0 }, function(e, c) {
            e ? t.error(e) : ! function() {
                s = c.length, c.forEach(function(e) {
                    var t = r.readFileSync(e),
                        u = n.relative(f, e),
                        i = new Buffer("/" + u.replace(/\\/g, "/"));
                    g.push(i), p.push(t)
                });
                var e = 18 + 12 * s + Buffer.concat(g).length;
                h = g.map(function(r, n) {
                    var t = new Buffer(4);
                    t.writeInt32BE(r.length);
                    var f = new Buffer(4),
                        u = p[n].length,
                        i = e;
                    f.writeInt32BE(i), e += u;
                    var c = new Buffer(4);
                    return c.writeInt32BE(u), Buffer.concat([t, r, f, c])
                });
                var o = new Buffer(4);
                o.writeInt32BE(s), h.unshift(o), v = Buffer.concat(h), E = Buffer.concat(p), l[a].writeInt32BE(v.length), l[B].writeInt32BE(E.length), l = Buffer.concat(l);
                var w = Buffer.concat([l, v, E]);
                r.writeFileSync(u, w), t.info("pack.js create " + u + " success!"), i(null, u)
            }()
        })
    }
}
var _exports;
init(), module.exports = _exports;
