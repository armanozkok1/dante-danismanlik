(function(){
  // Header scroll state (only for transparent-start headers on the home hero)
  var header = document.getElementById('site-header');
  var ctaDesktop = document.getElementById('cta-desktop');
  var isTransparentHeader = header && header.classList.contains('transparent-start');
  function onScroll(){
    if(!header) return;
    if(!isTransparentHeader) return;
    if(window.scrollY > 40){
      header.classList.add('scrolled');
      if(ctaDesktop) ctaDesktop.style.display = 'inline-flex';
    } else {
      header.classList.remove('scrolled');
      if(ctaDesktop) ctaDesktop.style.display = 'none';
    }
  }
  if(header){
    if(isTransparentHeader){
      window.addEventListener('scroll', onScroll, {passive:true});
      onScroll();
    } else if(ctaDesktop){
      ctaDesktop.style.display = 'inline-flex';
    }
  }

  // Mobile nav
  var navToggle = document.getElementById('navToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  if(navToggle && mobilePanel){
    navToggle.addEventListener('click', function(){
      var open = mobilePanel.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
    });
    mobilePanel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobilePanel.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // Testimonial slider
  var slides = Array.prototype.slice.call(document.querySelectorAll('.testi-slide'));
  var dotsWrap = document.getElementById('testiDots');
  if(slides.length && dotsWrap){
    var current = 0;
    var timer;
    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      if(i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Yorum ' + (i+1));
      dot.addEventListener('click', function(){ goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(i){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    function resetTimer(){
      clearInterval(timer);
      timer = setInterval(function(){ goTo(current + 1); }, 6500);
    }
    var nextBtn = document.getElementById('testiNext');
    var prevBtn = document.getElementById('testiPrev');
    if(nextBtn) nextBtn.addEventListener('click', function(){ goTo(current+1); resetTimer(); });
    if(prevBtn) prevBtn.addEventListener('click', function(){ goTo(current-1); resetTimer(); });
    resetTimer();
  }

  // Contact form (client-side only demo submit)
  var form = document.getElementById('apptForm');
  var success = document.getElementById('formSuccess');
  if(form && success){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      success.classList.add('show');
      form.querySelectorAll('input,select,textarea,button[type=submit]').forEach(function(el){ el.disabled = true; });
      success.scrollIntoView({behavior:'smooth', block:'nearest'});
    });
  }
})();
