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
    mobilePanel.querySelectorAll('a, .auth-open-trigger').forEach(function(a){
      a.addEventListener('click', function(){
        mobilePanel.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Campus photo carousel (About section art panel) — advances every 3s
  var campusSlides = Array.prototype.slice.call(document.querySelectorAll('.campus-slide'));
  var campusCaption = document.getElementById('campusCaption');
  if(campusSlides.length > 1 && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    var campusIdx = 0;
    setInterval(function(){
      campusSlides[campusIdx].classList.remove('active');
      campusIdx = (campusIdx + 1) % campusSlides.length;
      campusSlides[campusIdx].classList.add('active');
      if(campusCaption) campusCaption.textContent = campusSlides[campusIdx].dataset.label || '';
    }, 3000);
  }

  // Hero background rotator (rotating, low-opacity Renaissance paintings) — advances every 6s
  var heroArtSlides = Array.prototype.slice.call(document.querySelectorAll('.hero-art-slide'));
  if(heroArtSlides.length > 1 && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    var heroArtIdx = 0;
    setInterval(function(){
      heroArtSlides[heroArtIdx].classList.remove('active');
      heroArtIdx = (heroArtIdx + 1) % heroArtSlides.length;
      heroArtSlides[heroArtIdx].classList.add('active');
    }, 6000);
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

  /*
    ==========================================================
    RANDEVU FORMU — Formspree entegrasyonu
    Bu formun size e-posta olarak düşmesi için:
    1) https://formspree.io adresinde ücretsiz bir hesap açın.
    2) "New Form" ile yeni bir form oluşturun, admin e-postanızı
       doğrulayın.
    3) Formspree size "https://formspree.io/f/xxxxxxxx" gibi bir
       endpoint verecek. Aşağıdaki FORMSPREE_ENDPOINT sabitindeki
       "https://formspree.io/f/YOUR_FORM_ID" kısmını bu adresle
       değiştirin (iletisim.html içindeki <form> etiketinin
       action değerini de aynı adresle güncelleyin).
    ==========================================================
  */
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  var form = document.getElementById('apptForm');
  var success = document.getElementById('formSuccess');
  var errorBox = document.getElementById('formError');
  if(form && success){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      if(errorBox) errorBox.classList.remove('show');

      var endpoint = form.getAttribute('action') || FORMSPREE_ENDPOINT;
      var submitBtn = form.querySelector('button[type=submit]');
      if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Gönderiliyor…'; }

      if(endpoint.indexOf('YOUR_FORM_ID') !== -1){
        // Formspree henüz yapılandırılmadı: kullanıcıya zarif başarı mesajını
        // yine de gösteriyoruz (demo modu) ama konsola net bir uyarı düşüyoruz.
        console.warn('[Dante] Formspree yapılandırılmadı: assets/main.js içindeki FORMSPREE_ENDPOINT ve iletisim.html formundaki action değerini kendi Formspree form ID’nizle değiştirin.');
        setTimeout(function(){
          success.classList.add('show');
          form.querySelectorAll('input,select,textarea,button[type=submit]').forEach(function(el){ el.disabled = true; });
          success.scrollIntoView({behavior:'smooth', block:'nearest'});
        }, 400);
        return;
      }

      var formData = new FormData(form);
      fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(response){
        if(response.ok){
          success.classList.add('show');
          form.querySelectorAll('input,select,textarea,button[type=submit]').forEach(function(el){ el.disabled = true; });
          success.scrollIntoView({behavior:'smooth', block:'nearest'});
        } else {
          throw new Error('Formspree yanıtı başarısız');
        }
      }).catch(function(){
        if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Randevu Talep Et'; }
        if(errorBox) errorBox.classList.add('show');
      });
    });
  }
})();
