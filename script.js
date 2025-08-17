(function () {
  const root = document.documentElement;
  const desktopBtn = document.getElementById("theme-toggle");
  const desktopLabel = document.getElementById("theme-label");
  const mobileBtn = document.getElementById("theme-toggle-mobile");
  const mobileLightIcon = document.getElementById("theme-toggle-light-icon-mobile");
  const mobileDarkIcon = document.getElementById("theme-toggle-dark-icon-mobile");

  // --- Fonction pour appliquer le thème ---
  function setTheme(dark) {
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");

    // Desktop label
    if (desktopLabel) {
      desktopLabel.textContent = dark ? "☀️ Mode jour" : "🌙 Mode nuit";
    }

    // Mobile icons
    if (mobileLightIcon && mobileDarkIcon) {
      mobileLightIcon.style.display = dark ? "none" : "inline-block";
      mobileDarkIcon.style.display = dark ? "inline-block" : "none";
    }
  }

  // --- Initialisation au chargement ---
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = saved ? saved === "dark" : prefersDark;
  setTheme(isDark);

  // --- Gestion clic bouton desktop ---
  if (desktopBtn) {
    desktopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const dark = !root.classList.contains("dark");
      setTheme(dark);
    });
  }

  // --- Gestion clic bouton mobile ---
  if (mobileBtn) {
    mobileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const dark = !root.classList.contains("dark");
      setTheme(dark);
    });
  }
})();
