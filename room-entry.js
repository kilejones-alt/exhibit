/* A shared threshold for the three gallery rooms. Plain links remain the fallback. */
(() => {
  'use strict';
  const key = 'gallery-room-arrival';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let arrival = false;
  let leaving = false;
  let navigationTimer;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
    arrival = saved?.path === location.pathname && Date.now() - saved.time < 15000;
  } catch (_) { /* Navigation works even when storage is unavailable. */ }
  const root = document.documentElement;
  if (arrival && !reduced()) root.classList.add('room-arriving');
  const clear = () => {
    root.classList.remove('room-arriving');
    document.querySelectorAll('.room-transition').forEach(node => node.remove());
    document.querySelectorAll('.era-card[aria-busy]').forEach(node => node.removeAttribute('aria-busy'));
    leaving = false;
    clearTimeout(navigationTimer);
  };
  // An interrupted animation must never leave the exhibition hidden.
  const safetyTimer = setTimeout(clear, 6500);
  addEventListener('pageshow', event => { if (event.persisted) clear(); });
  addEventListener('pagehide', () => { clearTimeout(safetyTimer); clearTimeout(navigationTimer); });

  window.galleryRoomEntry = {
    enter(card, href) {
      if (leaving) return;
      leaving = true;
      clearTimeout(safetyTimer);
      card.setAttribute('aria-busy', 'true');
      try { sessionStorage.setItem(key, JSON.stringify({path:new URL(href, location.href).pathname,time:Date.now()})); } catch (_) {}
      if (reduced()) { location.assign(href); return; }
      const image = card.querySelector('.era-image');
      const frame = card.querySelector('.era-image-wrap');
      const veil = document.createElement('div');
      veil.className = 'room-transition room-departure';
      veil.setAttribute('aria-hidden', 'true');
      document.body.append(veil);
      if (image && frame && image.naturalWidth) {
        const rect = frame.getBoundingClientRect();
        const art = document.createElement('div');
        art.className = 'room-flight-art';
        Object.assign(art.style, {left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
        const clone = document.createElement('img');
        clone.src = image.currentSrc || image.src;
        clone.alt = '';
        // Match the visible hover state before the artwork leaves its doorway.
        const imageStyle = getComputedStyle(image);
        clone.style.scale = imageStyle.scale;
        clone.style.objectFit = imageStyle.objectFit;
        clone.style.objectPosition = imageStyle.objectPosition;
        art.style.filter = getComputedStyle(frame).filter;
        art.append(clone);
        veil.append(art);
        const scale = Math.max(innerWidth / rect.width, innerHeight / rect.height) * 1.04;
        art.animate([
          {transform:'translate(0,0) scale(1)',opacity:1},
          {transform:`translate(${innerWidth/2-rect.left-rect.width/2}px,${innerHeight/2-rect.top-rect.height/2}px) scale(${scale})`,opacity:0}
        ], {duration:1700,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
      }
      veil.animate([{backgroundColor:'rgba(0,0,0,0)'},{backgroundColor:'#000000'}], {duration:1500,fill:'forwards'});
      navigationTimer = setTimeout(() => location.assign(href), 1730);
    }
  };

  addEventListener('DOMContentLoaded', () => {
    if (!arrival || reduced()) { root.classList.remove('room-arriving'); return; }
    const heading = document.querySelector('h1');
    const title = document.createElement('div');
    title.className = 'room-transition room-arrival';
    title.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'room-arrival-title';
    const arrivalTitle = () => document.body.getAttribute(`data-room-title-${document.documentElement.lang || 'en'}`) || document.body.getAttribute('data-room-title-en') || heading?.textContent.trim() || '';
    label.textContent = arrivalTitle();
    requestAnimationFrame(() => { label.textContent = arrivalTitle(); });
    title.append(label);
    document.body.append(title);
    root.classList.remove('room-arriving');
    scrollTo(0, 0);
    label.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}], {duration:650,fill:'forwards',easing:'ease-out'});
    title.animate([{opacity:1},{opacity:0}], {delay:1850,duration:1300,fill:'forwards'}).finished.then(() => {
      title.remove();
      clearTimeout(safetyTimer);
      if (heading && document.activeElement === document.body) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({preventScroll:true});
      }
    }).catch(clear);
  }, {once:true});
})();
