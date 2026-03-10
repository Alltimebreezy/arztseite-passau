/* ============================================
   GEMEINSCHAFTSPRAXIS DR. ADJAN & DR. GÖTTL
   Main JavaScript — Klaas Style
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile menu toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle?.classList.remove('active');
    });
  });

  // --- Scroll reveal animation ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Insurance type toggle ---
  const insuranceOptions = document.querySelectorAll('.insurance-option');

  insuranceOptions.forEach(option => {
    option.addEventListener('click', () => {
      insuranceOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      const input = option.querySelector('input');
      if (input) input.checked = true;
    });
  });

  // --- Form handling ---
  const forms = document.querySelectorAll('.klaas-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = 'Wird gesendet...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Nachricht gesendet!';
        btn.style.background = '#2d8a4e';
        btn.style.color = '#fff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          form.reset();
          insuranceOptions.forEach(o => o.classList.remove('active'));
          if (insuranceOptions[0]) {
            insuranceOptions[0].classList.add('active');
            const input = insuranceOptions[0].querySelector('input');
            if (input) input.checked = true;
          }
        }, 2500);
      }, 1000);
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Counter animation for stats ---
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 50;
        const stepTime = 1500 / 50;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, stepTime);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // --- Counter animation for fact numbers ---
  const factNumbers = document.querySelectorAll('.fact-number');

  const factObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        if (target <= 1) {
          // Small numbers: just set directly after a delay
          setTimeout(() => { el.textContent = target; }, 800);
        } else {
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.round(current);
          }, stepTime);
        }

        factObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  factNumbers.forEach(el => factObserver.observe(el));
});
