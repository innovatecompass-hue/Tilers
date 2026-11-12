/* Precision Tile Co. — Main JS */

(function () {
  'use strict';

  // ── Nav scroll behavior ──
  const nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('scrolled')) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const setMenu = open => {
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); hamburger.focus(); }
    });
  }

  // ── Smooth-scroll active nav highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--color-primary-ink)';
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
      filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ── Contact form ──
  // Sends the lead via submitLead() (assets/js/lead-capture.js). Before this, the
  // form only faked a submit and every inquiry was thrown away.
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let firstInvalid = null;
      required.forEach(field => {
        const invalid = !field.value.trim() || (field.type === 'email' && !field.checkValidity());
        field.setAttribute('aria-invalid', String(invalid));
        if (invalid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      const submitBtn = form.querySelector('[type="submit"]');
      const btnLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      const data = new FormData(form);
      const result = await window.submitLead({
        source:     'website-contact-form',
        firstName:  data.get('fname'),
        lastName:   data.get('lname'),
        email:      data.get('email'),
        phone:      data.get('phone'),
        smsConsent: data.get('smsConsent') === 'yes',
        service:    data.get('service'),
        message:    data.get('message'),
        subject:    `Website quote request: ${data.get('service') || 'Tile project'}`
      });

      submitBtn.textContent = btnLabel;
      submitBtn.disabled = false;
      successMsg.textContent = result.method === 'webhook'
        ? '✓ Thanks! We got your request and will be in touch within one business day.'
        : '✓ Almost done: your email app opened with your request filled in. Press Send and we\'ll reply within one business day.';
      successMsg.classList.add('visible');
      if (result.method === 'webhook') form.reset();
    });

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
    });
  }

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

  // ── FAQ accordion ──
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

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
