(() => {
  const storageKey = 'website-theme';
  const availableThemes = new Set(['gothic', 'forest']);
  const pickers = document.querySelectorAll('[data-theme-picker]');
  let activeTheme = 'gothic';

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (availableThemes.has(savedTheme)) {
      activeTheme = savedTheme;
    }
  } catch {
    // The site still works with the default theme if storage is unavailable.
  }

  const applyTheme = (theme) => {
    if (!availableThemes.has(theme)) return;

    activeTheme = theme;
    document.documentElement.dataset.theme = activeTheme;
    pickers.forEach((picker) => {
      picker.value = activeTheme;
    });

    try {
      localStorage.setItem(storageKey, activeTheme);
    } catch {
      // Keep the selection for this page even if it cannot be persisted.
    }
  };

  document.documentElement.dataset.theme = activeTheme;
  pickers.forEach((picker) => {
    picker.value = activeTheme;
    picker.addEventListener('change', () => applyTheme(picker.value));
  });
})();