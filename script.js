// --- Filters ---
  const chips=document.querySelectorAll('.chip');
  const allCards=document.querySelectorAll('.grid .card');
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.setAttribute('aria-pressed','false'));
      chip.setAttribute('aria-pressed','true');
      const f=chip.dataset.filter;
      allCards.forEach(card=>{
        if(f==='all'){ card.style.display='block'; return; }
        const tags=(card.dataset.tags||'').split(',').map(s=>s.trim());
        card.style.display=tags.includes(f)?'block':'none';
      });
    });
  });

  // --- Quick Clips (Video popup) ---
  const modal=document.getElementById('videoModal');
  const modalVideo=modal.querySelector('video');
  document.querySelectorAll('[data-role="clip-play"]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card=e.currentTarget.closest('.card');
      const src=card.dataset.video;
      modalVideo.src=src;
      modal.style.display='flex';
      modalVideo.play();
    });
  });
  document.getElementById('modalClose').onclick=()=>{
    modal.style.display='none';
    modalVideo.pause(); modalVideo.src="";
  };
  modal.onclick=e=>{
    if(e.target===modal){
      modal.style.display='none';
      modalVideo.pause(); modalVideo.src="";
    }
  };

  // --- YouTube loader ---
  document.querySelectorAll('[data-role="yt-load"]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card=e.currentTarget.closest('.card');
      const id=card.dataset.yt;
      const thumb=card.querySelector('.thumb');
      const iframe=document.createElement('iframe');
      iframe.width='100%'; iframe.height='180'; iframe.loading='eager';
      iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen=true;
      iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      thumb.replaceChildren(iframe);
    });
  });