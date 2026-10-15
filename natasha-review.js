(() => {
  'use strict';
  const button = document.querySelector('.audio-toggle');
  const audio = document.getElementById('page-audio');
  if (!button || !audio) return;
  audio.volume = 0.46;
  const sync = () => {
    const playing = !audio.paused;
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    button.title = playing ? 'Pause music' : 'Play music';
  };
  button.addEventListener('click', async () => {
    if (button.disabled) return;
    if (!audio.paused) { audio.pause(); return; }
    button.disabled = true;
    try { await audio.play(); }
    catch (_) { button.title = 'Music could not start. Select to try again.'; }
    finally { button.disabled = false; sync(); }
  });
  ['play', 'pause', 'ended'].forEach(event => audio.addEventListener(event, sync));
  sync();
})();
