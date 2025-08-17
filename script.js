(function () {
  const root = document.documentElement;

  // Boutons / éléments
  const desktopBtn = document.getElementById("theme-toggle");
  const desktopLabel = document.getElementById("theme-label");
  const mobileBtn = document.getElementById("theme-toggle-mobile");
  const mobileLightIcon = document.getElementById("theme-toggle-light-icon-mobile");
  const mobileDarkIcon  = document.getElementById("theme-toggle-dark-icon-mobile");

  // Applique le thème + synchro UI + ARIA
  function setTheme(dark) {
    root.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
    if (desktopBtn) desktopBtn.setAttribute("aria-pressed", String(dark));

    if (desktopLabel) {
      desktopLabel.textContent = dark ? "☀️ Mode jour" : "🌙 Mode nuit";
    }
    if (mobileLightIcon && mobileDarkIcon) {
      mobileLightIcon.style.display = dark ? "none" : "inline-block";
      mobileDarkIcon.style.display  = dark ? "inline-block" : "none";
    }
  }

  // Init: priorité à localStorage, sinon préférence système
  const saved = (() => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  })();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialDark = saved ? saved === "dark" : prefersDark;
  setTheme(initialDark);

  // Toggle commun
  function toggleTheme(e) {
    if (e) e.preventDefault();
    const next = !root.classList.contains("dark");
    setTheme(next);
  }

  // Clic desktop & mobile
  if (desktopBtn) desktopBtn.addEventListener("click", toggleTheme);
  if (mobileBtn)  mobileBtn.addEventListener("click", toggleTheme);

  // (Optionnel) si l’utilisateur change le thème système, on ne casse pas son choix enregistré
  // Décommente si tu veux suivre le système seulement quand aucun choix n’a été sauvegardé.
  /*
  if (!saved) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      setTheme(e.matches);
    });
  }
  */
})();
