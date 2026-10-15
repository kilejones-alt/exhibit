(() => {
  const sources = document.body.dataset.page === 'home' ? ['homepage-video.mp4'] : document.body.dataset.page === 'antizionism' ? ['antizionism-film.mp4'] : [];
  let applying = false;
  function fixHomeNav(){
    if(document.body.dataset.page === 'home') document.querySelectorAll('.era-nav').forEach(n => n.remove());
  }
  function fixVideo(){
    const video = document.querySelector('.home-video video');
    if(!video || video.dataset.v17VideoFixed === '1') return;
    video.dataset.v17VideoFixed = '1';
    const section = video.closest('.home-video');
    let i = 0;
    const reveal = () => { if(section) section.hidden = false; video.play().catch(()=>{}); };
    const next = () => {
      if(i >= sources.length) return;
      const src = sources[i++];
      if(video.getAttribute('src') !== src){ video.src = src; video.load(); }
    };
    video.addEventListener('loadeddata', reveal, {once:true});
    video.addEventListener('canplay', reveal, {once:true});
    video.addEventListener('error', next);
    if(video.readyState >= 2) reveal(); else next();
  }
  function fixLibelIds(){
    const map = {colonialism:'colonialism', 'apartheid and racism libels':'apartheid', genocide:'genocide'};
    document.querySelectorAll('.libel-section').forEach(section => {
      const h = section.querySelector('h2');
      const key = (h?.textContent || '').trim().toLowerCase();
      if(map[key]) section.id = map[key];
    });
  }
  let hashDone = false;
  function scrollToHash(){
    if(hashDone || !location.hash) return;
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(t){ hashDone = true; setTimeout(() => t.scrollIntoView({block:'start'}), 60); }
  }
  function forceVisible(){
    document.querySelectorAll('.home-pill,.walk-frame,.era-frame').forEach(n => n.classList.add('visible'));
  }
  function apply(){
    if(applying) return;
    applying = true;
    requestAnimationFrame(() => { fixHomeNav(); fixVideo(); fixLibelIds(); scrollToHash(); forceVisible(); applying = false; });
  }
  apply();
  setTimeout(apply, 150);
  new MutationObserver(apply).observe(document.body, {childList:true, subtree:false});
})();