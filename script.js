(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================
     Navigation
     ====================================================================== */
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var links = Array.prototype.slice.call(navLinks.querySelectorAll("a"));

  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navLinks.classList.toggle("is-open", open);
  }

  navToggle.addEventListener("click", function () {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      navToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) setMenu(false);
  });

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Highlight the nav link for the section in view */
  var sections = links
    .map(function (l) { return document.getElementById(l.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (l) {
      var match = l.getAttribute("href") === "#" + id;
      l.classList.toggle("is-active", match);
      if (match) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });

    var hero = document.getElementById("hero");
    if (hero) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setActive("");
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 }).observe(hero);
    }
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ======================================================================
     Helpers
     ====================================================================== */
  var TAU = Math.PI * 2;

  // Run a draw(t) loop only while `el` is on screen. One static frame
  // is drawn for reduced-motion users and before the loop starts.
  function animateWhenVisible(el, draw) {
    var raf = null;
    var running = false;
    var start = performance.now();

    function frame(now) {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    }

    draw(1.2); // static first frame, so nothing is ever blank

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.15 }).observe(el);
  }

  function pathFromPoints(pts) {
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      d += " L" + pts[i][0].toFixed(1) + " " + pts[i][1].toFixed(1);
    }
    return d;
  }

  /* ======================================================================
     1) Smart Metering: three-phase supply, phases 120 degrees apart
     ====================================================================== */
  (function threePhase() {
    var a = document.querySelector(".phase-a");
    var b = document.querySelector(".phase-b");
    var c = document.querySelector(".phase-c");
    if (!a || !b || !c) return;

    var W = 320, MID = 60, AMP = 34, CYCLES = 2.5, STEP = 4;
    var wrap = a.closest("figure");

    function wave(t, offset) {
      var pts = [];
      for (var x = 0; x <= W; x += STEP) {
        var phase = (x / W) * CYCLES * TAU - t * 2.4 + offset;
        pts.push([x, MID - AMP * Math.sin(phase)]);
      }
      return pathFromPoints(pts);
    }

    animateWhenVisible(wrap, function (t) {
      a.setAttribute("d", wave(t, 0));
      b.setAttribute("d", wave(t, -TAU / 3));
      c.setAttribute("d", wave(t, -2 * TAU / 3));
    });
  })();

  /* ======================================================================
     2) ML & Signal Processing: noisy input -> bandpass filter -> clean output
     ====================================================================== */
  (function bandpass() {
    var noisy = document.querySelector(".sig-noisy");
    var clean = document.querySelector(".sig-clean");
    if (!noisy || !clean) return;

    var W = 320, MID = 60, STEP = 3;
    var BOX_L = 132, BOX_R = 188;
    var wrap = noisy.closest("figure");

    // Deterministic pseudo-noise so the input looks messy but stable
    function noise(x, t) {
      return (
        Math.sin(x * 0.9 + t * 7.0) * 9 +
        Math.sin(x * 2.3 - t * 11.0) * 6 +
        Math.sin(x * 4.1 + t * 5.0) * 4
      );
    }

    function signal(x, t) {
      return Math.sin((x / W) * 3 * TAU - t * 2.2) * 26;
    }

    animateWhenVisible(wrap, function (t) {
      var np = [], cp = [];
      for (var x = 0; x <= BOX_L; x += STEP) {
        np.push([x, MID - (signal(x, t) + noise(x, t))]);
      }
      for (var x2 = BOX_R; x2 <= W; x2 += STEP) {
        cp.push([x2, MID - signal(x2, t)]);
      }
      noisy.setAttribute("d", pathFromPoints(np));
      clean.setAttribute("d", pathFromPoints(cp));
    });
  })();

  /* ======================================================================
     3) Neuromorphic VLSI: spikes propagating layer to layer
     ====================================================================== */
  (function spikes() {
    var q = function (s) { return document.querySelector(s); };
    var layers = [
      [q(".n-in1"), q(".n-in2"), q(".n-in3")],
      [q(".n-h1"), q(".n-h2"), q(".n-h3")],
      [q(".n-o1"), q(".n-o2")],
      [q(".n-out")]
    ];
    if (!layers[0][0]) return;
    var wrap = layers[0][0].closest("figure");

    var PERIOD = 2.4;     // seconds per full spike wave
    var LAYER_DELAY = 0.34;
    var FLASH = 0.28;

    animateWhenVisible(wrap, function (t) {
      var cycle = t % PERIOD;
      var wave = Math.floor(t / PERIOD);

      layers.forEach(function (layer, li) {
        var since = cycle - li * LAYER_DELAY;
        layer.forEach(function (n, ni) {
          // Which neurons in a layer fire varies wave to wave, like real spiking
          var fires = ((wave * 7 + li * 3 + ni * 5) % 3) !== 0 || li === 3;
          var on = fires && since >= 0 && since < FLASH;
          n.classList.toggle("is-firing", on);
        });
      });
    });

    // Static frame for reduced-motion: light one representative path
    if (reduceMotion) {
      [layers[0][1], layers[1][1], layers[2][0], layers[3][0]].forEach(function (n) {
        n.classList.add("is-firing");
      });
    }
  })();

  /* ======================================================================
     4) Ball Balancing Table: a real PD control loop
     A ball on a tilting plate. Gravity accelerates it; a PD controller
     tilts the plate to return it to centre. Occasional "disturbances"
     kick the ball so the correction is visible.
     ====================================================================== */
  (function ballBalance() {
    var group = document.querySelector(".bb-plate-group");
    var ball = document.querySelector(".bb-ball");
    if (!group || !ball) return;
    var wrap = group.closest("figure");

    var PIVOT_X = 160, PIVOT_Y = 92;
    var HALF = 100;               // half plate length (svg units)
    var MAX_TILT = 0.22;          // radians (~12.6 deg) plate travel limit
    var G = 340;                  // how strongly tilt accelerates the ball
    var KP = 0.026, KD = 0.02;    // PD gains: position error dominates, lightly damped
    var FRICTION = 0.4;
    var SERVO_LAG = 16;           // how quickly the plate follows the command
    var KICK = 80, KICK_EVERY = 3.6;

    var pos = -62, vel = 0, tilt = 0, last = null, clock = 0, nextKick = 1.2;

    function step(dt) {
      // Periodic disturbance (a "nudge"), so the correction is visible
      if (clock > nextKick) {
        var dir = Math.sin(clock * 12.9898) > 0 ? 1 : -1;
        vel += dir * KICK;
        nextKick = clock + KICK_EVERY;
      }

      // PD controller: desired tilt opposes position error and velocity
      var target = -(KP * pos + KD * vel);
      target = Math.max(-MAX_TILT, Math.min(MAX_TILT, target));

      // Plate follows the command smoothly (like a servo with finite speed)
      tilt += (target - tilt) * Math.min(1, dt * SERVO_LAG);

      // Ball dynamics on an inclined plane
      var acc = G * Math.sin(tilt) - vel * FRICTION;
      vel += acc * dt;
      pos += vel * dt;

      // Soft end stops
      var limit = HALF - 14; // 86: matches the simulation
      if (pos > limit)  { pos = limit;  vel *= -0.25; }
      if (pos < -limit) { pos = -limit; vel *= -0.25; }
    }

    function render() {
      var deg = (tilt * 180) / Math.PI;
      group.setAttribute("transform", "rotate(" + deg.toFixed(2) + " " + PIVOT_X + " " + PIVOT_Y + ")");
      // Ball shares the plate's rotating frame, so it always rests on the surface
      ball.setAttribute("cx", (PIVOT_X + pos).toFixed(2));
      ball.setAttribute("cy", "76");
    }

    // Static, balanced first frame (also the reduced-motion frame)
    pos = 0; tilt = 0;
    render();
    pos = -62;
    if (reduceMotion || !("IntersectionObserver" in window)) { pos = 0; render(); return; }

    var raf = null, running = false;
    function frame(now) {
      if (last === null) last = now;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;
      step(dt);
      render();
      raf = requestAnimationFrame(frame);
    }

    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (visible && !running) {
        running = true; last = null;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.15 }).observe(wrap);
  })();

  /* ======================================================================
     Experience: signal line draws down as you scroll, lighting each node
     ====================================================================== */
  (function timeline() {
    var list = document.querySelector(".timeline");
    if (!list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll(".timeline-item"));

    var rail = document.createElement("span");
    rail.className = "timeline-rail";
    rail.setAttribute("aria-hidden", "true");
    list.insertBefore(rail, list.firstChild);

    function update() {
      var rect = list.getBoundingClientRect();
      var vh = window.innerHeight;
      var focus = vh * 0.6; // the "read line"
      var progress = (focus - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      list.style.setProperty("--rail-progress", reduceMotion ? 1 : progress.toFixed(3));

      items.forEach(function (item) {
        var r = item.getBoundingClientRect();
        item.classList.toggle("is-lit", reduceMotion || r.top < focus);
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ======================================================================
     Skills: bars fill when scrolled into view
     ====================================================================== */
  (function skills() {
    var tiles = document.querySelectorAll(".skill-tile");
    if (!tiles.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      tiles.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    tiles.forEach(function (t) { io.observe(t); });
  })();
})();
