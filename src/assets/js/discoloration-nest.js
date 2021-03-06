! function () {
  function o(w, v, i) {
    return w.getAttribute(v) || i
  }

  function j(i) {
    return document.getElementsByTagName(i)
  }

  function SetLine() {
    var i = j("script"),
      w = i.length,
      v = i[w - 1];
    return {
      l: w,
      z: o(v, "zIndex", -1),
      o: o(v, "opacity", 0.5),
      c: o(v, "color", colorRandom()),
      n: o(v, "count", 99)
    }
  }

  function colorRandom() {
    var
      r = Math.round(Math.random() * 255),
      g = Math.round(Math.random() * 255),
      b = Math.round(Math.random() * 55)+200,
      color = `${r},${g},${b}`;
    return color
  }

  function colorCycle(x) {
    var
      r = (x.split(',')[0] * 1 + colorCycleFlag[0] * 7),
      g = (x.split(',')[1] * 1 + colorCycleFlag[1] * 7),
      b = x.split(',')[2];
    if (r > 255 || r < 0) {
      r = (510 - r) % 510;
      colorCycleFlag[0] = -colorCycleFlag[0];
    }
    if (g > 255 || g < 0) {
      g = (510 - g) % 510;
      colorCycleFlag[1] = -colorCycleFlag[1];
    }
    return `${r},${g},${b}`
  }

  function size_change() {
    r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  function b() {
    e.clearRect(0, 0, r, n);
    var w = [f].concat(t);
    var x, v, A, B, z, y;
    t.forEach(function (i) {
      i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
      for (v = 0; v < w.length; v++) {
        x = w[v];
        if (i !== x && null !== x.x && null !== x.y) {
          B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
          y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z),
            A = (x.max - y) / x.max,
            e.beginPath(),
            e.lineWidth = A ,
            e.strokeStyle = "rgba(" + s.c + "," + (A * 100) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
        }
      }
      w.splice(w.indexOf(i), 1)
    }), m(b)
  }


  var u = document.createElement("canvas"),
    s = SetLine(),
    c = "c_n" + s.l,
    e = u.getContext("2d"),
    r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
      window.setTimeout(i, 1000 / 45)
    },
    a = Math.random,
    f = {
      x: null,
      y: null,
      max: 20000
    };
  var colorCycleFlag = [1, -1]
  window.s = s;

  u.id = c;
  u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
  j("body")[0].appendChild(u);
  size_change(),
    window.onresize = size_change;


  window.onmousemove = function (i) {
    i = i || window.event, f.x = i.clientX, f.y = i.clientY
  }, 
  window.onmouseout = function () {
    f.x = null, f.y = null
  };


  for (var t = [], p = 0; s.n > p; p++) {
    var h = a() * r,
      g = a() * n, //初始范围
      q = 2 * a() - 1, //x轴速度
      d = 2 * a() - 1; //y轴速度
    t.push({
      x: h,
      y: g,
      xa: q,
      ya: d,
      max: 6000
    })
  }

  setTimeout(function () {
    b()
  }, 100)

  setInterval(function () {
    s.c = colorCycle(s.c)
  }, 100)
}();