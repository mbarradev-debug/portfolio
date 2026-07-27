(function () {
  var root = document.documentElement;
  var STORAGE_KEY = 'theme';

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  applyTheme(stored || (systemPrefersDark() ? 'dark' : 'light'));

  var themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  if (!stored && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  function setMenuOpen(open) {
    mobileMenu.classList.toggle('open', open);
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }
  menuToggle.addEventListener('click', function () {
    setMenuOpen(!mobileMenu.classList.contains('open'));
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenuOpen(false); });
  });

  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach(function (el) { io.observe(el); });

  document.getElementById('year').textContent = new Date().getFullYear();

  requestAnimationFrame(function () {
    document.querySelector('.article').classList.add('loaded');
  });
})();
