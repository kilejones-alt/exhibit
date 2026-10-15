'use strict';

/*
  STOPAZ Digital Exhibition — museum-grade production behavior
  Presentation, wayfinding, catalogue disclosure, and accessibility only.
  It intentionally does not alter the project's thesis, timeline facts, or libel taxonomy.
*/
(() => {
  const qsa = (sel, root=document) => [...root.querySelectorAll(sel)];

  const slugify = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'object';

  function uniqueId(base) {
    let id = base;
    let n = 2;
    while (document.getElementById(id)) id = `${base}-${n++}`;
    return id;
  }

  function installPermanentObjectIds() {
    const sections = qsa('.exhibition-section');
    sections.forEach((section, index) => {
      const title = section.querySelector('.art-caption-title,.info-title,h2,h3')?.textContent?.trim() || `Object ${index + 1}`;
      const date = section.querySelector('.art-caption-date,.info-meta')?.textContent?.trim() || '';
      if (!section.id) section.id = uniqueId(`object-${slugify(`${date}-${title}`)}`);
      section.dataset.museumObjectIndex = String(index + 1);

      const caption = section.querySelector('.art-caption-inline');
      if (caption && !caption.querySelector('.museum-object-link')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'museum-object-link';
        btn.textContent = 'LINK';
        btn.setAttribute('aria-label', `Copy permanent link to ${title}`);
        btn.addEventListener('click', async (event) => {
          event.stopPropagation();
          const url = new URL(location.href);
          url.hash = section.id;
          try {
            await navigator.clipboard.writeText(url.href);
            const old = btn.textContent;
            btn.textContent = ({en:'COPIED',he:'הועתק',ru:'СКОПИРОВАНО'})[document.documentElement.lang] || 'COPIED';
            setTimeout(() => { btn.textContent = old; }, 1200);
          } catch {
            location.hash = section.id;
          }
        });
        caption.appendChild(btn);
      }
    });
  }

  function classifyObjectRhythm() {
    const sections = qsa('.exhibition-section');
    sections.forEach((section, index) => {
      const img = section.querySelector('img.gallery-image');
      if (!img) return;
      const classify = () => {
        const w = Number(img.dataset.nativeWidth) || img.naturalWidth || img.width || 1;
        const h = Number(img.dataset.nativeHeight) || img.naturalHeight || img.height || 1;
        const ratio = w / h;
        section.classList.remove('museum-object-wide','museum-object-tall','museum-object-small','museum-feature-object');
        if (ratio >= 1.28) section.classList.add('museum-object-wide');
        else if (ratio <= .76) section.classList.add('museum-object-tall');
        if (w <= 650 || h <= 650 || img.classList.contains('quality-source-limited')) section.classList.add('museum-object-small');
        if (index % 5 === 0 || section.classList.contains('timeline-key')) section.classList.add('museum-feature-object');
      };
      if (img.complete) classify(); else img.addEventListener('load', classify, {once:true});
    });
  }

  function makeMotionOneWay() {
    const rooms = qsa('.exhibition-section,.genealogy-script,.chronology-interlude,.libel-marker,.era-structure-section,.naya-source-update,.home-source-context');
    if (!rooms.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rooms.forEach(room => room.classList.add('museum-seen'));
      return;
    }
    const seen = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const room = entry.target;
        /* allow the initial entrance to complete, then freeze the room in its final state */
        setTimeout(() => room.classList.add('museum-seen'), 1050);
        observer.unobserve(room);
      });
    }, {threshold:.08, rootMargin:'0px 0px -10% 0px'});
    rooms.forEach(room => seen.observe(room));
  }

  function revealUsefulProvenance() {
    qsa('.wall-archive-hidden,.history-wall-hidden').forEach(block => {
      const text = block.textContent.replace(/\s+/g,' ').trim();
      const meaningful = text.length > 35 && !/^(archive|history|source)\s*$/i.test(text);
      if (meaningful) block.classList.add('museum-provenance-visible');
    });
  }

  const catalogue = {
    '“But He Does Not Listen to the UN…”': {
      creator:'',
      setting:'Soviet anti-Israel propaganda from the late Brezhnev period. The UN reprimand places Israel inside the moral language of international institutions and human rights.',
      archive:''
    },
    '“Sew on this little piece too!”': {
      creator:'',
      setting:'Soviet anti-Zionist caricature presenting territorial expansion as a US-enabled project of constructing “Greater Israel.”',
      archive:''
    },
    '“The Israeli Extremists’ Appetite”': {
      creator:'',
      setting:'Soviet visual propaganda portraying Israeli territorial ambition as an insatiable appetite consuming surrounding Arab lands.',
      archive:''
    },
    '“The Expansionists”': {
      creator:'',
      setting:'A Soviet satirical image representing Israeli military figures as architects of a territorial “Greater Israel.”',
      archive:''
    },
    'May Day anti-Zionist display, Moscow': {
      creator:'',
      setting:'May Day demonstration, Moscow, 1972. The display visualizes “Zionism” as a monstrous transnational force and reuses older conspiracy imagery.',
      archive:''
    },
    'Zionist Colonialism in Palestine': {
      creator:'Fayez A. Sayegh, Palestinian intellectual and diplomat; published by the PLO Research Center.',
      setting:'Beirut, September 1965, during the global era of decolonization. The pamphlet became a pivotal text in the colonial framing of Zionism.',
      archive:''
    },
    'Beware: Zionism!': {
      creator:'Yuri Ivanov; published through the Soviet Communist Party political publishing apparatus.',
      setting:'Moscow, 1969, in the post-1967 Soviet anti-Zionist campaign. The book gave propaganda claims the format of political analysis.',
      archive:''
    },
    '“Israel: A Colonial-Settler State?”': {
      creator:'Maxime Rodinson, French Marxist scholar.',
      setting:'1967 essay that interpreted Zionism through the history of European colonial expansion.',
      archive:''
    },
    '“Israeli Plan”': {
      creator:'Yuri Andreevich Cherepanov.',
      setting:'1979 Soviet cartoon presenting settlements, fortifications, and displacement as instruments of a colonial advance.',
      archive:''
    },
    'Zionism = Racism': {
      creator:'Zh. (Joseph) Efimovsky; published by the Leningrad propaganda collective Combat Pencil (Боевой карандаш).',
      setting:'1976, one year after UN General Assembly Resolution 3379. The poster translates the “Zionism is racism” formula into an image of racial domination.',
      archive:''
    }
  };

  function addNayaCatalogueFields() {
    qsa('.naya-archive-card').forEach(card => {
      if (card.querySelector('.museum-catalogue-record')) return;
      const title = card.querySelector('h3')?.textContent?.trim();
      if (!title) return;
      const record = catalogue[title] || {
        creator:'',
        setting:'',
        archive:''
      };
      const objectText = card.querySelector('p:not(.naya-verification)')?.textContent?.trim() || 'See object caption above.';
      const box = document.createElement('div');
      box.className = 'museum-catalogue-record';
      box.setAttribute('aria-label','Catalogue record');
      const rows = [
        ['Object', objectText],
        ['Creator', record.creator],
        ['Historical setting', record.setting],
        ['Archive', record.archive]
      ].filter(([,value]) => value && !/working (?:catalogue|document|text)|remain|to be verified|should follow|not yet|to be completed/i.test(value));
      box.innerHTML = rows.map(([key,value]) => `<div class="museum-catalogue-row"><div class="museum-catalogue-key">${key}</div><div class="museum-catalogue-value"></div></div>`).join('');
      [...box.querySelectorAll('.museum-catalogue-value')].forEach((node,i) => node.textContent = rows[i][1]);
      card.appendChild(box);
      if (!card.id) card.id = uniqueId(`archive-${slugify(title)}`);
    });
  }

  function unifyExhibitionLayout() {
    if (!document.querySelector('#gallery')) return;
    document.body.classList.add('exhibition-uniform');
    qsa('.exhibition-section').forEach(section => {
      const caption = section.querySelector('.art-caption-inline');
      const panel = section.querySelector('.info-panel');
      if (caption && panel) panel.prepend(caption);
    });
    qsa('.naya-archive-card').forEach(card => {
      if (card.querySelector('.uniform-archive-art')) return;
      const img = card.querySelector('img');
      const record = card.querySelector('.museum-catalogue-record');
      if (!img || !record) return;
      const art = document.createElement('figure');
      art.className = 'uniform-archive-art';
      art.appendChild(img);
      const copy = document.createElement('div');
      copy.className = 'uniform-archive-copy';
      const duplicateObjectRow = record.querySelector('.museum-catalogue-row');
      const caption = card.querySelector('p:not(.naya-verification)');
      if (duplicateObjectRow?.querySelector('.museum-catalogue-value')?.textContent === caption?.textContent) {
        duplicateObjectRow.remove();
      }
      const details = document.createElement('details');
      details.className = 'uniform-archive-details';
      const summary = document.createElement('summary');
      summary.textContent = 'About this work';
      details.append(summary, record);
      while (card.firstChild) copy.appendChild(card.firstChild);
      copy.appendChild(details);
      card.append(art, copy);
    });
  }

  function collectStops() {
    const stops = [];
    const push = (node,label) => {
      if (!node || stops.some(stop => stop.node === node)) return;
      if (!node.id) node.id = uniqueId(`room-${slugify(label)}`);
      stops.push({node,label});
    };

    qsa('.exhibition-section').forEach(section => {
      const title = section.querySelector('.art-caption-title,.info-title,h2,h3')?.textContent?.trim();
      const date = section.querySelector('.art-caption-date')?.textContent?.trim();
      if (title) push(section, date ? `${date} — ${title}` : title);
    });
    qsa('.genealogy-script').forEach(section => {
      const title = section.querySelector('h2,h3')?.textContent?.trim();
      if (title) push(section,title);
    });
    qsa('.naya-archive-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.trim();
      if (title) push(card,`Archive — ${title}`);
    });
    // Follow the physical reading order, including the source essays.
    qsa('.source-antizionism-framework,.era-libel-card').forEach(section => {
      const title = section.querySelector('h2,h3')?.textContent?.trim();
      if (title) push(section,title);
    });
    stops.sort((a,b) => a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    return stops;
  }

  function installWayfinder() {
    if (document.getElementById('museum-wayfinder')) return;
    if (!document.querySelector('#gallery')) return;
    const stops = collectStops();
    if (stops.length < 3) return;

    const nav = document.createElement('nav');
    nav.id = 'museum-wayfinder';
    nav.setAttribute('aria-label','Exhibition wayfinding');
    nav.innerHTML = `
      <button class="museum-wayfinder-toggle" type="button" aria-expanded="false" aria-controls="museum-wayfinder-panel"><span class="museum-progress-dot" aria-hidden="true"></span><span class="museum-wayfinder-current">01 / ${String(stops.length).padStart(2,'0')}</span></button>
      <div class="museum-wayfinder-panel" id="museum-wayfinder-panel">
        <div class="museum-wayfinder-heading">Exhibition chronology & object index</div>
        <div class="museum-wayfinder-list"></div>
      </div>`;
    document.body.appendChild(nav);

    const toggle = nav.querySelector('.museum-wayfinder-toggle');
    const current = nav.querySelector('.museum-wayfinder-current');
    const list = nav.querySelector('.museum-wayfinder-list');
    const items = stops.map((stop,index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'museum-wayfinder-item';
      button.dataset.roomTarget = stop.node.id;
      button.innerHTML = `<span class="museum-wayfinder-number">${String(index+1).padStart(2,'0')}</span><span class="museum-wayfinder-label"></span>`;
      button.querySelector('.museum-wayfinder-label').textContent = stop.label;
      button.addEventListener('click', async () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
        // Resolve target dimensions before jumping across a long, lazily loaded exhibition.
        await document.fonts?.ready;
        await Promise.all(qsa('img',stop.node).map(img => {
          img.loading = 'eager';
          return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        }));
        stop.node.scrollIntoView({behavior:'instant', block:'start'});
        history.replaceState(null,'',`#${stop.node.id}`);
      });
      list.appendChild(button);
      return button;
    });

    const setActive = (index) => {
      items.forEach((item,i) => item.classList.toggle('is-active',i === index));
      current.textContent = `${String(index+1).padStart(2,'0')} / ${String(stops.length).padStart(2,'0')}`;
    };
    setActive(0);

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
        toggle.focus();
      }
    });

    if ('IntersectionObserver' in window) {
      const activeObserver = new IntersectionObserver(entries => {
        const candidates = entries.filter(entry => entry.isIntersecting);
        if (!candidates.length) return;
        candidates.sort((a,b) => Math.abs(a.boundingClientRect.top - innerHeight*.34) - Math.abs(b.boundingClientRect.top - innerHeight*.34));
        const idx = stops.findIndex(stop => stop.node === candidates[0].target);
        if (idx >= 0) setActive(idx);
      }, {threshold:[.01,.15,.35],rootMargin:'-20% 0px -55% 0px'});
      stops.forEach(stop => activeObserver.observe(stop.node));
    }
  }

  function labelThirdEraAsAbout() {
    /* Content is retained; this only clarifies that the transition is institutional/project information. */
    qsa('.third-era-transition').forEach(section => section.setAttribute('data-exhibition-role','about-new-york-exhibition'));
  }

  function init() {
    document.documentElement.classList.add('museum-production-pass');
    installPermanentObjectIds();
    classifyObjectRhythm();
    makeMotionOneWay();
    revealUsefulProvenance();
    addNayaCatalogueFields();
    unifyExhibitionLayout();
    labelThirdEraAsAbout();
    installWayfinder();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(init,0), {once:true});
  else setTimeout(init,0);
})();

/* One visual language for the exhibition and its three-era entrance. */
(() => {
  function initGalleryDesign() {
    if (!document.querySelector('#gallery,.home-main')) return;
    document.body.classList.add('gallery-design');
    const all = (selector, root = document) => [...root.querySelectorAll(selector)];
    // Reserve each artwork's proportions before lazy loading, without letterbox panels.
    all('.art-box img').forEach(img => {
      const width = Number(img.dataset.nativeWidth || img.getAttribute('width')) || img.naturalWidth;
      const height = Number(img.dataset.nativeHeight || img.getAttribute('height')) || img.naturalHeight;
      if (!width || !height) return;
      const frame = img.closest('.art-box');
      frame.style.setProperty('--art-ratio',String(width / height));
      frame.style.setProperty('--art-native-width',width + 'px');
    });

    window.galleryLocale?.prepare();
    // Join adjacent prose within each heading. Retain every word and translation.
    [...new Set(all('main p').map(node => node.parentElement))].forEach(parent => {
      let first = null;
      [...parent.children].forEach(child => {
        if (child.tagName !== 'P' || child.classList.contains('naya-verification')) { first = null; return; }
        if (!first) { first = child; return; }
        ['en','he','ru','fullText'].forEach(key => {
          if (first.dataset[key] && child.dataset[key]) first.dataset[key] += ' ' + child.dataset[key];
          else delete first.dataset[key];
        });
        first.append(document.createTextNode(' '), ...child.childNodes);
        first.removeAttribute('aria-label');
        child.remove();
      });
    });
    all('main p br').forEach(br => br.replaceWith(document.createTextNode(' ')));

    // Two natural reading pauses in each long passage; keep all source wording and markup.
    const thirds = value => {
      const sentenceEnds = typeof Intl.Segmenter === 'function'
        ? [...new Intl.Segmenter(document.documentElement.lang || 'en',{granularity:'sentence'}).segment(value)].map(part => part.index + part.segment.length)
        : [...value.matchAll(/[.!?][\s]+/g)].map(match => match.index + match[0].length).concat(value.length);
      const ends = sentenceEnds.length >= 3 ? sentenceEnds : [...value.matchAll(/\S+\s*/g)].map(match => match.index + match[0].length);
      if (ends.length < 3) return null;
      const closest = (fraction,from,to) => {
        let best = from;
        for (let i=from;i<=to;i++) if (Math.abs(ends[i]-value.length*fraction)<Math.abs(ends[best]-value.length*fraction)) best=i;
        return best;
      };
      const first = closest(1/3,0,ends.length-3);
      const second = closest(2/3,first+1,ends.length-2);
      return [0,ends[first],ends[second],value.length];
    };
    all('main p').forEach(paragraph => {
      const value = paragraph.textContent;
      if (value.trim().split(/\s+/).length < 120) return;
      const cuts = thirds(value);
      if (!cuts) return;
      const walker = document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node,offset=0;
      while ((node=walker.nextNode())) { nodes.push({node,start:offset,end:offset+node.length});offset+=node.length; }
      const point = position => {
        const part = nodes.find(item => position<=item.end) || nodes[nodes.length-1];
        return [part.node,position-part.start];
      };
      const translated = {};
      ['en','he','ru','fullText'].forEach(key => {
        if (!paragraph.dataset[key]) return;
        const text = paragraph.dataset[key];
        const breaks = thirds(text);
        if (breaks) translated[key]=breaks.slice(0,3).map((start,i)=>text.slice(start,breaks[i+1]));
      });
      const parts = cuts.slice(0,3).map((start,index) => {
        const part = paragraph.cloneNode(false);
        if (index) part.removeAttribute('id');
        part.removeAttribute('aria-label');
        const range = document.createRange();
        range.setStart(...point(start)); range.setEnd(...point(cuts[index+1]));
        part.append(range.cloneContents());
        ['en','he','ru','fullText'].forEach(key => {
          if (translated[key]) part.dataset[key]=translated[key][index];
          else delete part.dataset[key];
        });
        part.classList.add('gallery-reading-paragraph');
        return part;
      });
      paragraph.replaceWith(...parts);
    });

    window.galleryLocale?.apply();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const text = all('main p,main h2,main h3,main h4,main summary,.art-caption-inline,.hero-header-text,.home-intro,.naya-object-meta');
    // Observe individual blocks so even very long essays enter as soon as their top appears.
    const targets = text.filter(node => !text.some(parent => parent !== node && parent.contains(node)));
    const pictures = all('main img:not(.lightbox-image)');
    targets.forEach(node => node.classList.add('gallery-reveal'));
    pictures.forEach(node => node.classList.add('gallery-zoom'));
    if (reduced.matches || !('IntersectionObserver' in window)) {
      targets.forEach(node => node.classList.add('is-landed'));
      pictures.forEach(node => node.classList.add('is-zoomed'));
      return;
    }
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-landed');
        reveal.unobserve(entry.target);
      });
    }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
    const zoom = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const start = () => {
          img.classList.add('is-zoomed');
          zoom.unobserve(img);
        };
        if (img.complete) start(); else img.addEventListener('load', start, {once:true});
      });
    }, {threshold: .08});
    document.body.classList.add('gallery-motion-ready');
    targets.forEach(node => reveal.observe(node));
    pictures.forEach(node => zoom.observe(node));
    reduced.addEventListener('change', event => {
      if (!event.matches) return;
      reveal.disconnect(); zoom.disconnect();
      document.body.classList.remove('gallery-motion-ready');
      pictures.forEach(node => node.classList.add('is-zoomed'));
    });
  }
  setTimeout(initGalleryDesign, 0);
})();
