/* ===== Normmed Medical — interactions ===== */
(function () {
  'use strict';

  /* ---- Year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Mobile nav ---- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    })
  );

  /* ---- Nav shadow + back-to-top on scroll ---- */
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    toTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll('.stat__num, .big-num');
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => cio.observe(c));

  /* ---- Google-style reviews ---- */
  const reviews = [
    {
      name: 'Dr. Markus Hoffmann',
      meta: 'Spine Surgeon · Germany · 3 reviews',
      rating: 5,
      when: '2 months ago',
      text: 'We have used Normmed cervical plate and PEEK cage systems for over two years. Excellent build quality, reliable instrumentation and very responsive technical support.',
      color: '#be1522',
    },
    {
      name: 'Elena Rodríguez',
      meta: 'Distributor · Spain · 8 reviews',
      rating: 5,
      when: '4 months ago',
      text: 'A pleasure to work with as a distribution partner. Wide catalog, fast lead times and flexibility on customized production that competitors simply cannot match.',
      color: '#0a2c3d',
    },
    {
      name: 'Ahmet Yıldız',
      meta: 'Local Guide · Ankara · 22 reviews',
      rating: 5,
      when: '1 month ago',
      text: 'Modern factory in İvedik OSB. Impressive R&D and machining capability. As the only maker of silver-coated spinal implants in Turkey, their systems are genuinely innovative.',
      color: '#707070',
    },
    {
      name: 'Beatrice Laurent',
      meta: 'OR Nurse · Belgium · 5 reviews',
      rating: 4,
      when: '6 months ago',
      text: 'Instrument sets are well organized and clearly labeled. Sterilization trays are intuitive. Would love even more language options in the documentation.',
      color: '#a01020',
    },
    {
      name: 'Carlos Mendes',
      meta: 'Orthopedic Surgeon · Brazil · 11 reviews',
      rating: 5,
      when: '3 weeks ago',
      text: 'The trauma plating range is comprehensive and the anatomic fit is excellent. Patients recover well and the hardware performs exactly as specified.',
      color: '#be1522',
    },
    {
      name: 'Dr. Sarah Mitchell',
      meta: 'Spine Fellow · United Kingdom · 9 reviews',
      rating: 5,
      when: '5 months ago',
      text: 'Attended a workshop on their MIS thoracolumbar system. Thoughtful, surgeon-driven design. Communication from the Normmed team was first-class throughout.',
      color: '#0a2c3d',
    },
  ];

  const initials = (name) =>
    name.replace(/Dr\.?\s*/i, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const grid = document.getElementById('reviewsGrid');
  if (grid) {
    grid.innerHTML = reviews
      .map(
        (r) => `
      <article class="review">
        <div class="review__head">
          <div class="review__avatar" style="background:${r.color}">${initials(r.name)}</div>
          <div>
            <div class="review__name">${r.name}</div>
            <div class="review__meta">${r.meta}</div>
          </div>
        </div>
        <div class="review__stars" aria-label="${r.rating} out of 5">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="review__text">${r.text}</p>
        <div class="review__g">
          <b><span class="g-blue">G</span><span class="g-red">o</span><span class="g-yellow">o</span><span class="g-blue">g</span><span class="g-green">l</span><span class="g-red">e</span></b>
          · ${r.when}
        </div>
      </article>`
      )
      .join('');
  }

  /* ---- Contact form (front-end demo) ---- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').trim();
      const email = (data.get('email') || '').trim();
      const msg = (data.get('message') || '').trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !validEmail || !msg) {
        status.textContent = 'Please complete name, a valid email, and a message.';
        status.className = 'form__status err';
        return;
      }
      status.textContent = `Thank you, ${name.split(' ')[0]}! Your message is ready — connect a backend or mail service to deliver it.`;
      status.className = 'form__status ok';
      form.reset();
    });
  }
})();
