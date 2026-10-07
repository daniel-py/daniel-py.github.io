// Theme toggle — persists choice, respects system preference otherwise.
const toggle = document.getElementById('themeToggle');
const reflectTheme = (t) => toggle.setAttribute('aria-pressed', String(t === 'dark'));
reflectTheme(document.documentElement.dataset.theme);
toggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  reflectTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Reveal-on-scroll — fires once per element, skipped entirely under reduced motion.
// The hidden initial state only applies under html.js (set in the head script),
// so content stays visible if scripts never run.
if (matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
}
