/* The supplied recording is a permanent, same-origin repository asset. */
(() => {
  const wantedKey = 'galleryLacrymosaWanted';
  const positionKey = 'galleryLacrymosaPosition';
  const get = key => { try { return sessionStorage.getItem(key); } catch (_) { return null; } };
  const set = (key, value) => { try { sessionStorage.setItem(key, value); } catch (_) {} };
  let audio, button, pending = false;
  const labels = {
    en:['Music: off','Music: on','Play music'],
    he:['מוזיקה: כבויה','מוזיקה: פועלת','הפעלת מוזיקה'],
    ru:['Музыка: выкл.','Музыка: вкл.','Включить музыку']
  };
  function update() {
    if (!audio || !button) return;
    const words = labels[document.documentElement.lang] || labels.en;
    const playing = !audio.paused;
    button.textContent = '♪';
    button.setAttribute('aria-label', playing ? words[1] : words[2]);
    button.title = playing ? words[1] : words[2];
    button.setAttribute('aria-pressed', String(playing));
    button.classList.toggle('is-playing', playing);
  }
  function save() { if (audio && Number.isFinite(audio.currentTime)) set(positionKey, String(audio.currentTime)); }
  function play() {
    if (!audio || pending || !audio.paused) return;
    pending = true;
    // Call play immediately within a click, before any asynchronous work consumes activation.
    audio.play().then(() => { set(wantedKey,'1'); }).catch(() => {}).finally(() => { pending=false; update(); });
  }
  window.gallerySound = {update, save, play};
  addEventListener('DOMContentLoaded', () => {
    audio = document.getElementById('bg-audio');
    button = document.getElementById('audio-btn');
    if (!audio) return;
    audio.volume = .46;
    audio.loop = true;
    const restore = () => {
      const time = Number(get(positionKey));
      if (time > 0 && time < audio.duration) audio.currentTime = time;
    };
    if (audio.readyState >= 1) restore(); else audio.addEventListener('loadedmetadata', restore, {once:true});
    ['play','pause','ended','error'].forEach(type => audio.addEventListener(type, update));
    audio.addEventListener('timeupdate', save);
    button?.addEventListener('click', event => {
      event.stopImmediatePropagation();
      if (audio.paused) { set(wantedKey,'1'); play(); }
      else { set(wantedKey,'0'); save(); audio.pause(); }
    });
    const resumeOnInteraction = event => {
      if (event.target.closest?.('#audio-btn')) return;
      if (event.type === 'keydown' && !['Enter',' '].includes(event.key)) return;
      if (get(wantedKey) !== '0') play();
    };
    document.addEventListener('click', resumeOnInteraction, {capture:true});
    document.addEventListener('keydown', resumeOnInteraction, {capture:true});
    if (get(wantedKey) !== '0') play();
    update();
  }, {once:true});
  addEventListener('pagehide', save);
  addEventListener('pageshow', event => {
    if (event.persisted && get(wantedKey) !== '0') play();
  });
})();
