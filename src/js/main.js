import '../styles/main.css';

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
const progress = document.querySelector('[data-scroll-progress]');
const navHome = header || document.body;
const mobileQuery = window.matchMedia('(max-width: 860px)');

function placeNav(isMobile) {
  if (!nav) return;
  if (isMobile) {
    if (nav.parentElement !== document.body) document.body.appendChild(nav);
  } else if (header && nav.parentElement !== header) {
    // Keep toggle first, then brand order: insert nav after toggle/brand
    header.appendChild(nav);
  }
}

placeNav(mobileQuery.matches);
mobileQuery.addEventListener('change', (e) => {
  placeNav(e.matches);
  if (!e.matches) {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
  }
});

function onScroll() {
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 16);
  header.classList.toggle('is-compact', y > 120);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;
    progress.style.width = `${pct}%`;
  }
}

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (toggle && nav) {
  const setOpen = (open) => {
    if (!mobileQuery.matches) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

const reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

document.querySelectorAll('img[data-fade]').forEach((img) => {
  const show = () => img.classList.add('is-loaded');
  if (img.complete) show();
  else img.addEventListener('load', show, { once: true });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
