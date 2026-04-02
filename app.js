/* ============================
   ZENITH FITNESS — APP.JS
   ============================ */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- HAMBURGER MENU ---- */
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ---- SCROLL ANIMATION (IntersectionObserver) ---- */
  const animEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger children if multiple observed in batch
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers
    animEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- CONTACT FORM → WHATSAPP ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const goal = document.getElementById('fgoal').value;
      const message = document.getElementById('fmessage').value.trim();

      // Basic validation
      if (!name) {
        showFieldError(document.getElementById('fname'), 'Please enter your name.');
        return;
      }
      if (!phone || phone.length < 10) {
        showFieldError(document.getElementById('fphone'), 'Please enter a valid phone number.');
        return;
      }

      // Build WhatsApp message
      let waMsg = 'Hi, I\'m interested in joining *Zenith Fitness*.\n\n';
      waMsg += '*Name:* ' + name + '\n';
      waMsg += '*Phone:* ' + phone + '\n';
      if (goal) waMsg += '*Goal:* ' + goal + '\n';
      if (message) waMsg += '*Message:* ' + message + '\n';
      waMsg += '\nPlease share membership details. Thank you!';

      const waURL = 'https://wa.me/919986888633?text=' + encodeURIComponent(waMsg);

      // Show success state
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');

      // Open WhatsApp after short delay
      setTimeout(function () {
        window.open(waURL, '_blank');
      }, 600);
    });
  }

  function showFieldError(field, msg) {
    field.style.borderColor = '#e53e3e';
    field.focus();
    let err = field.parentNode.querySelector('.field-err');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-err';
      err.style.cssText = 'color:#e53e3e;font-size:0.78rem;margin-top:4px;display:block;';
      field.parentNode.appendChild(err);
    }
    err.textContent = msg;
    field.addEventListener('input', function () {
      field.style.borderColor = '';
      if (err) err.remove();
    }, { once: true });
  }

  /* ---- GALLERY LIGHTBOX (simple) ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightbox = null;

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9999',
      'background:rgba(0,0,0,0.95)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'cursor:zoom-out', 'opacity:0',
      'transition:opacity 0.25s ease'
    ].join(';');

    const img = document.createElement('img');
    img.style.cssText = 'max-width:92vw;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 8px 60px rgba(0,0,0,0.8);';
    lightbox.appendChild(img);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = [
      'position:absolute', 'top:1.25rem', 'right:1.5rem',
      'background:rgba(255,255,255,0.12)', 'border:none',
      'color:#fff', 'font-size:1.4rem', 'width:44px', 'height:44px',
      'border-radius:50%', 'cursor:pointer', 'display:flex',
      'align-items:center', 'justify-content:center',
      'transition:background 0.2s'
    ].join(';');
    closeBtn.addEventListener('mouseenter', function () { closeBtn.style.background = 'rgba(255,255,255,0.25)'; });
    closeBtn.addEventListener('mouseleave', function () { closeBtn.style.background = 'rgba(255,255,255,0.12)'; });
    lightbox.appendChild(closeBtn);

    document.body.appendChild(lightbox);

    function closeLB() {
      lightbox.style.opacity = '0';
      setTimeout(function () { lightbox.style.display = 'none'; document.body.style.overflow = ''; }, 250);
    }

    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeLB(); });
    lightbox.addEventListener('click', closeLB);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });

    return { el: lightbox, img: img };
  }

  galleryItems.forEach(function (item) {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', function () {
      const src = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      if (!lightbox) {
        const lb = createLightbox();
        lightbox = lb.el;
        lightbox._img = lb.img;
      }
      lightbox._img.src = src;
      lightbox._img.alt = alt;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { lightbox.style.opacity = '1'; });
    });
  });

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const navH = 80;

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - navH - 40;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navAnchors.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--accent)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---- COUNTER ANIMATION ---- */
  function animateCounters() {
    document.querySelectorAll('.rating-score').forEach(function (el) {
      const target = parseFloat(el.textContent);
      if (isNaN(target)) return;
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (start + (target - start) * eased).toFixed(1);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(1);
      }
      requestAnimationFrame(step);
    });
  }

  // Trigger counter when about section is in view
  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.3 });
    counterObserver.observe(aboutSection);
  }

  /* ---- STICKY BAR SHOW/HIDE ON SCROLL ---- */
  const stickyBar = document.getElementById('stickyBar');
  let lastScroll = 0;
  window.addEventListener('scroll', function () {
    if (window.innerWidth <= 768) {
      const currentScroll = window.scrollY;
      if (currentScroll > 300) {
        stickyBar.style.transform = 'translateY(0)';
      } else {
        stickyBar.style.transform = 'translateY(100%)';
      }
      lastScroll = currentScroll;
    }
  }, { passive: true });

  /* ---- INIT ---- */
  // Force navbar state on load if already scrolled
  if (window.scrollY > 60) navbar.classList.add('scrolled');

})();
