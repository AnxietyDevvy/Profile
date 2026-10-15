(() => {
  document.documentElement.dataset.theme = 'gothic';
  const transitionSound = new Audio('audio/scary_transition.mp3');
  transitionSound.preload = 'auto';
  transitionSound.volume = 0.45;

  const playSwitchSound = () => {
    try {
      transitionSound.pause();
      transitionSound.currentTime = 0;
      return transitionSound.play();
    } catch {
      return Promise.reject();
    }
  };

  document.querySelectorAll('a.nav-link[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (link.target && link.target !== '_self')
      ) return;

      const destination = new URL(link.href, window.location.href);
      const currentDirectory = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1);
      const destinationDirectory = destination.pathname.slice(0, destination.pathname.lastIndexOf('/') + 1);
      if (destination.pathname === window.location.pathname || currentDirectory !== destinationDirectory) return;

      event.preventDefault();
      let navigationStarted = false;
      const navigate = () => {
        if (navigationStarted) return;
        navigationStarted = true;
        window.location.assign(destination.href);
      };

      const playbackTimeout = window.setTimeout(navigate, 1200);
      playSwitchSound().then(() => {
        if (navigationStarted) return;
        window.clearTimeout(playbackTimeout);
        const duration = Number.isFinite(transitionSound.duration) ? transitionSound.duration * 1000 : 700;
        window.setTimeout(navigate, Math.min(Math.max(duration, 450), 1000));
      }).catch(() => {
        window.clearTimeout(playbackTimeout);
        navigate();
      });

    });
  });
})();