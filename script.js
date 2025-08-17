document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');

  if (!btn) {
    console.error('[theme] Bouton #theme-toggle introuvable. Vérifie l’ID dans le HTML.');
    return;
  }

  // Hardening anti-overlay
  btn.style.position = btn.style.position || 'relative';
  btn.style.zIndex = btn.style.zIndex || '9999';

  function setTheme(next) {
    const root = document.documentElement;
    if (next === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      btn.setAttribute('aria-pressed', 'true');
      if (label) label.textContent = '☀️ Mode jour';
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      btn.setAttribute('aria-pressed', 'false');
      if (label) label.textContent = '🌙 Mode nuit';
    }
  }

  // Init
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setTheme(isDark ? 'dark' : 'light');
  } catch (e) {
    console.warn('[theme] localStorage indisponible, fallback clair.', e);
    setTheme('light');
  }

  // Toggle
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nowDark = document.documentElement.classList.contains('dark');
    setTheme(nowDark ? 'light' : 'dark');
    console.log('[theme] toggled ->', nowDark ? 'light' : 'dark');
  });
});
