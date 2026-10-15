(() => {
  const targets='main h1,main h2';
  function apply(){
    document.querySelectorAll(targets).forEach(title=>{
      if(!title.textContent.trim() || title.querySelector(':scope > .exhibition-title-line')) return;
      const line=document.createElement('span');
      line.className='exhibition-title-line';
      while(title.firstChild) line.appendChild(title.firstChild);
      title.appendChild(line);
      title.dataset.titleLine='';
    });
  }
  apply();
  // Language switches rebuild the page; put the same effect on the new titles.
  new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
})();
