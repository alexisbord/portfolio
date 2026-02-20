// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observerNav.observe(s));

// ── Mobile menu toggle ───────────────────────────────────────
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  menu.classList.toggle('open', open);
});

menu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
  });
});

// ── Reveal on scroll ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => observerReveal.observe(el));

// ── Modals ────────────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById('modal-' + id);
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  // Focus trap: focus first focusable element
  const focusable = modal.querySelector('button, a');
  if (focusable) focusable.focus();
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

// Ouvrir au clic sur les cartes cliquables
document.querySelectorAll('.is-clickable').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-modal');
    if (id) openModal(id);
  });
});

// Fermer au clic sur le bouton close ou le backdrop
document.querySelectorAll('.modal__close, .modal__backdrop').forEach(el => {
  el.addEventListener('click', () => {
    closeModal(el.closest('.modal'));
  });
});

// Fermer avec Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
  }
});
