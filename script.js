document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    document.querySelector('.close-mobile-menu').addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
        document.body.style.overflow = '';
    });

    // Mobile dropdown toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const content = e.currentTarget.nextElementSibling;
            const icon = e.currentTarget.querySelector('.fa-chevron-down, .fa-chevron-up');
            content.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    }

    // Desktop dropdown hover
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.querySelector('.dropdown-menu').style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.dropdown-menu').style.display = 'none';
        });
    }
});

// lifestyle-value reveal on scroll
(function() {
  const el = document.querySelector('.lifestyle-value');
  if (!el) return;

  // Start hidden
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';

  const onReveal = () => {
    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };

  // IntersectionObserver for reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onReveal();
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  obs.observe(el);
})();
// services page interactions
(function() {
  const grid = document.querySelector('.services-grid');
  if (!grid) return;

  // Filter logic
  const chips = document.querySelectorAll('.chip');
  const cards = grid.querySelectorAll('.service-card');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.filter;
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  // Scroll-in reveal
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => obs.observe(card));
})();
document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('.mem-card, .mem-highlight, .faq-item');
  if (!targets.length) return;
  targets.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(12px)'; });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => obs.observe(el));
});
// Fabkart FAQ controlled accordion (button-only toggles)
(function () {
  const grid = document.querySelector('.fabkart-faq .faq-grid') || document.querySelector('.faq-grid');
  if (!grid) return;

  function openCard(card, btn, body) {
    card.setAttribute('data-open', 'true');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = '–';
    body.hidden = false;
  }
  function closeCard(card, btn, body) {
    card.setAttribute('data-open', 'false');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '+';
    body.hidden = true;
  }
  function closeSiblings(current) {
    grid.querySelectorAll('.faq-card[data-open="true"]').forEach(card => {
      if (card === current) return;
      const btn = card.querySelector('.faq-toggle');
      const body = document.getElementById(btn.getAttribute('aria-controls'));
      closeCard(card, btn, body);
    });
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-toggle');
    if (!btn) return;
    const card = btn.closest('.faq-card');
    const body = document.getElementById(btn.getAttribute('aria-controls'));
    const isOpen = card.getAttribute('data-open') === 'true';
    if (isOpen) {
      closeCard(card, btn, body);
    } else {
      closeSiblings(card); // remove this line if you want multiple open at once
      openCard(card, btn, body);
    }
  });

  // Optional: soft reveal on scroll
  const cards = grid.querySelectorAll('.faq-card');
  cards.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(12px)'; });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(el => obs.observe(el));
})();
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.voice-card');
  if (!cards.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => obs.observe(c));
});
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.six-item');
  if (!items.length) return;
  items.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(12px)'; });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
});
