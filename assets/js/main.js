/* Precision Tile Co. — Main JS */

(function () {
  'use strict';

  // ── Nav scroll behavior ──
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth-scroll active nav highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--color-primary)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Fade-in on scroll ──
  document.querySelectorAll(
    '.service-card, .testimonial-card, .process__step, .about__highlight, .gallery__item'
  ).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ── Gallery filter ──
  const filters = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ── Contact form ──
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      const invalid = !field.value.trim();
      field.style.borderColor = invalid ? '#ef4444' : '';
      if (invalid) valid = false;
    });

    if (!valid) return;

    // Simulate submission
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send My Request →';
      submitBtn.disabled = false;
      successMsg.classList.add('visible');
      setTimeout(() => successMsg.classList.remove('visible'), 6000);
    }, 1200);
  });

  // Clear error state on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => { field.style.borderColor = ''; });
  });

  // ── Phone number formatting ──
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 6) {
        v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
      } else if (v.length >= 3) {
        v = `(${v.slice(0,3)}) ${v.slice(3)}`;
      }
      this.value = v;
    });
  }

  // ── Scroll-to-top on logo click ──
  document.querySelectorAll('.nav__logo').forEach(logo => {
    logo.addEventListener('click', e => {
      if (logo.getAttribute('href') === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

})();
