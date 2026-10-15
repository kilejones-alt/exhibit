(() => {
  const video=document.getElementById('entrance-video');
  const button=document.querySelector('.film-toggle');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sync=()=>{button.setAttribute('aria-label',video.paused?'Play video':'Pause video');button.setAttribute('aria-pressed',String(video.paused));};
  video.addEventListener('play',sync);video.addEventListener('pause',sync);
  button.addEventListener('click',()=>{if(video.paused) video.play().catch(sync);else video.pause();});
  if(reduced){video.autoplay=false;video.pause();}else video.play().catch(sync);
  sync();
})();
