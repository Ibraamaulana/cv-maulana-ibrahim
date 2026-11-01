/* ══════════════════════════════════════════════════════════
   MAULANA IBRAHIM — PERSONAL CV
   script.js  ·  Vanilla JavaScript (ES2020+, no dependencies)
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────
   1. YEAR IN FOOTER
─────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ───────────────────────────────────────────
   2. THEME TOGGLE  (dark / light, persisted)
─────────────────────────────────────────── */
(function initTheme() {
  const root        = document.documentElement;
  const btn         = document.getElementById('theme-toggle');
  const iconSun     = document.getElementById('icon-sun');
  const iconMoon    = document.getElementById('icon-moon');

  const STORAGE_KEY = 'cv-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: stored value → OS preference → dark fallback
  let theme = localStorage.getItem(STORAGE_KEY)
    || (prefersDark ? 'dark' : 'light');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    // Show the icon for the *opposite* state (what clicking will switch TO)
    if (t === 'dark') {
      iconSun.style.display  = 'none';
      iconMoon.style.display = '';
      if (btn) btn.setAttribute('aria-label', 'Ganti ke tema terang');
    } else {
      iconSun.style.display  = '';
      iconMoon.style.display = 'none';
      if (btn) btn.setAttribute('aria-label', 'Ganti ke tema gelap');
    }
  }

  applyTheme(theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    });
  }
})();


/* ───────────────────────────────────────────
   3. MOBILE HAMBURGER MENU
─────────────────────────────────────────── */
(function initMobileMenu() {
  const toggle     = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu   = document.getElementById('icon-menu');
  const iconClose  = document.getElementById('icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!toggle || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    iconMenu.style.display  = '';
    iconClose.style.display = 'none';
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    iconMenu.style.display  = 'none';
    iconClose.style.display = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a link is tapped
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ───────────────────────────────────────────
   4. ACTIVE NAV LINK  (IntersectionObserver)
─────────────────────────────────────────── */
(function initActiveNav() {
  const navLinks   = document.querySelectorAll('.nav-link, .mobile-link');
  const sectionIds = ['tentang','pendidikan','keterampilan','prestasi','sertifikat','kontak'];
  const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (!sections.length) return;

  // We track which section is most visible
  const HEADER_H = 80; // px – a bit more than var(--header-h) for safety

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
          });
        }
      });
    },
    {
      rootMargin: `-${HEADER_H}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(sec => observer.observe(sec));
})();


/* ───────────────────────────────────────────
   5. SCROLL-REVEAL  (IntersectionObserver)
─────────────────────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ───────────────────────────────────────────
   6. SMOOTH SCROLL  (for same-page anchors)
─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL without triggering a jump
    history.pushState(null, '', `#${targetId}`);
  });
});


/* ───────────────────────────────────────────
   7. FLOATING BACK-TO-TOP BUTTON
─────────────────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  const SHOW_AT = 400; // px scrolled before button appears

  function onScroll() {
    if (window.scrollY > SHOW_AT) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ───────────────────────────────────────────
   8. HEADER: add shadow on scroll
─────────────────────────────────────────── */
(function initHeaderShadow() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,0.3)'
      : '';
  }, { passive: true });
})();

