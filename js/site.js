/* ==========================================================================
   Shubham Thorve — portfolio behaviour
   --------------------------------------------------------------------------
   Deliberately a classic script, not an ES module: this page has to work when
   opened straight off the filesystem (file://), where module loading and
   fetch() are both blocked by CORS. No imports, no fetch, no absolute paths,
   no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* Mark that JS is live. The reveal styles are scoped to .js, so a no-JS
     visitor — or a crawler — gets the finished page rather than a blank one. */
  root.classList.add('js');

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- reveal */
  /* Fade sections in once, then stop watching them. */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
      return;
    }

    var fired = false;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        fired = true;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    for (var j = 0; j < items.length; j++) io.observe(items[j]);

    /* Safety net for the one failure mode that actually matters: if the
       observer never fires at all, every section stays at opacity 0 and the
       page reads as blank. Only trips when nothing has revealed, so the
       normal path keeps its staggered entrance untouched. */
    window.setTimeout(function () {
      if (fired) return;
      for (var k = 0; k < items.length; k++) items[k].classList.add('is-in');
    }, 2000);
  }

  /* ------------------------------------------------------------ scroll spy */
  /* Highlight the nav link for whichever section owns the viewport. */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-links a[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      map[id] = link;
      sections.push(section);
    });
    if (!sections.length) return;

    /* Track the topmost section currently intersecting, so fast scrolls and
       short sections don't leave two links lit at once. */
    var visible = {};

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });

      var current = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { current = sections[i].id; break; }
      }

      links.forEach(function (link) { link.classList.remove('is-active'); });
      if (current && map[current]) map[current].classList.add('is-active');
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) { io.observe(section); });
  }

  /* ------------------------------------------------------------ mobile nav */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var panel  = document.getElementById('nav-links');
    if (!toggle || !panel) return;

    var label = toggle.querySelector('.nav-toggle-label');

    function setOpen(open) {
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'Close' : 'Menu';
    }

    toggle.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });

    /* Close after jumping to a section, and on Escape. */
    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Leaving the mobile breakpoint should never trap the page in the
       open-sheet state. */
    var wide = window.matchMedia('(min-width: 48.0625rem)');
    var onChange = function (event) { if (event.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener('change', onChange);
    else if (wide.addListener) wide.addListener(onChange);
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    initReveal();
    initScrollSpy();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
