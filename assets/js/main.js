// ── Hero typed text ───────────────────────────────────────────
const typedEl = document.getElementById('heroTyped');
if (typedEl) {
  const words   = ['IA', 'Deep Learning', 'Computer Vision', 'Langue Naturelle'];
  let   wi      = 0;   // index du mot courant
  let   ci      = 0;   // index du caractère courant
  let   deleting = false;
  const SPEED_TYPE   = 70;   // ms par caractère en écriture
  const SPEED_DELETE = 35;   // ms par caractère en suppression
  const PAUSE_FULL   = 2000; // pause quand le mot est complet
  const PAUSE_EMPTY  = 400;  // pause quand le mot est effacé

  function type() {
    const word    = words[wi];
    const current = typedEl.textContent;

    if (!deleting) {
      // On écrit
      typedEl.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, PAUSE_FULL);
        return;
      }
      setTimeout(type, SPEED_TYPE);
    } else {
      // On efface
      typedEl.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(type, PAUSE_EMPTY);
        return;
      }
      setTimeout(type, SPEED_DELETE);
    }
  }
  setTimeout(type, 800); // délai initial
}

// ── Hero — fade + parallax au scroll ─────────────────────────
const heroImg     = document.getElementById('heroImg');
const heroSection = document.getElementById('hero');

if (heroImg && heroSection) {
  window.addEventListener('scroll', () => {
    const scrollY  = window.scrollY;
    const heroH    = heroSection.offsetHeight;

    // Opacité : 1 → 0 sur la première moitié du scroll
    const fadeRatio = Math.min(scrollY / (heroH * 0.6), 1);
    heroImg.style.opacity = 1 - fadeRatio;

    // Parallax léger : l'image monte plus lentement que le scroll
    heroImg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}

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
document.querySelectorAll('.card-hint').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('[data-modal]');
    const id = card ? card.getAttribute('data-modal') : null;
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

// ── Hero scroll button ───────────────────────────────────────
const heroScrollBtn = document.querySelector('.hero__scroll');

if (heroScrollBtn) {
  heroScrollBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollBy({
      top: window.innerHeight * 1, // ajuste ici (0.8, 1, 1.2...)
      behavior: 'smooth'
    });
  });
}